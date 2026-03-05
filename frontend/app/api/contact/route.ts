import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const SUBJECT_LABELS: Record<string, string> = {
  'artwork-inquiry': 'Artwork Inquiry',
  commission: 'Commission Request',
  exhibition: 'Exhibition Opportunity',
  general: 'General Question',
  press: 'Press / Media',
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function getVisitorIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'Unavailable'
  }

  return request.headers.get('x-real-ip') || 'Unavailable'
}

function buildSubject(rawSubject: string) {
  const trimmed = rawSubject.trim()
  const mapped = SUBJECT_LABELS[trimmed] || trimmed
  return sanitizeHeaderValue(mapped || 'General Question')
}

function validateEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const subject = buildSubject(String(body.subject || ''))
    const message = String(body.message || '').trim()
    const sourcePage = String(body.sourcePage || '/contact').trim() || '/contact'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gichevaart.com'

    if (name.length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters.' }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (message.length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 })
    }

    const smtpHost = process.env.MAIL_SMTP_INTERNAL_HOST || process.env.MAIL_SMTP_HOST
    const smtpServerName = process.env.MAIL_SMTP_HOST || smtpHost
    const smtpPort = Number(process.env.MAIL_SMTP_PORT || 587)
    const smtpUser = process.env.MAIL_SMTP_USER
    const smtpPassword = process.env.MAIL_SMTP_PASSWORD
    const mailFrom = process.env.MAIL_FROM || 'no-reply@gichevaart.com'
    const contactTo = process.env.MAIL_CONTACT_TO || 'contact@gichevaart.com'

    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error('Contact form mailer is not configured.')
      return NextResponse.json({ error: 'Mail service is not configured.' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      requireTLS: true,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      tls: {
        servername: smtpServerName,
      },
    })

    const timestamp = new Date().toISOString()
    const ip = getVisitorIp(request)
    const userAgent = request.headers.get('user-agent') || 'Unavailable'
    const referer = request.headers.get('referer') || 'Unavailable'
    const formattedSubject = `Gichevaart contact form: ${subject}`

    const text = [
      'New contact form submission',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      `Source Page: ${sourcePage}`,
      `Site URL: ${siteUrl}`,
      `Timestamp: ${timestamp}`,
      `IP: ${ip}`,
      `User-Agent: ${userAgent}`,
      `Referer: ${referer}`,
      '',
      'Message:',
      message,
    ].join('\n')

    await transporter.sendMail({
      to: contactTo,
      from: mailFrom,
      replyTo: email,
      subject: formattedSubject,
      text,
    })

    transporter.close()

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form send failed:', error)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
