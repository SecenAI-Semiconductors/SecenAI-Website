const COUNT_ENDPOINT =
  'https://api.vercel.com/v1/query/web-analytics/visits/count';

const AGGREGATE_ENDPOINT =
  'https://api.vercel.com/v1/query/web-analytics/visits/aggregate';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    console.error(
      'Visitor analytics configuration is missing the token or project ID.',
    );

    return res.status(500).json({
      error: 'Server configuration error',
    });
  }

  const now = new Date();
  const until = now.toISOString();
  const since = getReportingStartDate(
    now,
    process.env.ANALYTICS_SINCE,
  );

  const commonParams = new URLSearchParams({
    projectId,
    since,
    until,
  });

  // Your project is currently in a personal Hobby workspace,
  // so this will normally remain unset.
  if (teamId) {
    commonParams.set('teamId', teamId);
  }

  const countryParams = new URLSearchParams(commonParams);

  // The aggregate endpoint requires a grouping dimension.
  countryParams.append('by', 'country');

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  try {
    const [countResponse, countryResponse] = await Promise.all([
      fetch(`${COUNT_ENDPOINT}?${commonParams.toString()}`, {
        method: 'GET',
        headers,
      }),

      fetch(`${AGGREGATE_ENDPOINT}?${countryParams.toString()}`, {
        method: 'GET',
        headers,
      }),
    ]);

    if (!countResponse.ok) {
      await logUpstreamError('count', countResponse);

      return res.status(502).json({
        error: 'Failed to retrieve analytics data',
      });
    }

    if (!countryResponse.ok) {
      await logUpstreamError('country aggregate', countryResponse);

      return res.status(502).json({
        error: 'Failed to retrieve analytics data',
      });
    }

    const countPayload = await countResponse.json();
    const countryPayload = await countryResponse.json();

    // Log the count response structure (keys only) for diagnostics.
    // This never exposes the token or any sensitive values.
    console.log(
      'Count payload keys:',
      Object.keys(countPayload ?? {}),
    );
    if (
      countPayload?.data &&
      typeof countPayload.data === 'object' &&
      !Array.isArray(countPayload.data)
    ) {
      console.log(
        'Count payload.data keys:',
        Object.keys(countPayload.data),
      );
    }

    /*
     * Try to extract visitors and pageViews from the count response.
     * The structure varies: values may sit at the top level, inside
     * `data`, or the whole `data` may be a plain number (page-view
     * count).  We probe every reasonable location.
     */
    const countVisitors = extractNumeric(countPayload, [
      'visitors',
      'uniqueVisitors',
      'totalVisitors',
    ]);

    const countPageViews = extractNumeric(countPayload, [
      'pageViews',
      'pageviews',
      'views',
      'totalPageViews',
      'total',
      'count',
    ]);

    // If `data` is a bare number, treat it as the page-view total.
    const dataAsNumber =
      typeof countPayload?.data === 'number'
        ? toSafeNumber(countPayload.data)
        : 0;

    /*
     * Parse country aggregate rows.  Extract both visitors AND
     * pageViews from each row so we can sum them as a fallback.
     */
    const rows = Array.isArray(countryPayload?.data)
      ? countryPayload.data
      : [];

    const countries = rows
      .map((row) => {
        const rawCode =
          row?.country ??
          row?.key ??
          row?.dimension ??
          row?.value ??
          '';

        const code =
          typeof rawCode === 'string'
            ? rawCode.trim().toUpperCase()
            : '';

        return {
          code,
          visitors: toSafeNumber(
            row?.visitors ??
              row?.uniqueVisitors ??
              row?.totalVisitors,
          ),
          pageViews: toSafeNumber(
            row?.pageViews ??
              row?.pageviews ??
              row?.views ??
              row?.totalPageViews,
          ),
        };
      })
      .filter(({ code }) => /^[A-Z]{2}$/.test(code))
      .sort((a, b) => b.visitors - a.visitors);

    /*
     * Determine final totals.
     *
     * Priority:
     *  1. Values extracted from the count endpoint
     *  2. `data` interpreted as a bare number (page views only)
     *  3. Sum of the country aggregate rows (guaranteed fallback)
     */
    const aggregateVisitors = countries.reduce(
      (sum, c) => sum + c.visitors,
      0,
    );
    const aggregatePageViews = countries.reduce(
      (sum, c) => sum + c.pageViews,
      0,
    );

    const finalVisitors =
      countVisitors || aggregateVisitors;

    const finalPageViews =
      countPageViews || dataAsNumber || aggregatePageViews;

    // Strip per-row pageViews before sending to the frontend.
    const topCountries = countries
      .slice(0, 5)
      .map(({ code, visitors: v }) => ({ code, visitors: v }));

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=3600',
    );

    return res.status(200).json({
      visitors: finalVisitors,
      pageViews: finalPageViews,
      countriesReached: countries.length,
      topCountries,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      'Visitor analytics function failed:',
      error instanceof Error ? error.message : 'Unknown error',
    );

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

/**
 * Hobby Web Analytics currently has a one-month reporting window.
 * Use the configured date only when it is valid and within that window.
 */
function getReportingStartDate(now, configuredDate) {
  const thirtyDaysAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000,
  );

  if (!configuredDate) {
    return thirtyDaysAgo.toISOString();
  }

  const configured = new Date(configuredDate);

  if (Number.isNaN(configured.getTime())) {
    console.warn(
      'ANALYTICS_SINCE is invalid; using the last 30 days.',
    );

    return thirtyDaysAgo.toISOString();
  }

  // Prevent requesting data older than the Hobby reporting window.
  if (configured < thirtyDaysAgo) {
    return thirtyDaysAgo.toISOString();
  }

  if (configured > now) {
    return thirtyDaysAgo.toISOString();
  }

  return configured.toISOString();
}

/**
 * Log the useful Vercel error without exposing credentials.
 */
async function logUpstreamError(endpointName, response) {
  let message = '';

  try {
    const body = await response.json();

    message =
      body?.error?.message ??
      body?.error?.code ??
      body?.message ??
      JSON.stringify(body);
  } catch {
    message = await response.text().catch(() => '');
  }

  console.error(
    `Vercel Analytics ${endpointName} request failed:`,
    response.status,
    message || response.statusText,
  );
}

/**
 * Search a payload for the first numeric value matching one of the
 * candidate field names.  Checks the top-level object first, then
 * `payload.data` if it is a plain object.
 */
function extractNumeric(payload, fieldNames) {
  if (!payload || typeof payload !== 'object') return 0;

  // Check top-level fields.
  for (const name of fieldNames) {
    const val = Number(payload[name]);
    if (Number.isFinite(val) && val > 0) return Math.round(val);
  }

  // Check nested `data` object.
  if (
    payload.data &&
    typeof payload.data === 'object' &&
    !Array.isArray(payload.data)
  ) {
    for (const name of fieldNames) {
      const val = Number(payload.data[name]);
      if (Number.isFinite(val) && val > 0) return Math.round(val);
    }
  }

  return 0;
}

/**
 * Convert analytics values into safe non-negative integers.
 */
function toSafeNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }

  return Math.round(number);
}
