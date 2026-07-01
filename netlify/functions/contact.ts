import { Handler } from '@netlify/functions'
import nodemailer from 'nodemailer'

const HEADERS = (origin?: string) => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || origin || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
})

const handler: Handler = async (event) => {
  const headers = HEADERS(event.headers.origin)

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  // Basic env validation
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = Number(process.env.SMTP_PORT || 587)
  const SMTP_SECURE = process.env.SMTP_SECURE === 'true'
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const EMAIL_TO = process.env.EMAIL_TO || 'azeem@clareit.com'
  const EMAIL_FROM = process.env.SMTP_FROM || SMTP_USER || 'no-reply@clareit.com'

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'SMTP is not configured on the server.' }),
    }
  }

  let payload: { name?: string; email?: string; budget?: string; message?: string }
  try {
    payload = JSON.parse(event.body || '{}')
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    }
  }

  const { name, email, budget, message } = payload
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Please provide name, email, and message.' }),
    }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const text = `Name: ${name}\nEmail: ${email}\nBudget: ${budget || 'Not specified'}\n\nMessage:\n${message}`
const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:32px;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
          
          <tr>
            <td style="background:#111827;padding:24px;">
              <h2 style="margin:0;color:#ffffff;font-size:24px;">
                📩 New Contact Request
              </h2>
              <p style="margin:8px 0 0;color:#cbd5e1;font-size:14px;">
                Someone submitted the contact form on ClareIT.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">

              <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="font-weight:bold;color:#374151;width:150px;">👤 Name</td>
                  <td style="color:#111827;">${name}</td>
                </tr>

                <tr style="background:#f9fafb;">
                  <td style="font-weight:bold;color:#374151;">📧 Email</td>
                  <td>
                    <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">
                      ${email}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="font-weight:bold;color:#374151;">💰 Budget</td>
                  <td>${budget || "Not specified"}</td>
                </tr>
              </table>

              <div style="margin-top:30px;">
                <h3 style="margin:0 0 12px;color:#111827;">
                  Project Details
                </h3>

                <div style="
                  background:#f9fafb;
                  border-left:4px solid #2563eb;
                  padding:18px;
                  border-radius:8px;
                  color:#374151;
                  line-height:1.7;
                ">
                  ${(message || "").replace(/\n/g, "<br/>")}
                </div>
              </div>

            </td>
          </tr>

          <tr>
            <td style="padding:20px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;color:#6b7280;font-size:13px;">
                This email was automatically generated from the
                <strong>ClareIT</strong> contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `New contact from ${name}`,
      replyTo: email,
      text,
      html,
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email sent' }),
    }
  } catch (err) {
    console.error('sendMail error:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email' }),
    }
  }
}

export { handler }
