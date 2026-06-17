// ─────────────────────────────────────────────────────────────────────
// SECEN AI — Email Template Utility for Web3Forms (React)
// ─────────────────────────────────────────────────────────────────────
// Prepares form submission data for Web3Forms API.
// This keeps the ContactForm component clean and reusable.
//
// CUSTOM EMAIL TEMPLATE SETUP:
// Web3Forms uses its own default email layout. To get branded emails,
// paste the HTML from getCustomEmailTemplate() into your Web3Forms
// dashboard: Settings → Custom Email Template → Paste → Save.
// ─────────────────────────────────────────────────────────────────────

/**
 * Inquiry type value → human-readable label mapping
 */
export const INQUIRY_LABELS = {
  'product-demo': 'Product Demo Request',
  'technical-support': 'Technical Support',
  'pricing': 'Pricing & Licensing',
  'custom-integration': 'Custom Integration',
  'Recruitment': 'Recruitment',
  'general': 'Others',
};

/**
 * Formats the current date/time as a readable Indian Standard Time string.
 *
 * @returns {string} e.g. "16 June 2026, 2:30 pm"
 */
export function formatSubmissionDate() {
  return new Date().toLocaleString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
}

/**
 * Generates the email subject line.
 *
 * @param {Object} params
 * @param {string} params.inquiryType — Human-readable inquiry type label
 * @param {string} params.name       — Customer's full name
 * @returns {string} Formatted subject line
 */
export function buildEmailSubject({ inquiryType, name }) {
  return `New Inquiry: ${inquiryType} — from ${name}`;
}

/**
 * Builds a Web3Forms-compatible JSON payload object with all fields.
 *
 * @param {Object} params
 * @param {string} params.accessKey    — Web3Forms access key
 * @param {string} params.name         — Customer's full name
 * @param {string} params.email        — Customer's email address
 * @param {string} params.inquiryType  — Raw inquiry type value from the select
 * @param {string} params.message      — Customer's message body
 * @returns {Object} Ready-to-submit JSON payload
 */
export function buildSubmissionPayload({ accessKey, name, email, inquiryType, message }) {
  const inquiryLabel = INQUIRY_LABELS[inquiryType] || inquiryType;
  const submittedAt = formatSubmissionDate();

  return {
    // ── Web3Forms required field ──
    access_key: accessKey,

    // ── Email subject line ──
    subject: buildEmailSubject({ inquiryType: inquiryLabel, name }),

    // ── Sender display name ──
    from_name: 'SecenAI Website Contact Form',

    // ── Reply-to: lets you respond directly to the customer ──
    replyto: email,

    // ── Form fields (appear as labeled rows in the email) ──
    // These field names become {{Name}}, {{Email}}, etc. in the
    // Web3Forms custom email template.
    Name: name,
    Email: email,
    'Inquiry Type': inquiryLabel,
    Message: message,
    'Submitted At': submittedAt,

    // ── Honeypot anti-spam field ──
    botcheck: '',
  };
}

/**
 * Returns the branded HTML email template for Web3Forms.
 *
 * HOW TO USE:
 * 1. Call this function or copy the returned HTML string
 * 2. Go to https://web3forms.com → your form → Settings tab
 * 3. Find "Custom Email Template" section
 * 4. Paste the HTML and click Save
 *
 * Template variables like {{Name}}, {{Email}}, etc. are automatically
 * replaced by Web3Forms with the actual form submission values.
 *
 * @returns {string} Complete HTML email template with SECEN AI branding
 */
