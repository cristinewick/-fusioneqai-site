const DEFAULT_TO = 'fusioneqai@gmail.com';

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatLabel(key) {
  return key
    .replace(/^form-name$/, 'Form')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildRows(payload) {
  return Object.entries(payload)
    .filter(([key]) => !['formName'].includes(key))
    .map(([key, value]) => {
      const safeKey = escapeHtml(formatLabel(key));
      const safeValue = escapeHtml(value).replace(/\n/g, '<br>');
      return `<tr><th align="left" style="padding:10px 14px;border-bottom:1px solid #d9dfd4;color:#62756c;font-size:12px;text-transform:uppercase;letter-spacing:.08em;width:34%;">${safeKey}</th><td style="padding:10px 14px;border-bottom:1px solid #d9dfd4;color:#12221b;font-size:15px;line-height:1.5;">${safeValue}</td></tr>`;
    })
    .join('');
}

function buildEmail(payload) {
  const formName = payload.formName || payload['form-name'] || 'FusionEQ form';
  const subject = `FusionEQ form submission: ${formName}`;
  const rows = buildRows(payload);

  return {
    subject,
    html: `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f7f8f4;font-family:Arial,Helvetica,sans-serif;color:#12221b;">
    <div style="max-width:680px;margin:0 auto;padding:32px 20px;">
      <div style="background:#ffffff;border:1px solid #d9dfd4;border-radius:14px;overflow:hidden;">
        <div style="padding:24px 28px;border-bottom:4px solid #7fa56e;">
          <p style="margin:0 0 8px;color:#b59a53;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;">FusionEQ</p>
          <h1 style="margin:0;color:#12221b;font-size:26px;line-height:1.15;">New Website Request</h1>
          <p style="margin:10px 0 0;color:#53635a;font-size:15px;line-height:1.5;">A visitor submitted a FusionEQ form. Netlify Forms remains the backup source of record.</p>
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          ${rows}
        </table>
      </div>
    </div>
  </body>
</html>`,
    text: Object.entries(payload)
      .filter(([key]) => !['formName'].includes(key))
      .map(([key, value]) => `${formatLabel(key)}: ${value}`)
      .join('\n')
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (error) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { subject, html, text } = buildEmail(payload);
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.FUSIONEQ_FORM_FROM || 'FusionEQ Website <onboarding@resend.dev>';
  const recipients = (process.env.FUSIONEQ_FORM_TO || DEFAULT_TO)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  if (!resendApiKey) {
    return {
      statusCode: 202,
      body: JSON.stringify({
        ok: true,
        delivery: 'not-configured',
        message: 'Form notification function received the submission. Add RESEND_API_KEY in Netlify to enable direct email delivery.'
      })
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromAddress,
      to: recipients,
      subject,
      html,
      text,
      reply_to: payload.email || undefined
    })
  });

  if (!response.ok) {
    const details = await response.text();
    return {
      statusCode: 502,
      body: JSON.stringify({ ok: false, error: details })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
