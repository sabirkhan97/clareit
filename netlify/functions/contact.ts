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
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New ClareIT Contact Request</title>
  </head>
  <body style="margin:0;padding:32px;background:#F6F4EF;font-family:Inter, Arial, Helvetica, sans-serif;color:#11151C;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;border-collapse:collapse;">
      <tr>
        <td>
          <div style="background:linear-gradient(135deg, #11151C 0%, #1F2630 100%);border-radius:20px;padding:32px 32px 24px;box-shadow:0 12px 30px rgba(17,21,28,0.12);">
            <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#A8A0F5;font-weight:700;margin-bottom:10px;">ClareIT</div>
            <h1 style="margin:0;color:#FFFFFF;font-size:28px;line-height:1.2;font-family:Georgia, 'Times New Roman', serif;">New contact request</h1>
            <p style="margin:10px 0 0;color:#E5E7EB;font-size:15px;line-height:1.65;">Someone just submitted your contact form and wants to start a conversation.</p>
          </div>

          <div style="background:#FFFFFF;border:1px solid #DEDAD0;border-radius:18px;margin-top:18px;padding:28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F1EFE9;width:120px;font-weight:700;color:#11151C;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #F1EFE9;color:#475063;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F1EFE9;width:120px;font-weight:700;color:#11151C;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #F1EFE9;color:#475063;"><a href="mailto:${email}" style="color:#4F46E5;text-decoration:none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F1EFE9;width:120px;font-weight:700;color:#11151C;">Budget</td>
                <td style="padding:10px 0;border-bottom:1px solid #F1EFE9;color:#475063;">${budget || 'Not specified'}</td>
              </tr>
            </table>

            <div style="margin-top:24px;">
              <div style="font-weight:700;color:#11151C;margin-bottom:8px;">Project details</div>
              <div style="background:#F9F7F2;border-left:4px solid #E8743B;padding:16px 18px;border-radius:10px;color:#475063;line-height:1.7;">
                ${(message || '').replace(/\n/g, '<br/>')}
              </div>
            </div>
          </div>

          <div style="text-align:center;padding:20px 12px 0;color:#6B7488;font-size:13px;line-height:1.6;">
            This email was automatically generated from the ClareIT contact form.
          </div>
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