export function getCustomEmailTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry — SECEN AI</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Main card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;border-radius:16px;overflow:hidden;border:1px solid #1a1a1a;max-width:600px;width:100%;">

          <!-- ━━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="padding:0;">
              <!-- Top neon accent line -->
              <div style="height:3px;background:linear-gradient(90deg,#CCFF00,#a6d900,#CCFF00);"></div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 36px 24px;">
                <tr>
                  <td valign="middle">
                    <!-- Logo mark -->
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:44px;height:44px;background-color:#CCFF00;border-radius:12px;text-align:center;vertical-align:middle;font-size:22px;font-weight:800;color:#000000;letter-spacing:-1px;">
                          S
                        </td>
                        <td style="padding-left:14px;">
                          <p style="margin:0;font-size:20px;font-weight:800;color:#CCFF00;letter-spacing:1px;">SECEN AI</p>
                          <p style="margin:2px 0 0;font-size:11px;color:#555555;letter-spacing:2px;text-transform:uppercase;">Contact Form Submission</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:rgba(204,255,0,0.08);border:1px solid rgba(204,255,0,0.2);border-radius:20px;padding:6px 14px;">
                          <span style="font-size:11px;font-weight:600;color:#CCFF00;letter-spacing:0.5px;">NEW INQUIRY</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ━━━ Inquiry Type Banner ━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="padding:0 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,rgba(204,255,0,0.08) 0%,rgba(204,255,0,0.03) 100%);border:1px solid rgba(204,255,0,0.15);border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:10px;color:#666666;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Inquiry Type</p>
                    <p style="margin:0;font-size:18px;font-weight:700;color:#CCFF00;">{{Inquiry Type}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ━━━ Contact Details ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="padding:24px 36px 0;">

              <!-- Name -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="padding:14px 18px;background-color:#111111;border-radius:10px;border-left:3px solid #CCFF00;">
                    <p style="margin:0 0 3px;font-size:10px;color:#666666;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Name</p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:600;">{{Name}}</p>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="padding:14px 18px;background-color:#111111;border-radius:10px;border-left:3px solid #CCFF00;">
                    <p style="margin:0 0 3px;font-size:10px;color:#666666;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Email</p>
                    <a href="mailto:{{Email}}" style="font-size:16px;color:#CCFF00;text-decoration:none;font-weight:500;">{{Email}}</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ━━━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="padding:8px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:18px 20px;background-color:#111111;border-radius:10px;border:1px solid #1a1a1a;">
                    <p style="margin:0 0 10px;font-size:10px;color:#666666;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Message</p>
                    <p style="margin:0;font-size:15px;color:#e0e0e0;line-height:1.7;">{{Message}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ━━━ Divider ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="padding:24px 36px 0;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#222222,transparent);"></div>
            </td>
          </tr>

          <!-- ━━━ Footer Info ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="padding:20px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
                    <p style="margin:0 0 2px;font-size:10px;color:#555555;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Submitted At</p>
                    <p style="margin:0;font-size:14px;color:#888888;">{{Submitted At}}</p>
                  </td>
                  <td align="right" valign="middle">
                    <a href="mailto:{{Email}}" style="display:inline-block;background-color:#CCFF00;color:#000000;font-size:13px;font-weight:700;text-decoration:none;padding:10px 24px;border-radius:20px;">
                      Reply &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ━━━ Company Footer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <tr>
            <td style="padding:0;">
              <div style="height:1px;background-color:#1a1a1a;"></div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:20px 36px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:#444444;line-height:1.6;">
                      SECEN AI Semiconductors &amp; Test Solutions Pvt. Ltd.
                    </p>
                    <p style="margin:4px 0 0;font-size:10px;color:#333333;">
                      Hatchlab Research Centre, SRM University AP &bull; Mangalagiri, Guntur-522503, AP
                    </p>
                  </td>
                </tr>
              </table>
              <!-- Bottom neon accent line -->
              <div style="height:3px;background:linear-gradient(90deg,#CCFF00,#a6d900,#CCFF00);"></div>
            </td>
          </tr>

        </table>
        <!-- /Main card -->

        <!-- Powered by tagline -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:16px 0;text-align:center;">
              <p style="margin:0;font-size:10px;color:#333333;">
                This is an automated notification from the SECEN AI website contact form.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}
