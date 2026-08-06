export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate required environment variables
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    console.error('Missing required environment variables: VERCEL_API_TOKEN and/or VERCEL_PROJECT_ID');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const teamId = process.env.VERCEL_TEAM_ID || '';
  const analyticsSince = process.env.ANALYTICS_SINCE || '';

  // Build date range
  const now = new Date();
  const until = now.toISOString();

  let since;
  if (analyticsSince) {
    since = new Date(analyticsSince).toISOString();
  } else {
    // Default to 90 days ago
    const daysAgo = new Date(now);
    daysAgo.setDate(daysAgo.getDate() - 90);
    since = daysAgo.toISOString();
  }

  const baseUrl = 'https://api.vercel.com/v1/query/web-analytics/visits/aggregate';
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Build query parameters
  const baseParams = new URLSearchParams({
    projectId,
    environment: 'production',
    since,
    until,
  });

  if (teamId) {
    baseParams.set('teamId', teamId);
  }

  // Country breakdown params
  const countryParams = new URLSearchParams(baseParams);
  countryParams.set('by', 'country');

  try {
    // Fetch totals and country breakdown in parallel
    const [totalsRes, countryRes] = await Promise.all([
      fetch(`${baseUrl}?${baseParams.toString()}`, { headers }),
      fetch(`${baseUrl}?${countryParams.toString()}`, { headers }),
    ]);

    if (!totalsRes.ok) {
      const errBody = await totalsRes.text();
      console.error(`Vercel Analytics API error (totals): ${totalsRes.status}`, errBody);
      return res.status(502).json({ error: 'Failed to retrieve analytics data' });
    }

    if (!countryRes.ok) {
      const errBody = await countryRes.text();
      console.error(`Vercel Analytics API error (countries): ${countryRes.status}`, errBody);
      return res.status(502).json({ error: 'Failed to retrieve analytics data' });
    }

    const totalsData = await totalsRes.json();
    const countryData = await countryRes.json();

    // Extract totals — the aggregate endpoint returns pageViews and visitors
    // The response shape may be { pageViews: number, visitors: number } or similar
    const pageViews = toSafeNumber(totalsData.pageViews ?? totalsData.data?.[0]?.pageViews ?? 0);
    const visitors = toSafeNumber(totalsData.visitors ?? totalsData.data?.[0]?.visitors ?? 0);

    // Extract country data — grouped response returns an array of { key: "US", pageViews: N, visitors: N }
    const countryRows = Array.isArray(countryData.data) ? countryData.data : [];

    // Filter out invalid/empty country values and map to normalized format
    const validCountries = countryRows
      .filter((row) => {
        const code = row.key ?? row.country ?? '';
        return typeof code === 'string' && code.length === 2;
      })
      .map((row) => ({
        code: (row.key ?? row.country ?? '').toUpperCase(),
        visitors: toSafeNumber(row.visitors ?? row.pageViews ?? 0),
      }))
      .sort((a, b) => b.visitors - a.visitors);

    const countriesReached = validCountries.length;
    const topCountries = validCountries.slice(0, 5);

    // Set caching headers
    res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');

    return res.status(200).json({
      visitors,
      pageViews,
      countriesReached,
      topCountries,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Visitor stats API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Safely convert a value to a non-negative integer.
 */
function toSafeNumber(val) {
  const num = Number(val);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.round(num);
}
