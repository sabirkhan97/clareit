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
  const html = `<p><strong>Name:</strong> ${name}</p>\n  <p><strong>Email:</strong> ${email}</p>\n  <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>\n  <p><strong>Message:</strong></p>\n  <p>${(message || '').replace(/\n/g, '<br/>')}</p>`

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
