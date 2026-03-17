import nodemailer from 'nodemailer'
import type { LeadFormData } from '@/types/lead'

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const getRequiredEnv = (name: 'SMTP_HOST' | 'SMTP_PORT' | 'SMTP_USER' | 'SMTP_PASS' | 'LEAD_EMAIL_TO') => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`)
  }

  return value
}

let transporter: nodemailer.Transporter | null = null

const getTransporter = () => {
  if (transporter) {
    return transporter
  }

  const smtpHost = getRequiredEnv('SMTP_HOST')
  const smtpPort = Number.parseInt(getRequiredEnv('SMTP_PORT'), 10)
  const smtpUser = getRequiredEnv('SMTP_USER')
  const smtpPass = getRequiredEnv('SMTP_PASS')

  if (Number.isNaN(smtpPort)) {
    throw new Error('SMTP_PORT precisa ser um numero valido')
  }

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  return transporter
}

export async function sendLeadEmail(data: LeadFormData) {
  const { name, email, debtAmount, message } = data
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeDebtAmount = debtAmount ? escapeHtml(debtAmount) : undefined
  const safeMessage = message ? escapeHtml(message) : undefined

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0C213E; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #0C213E; }
          .value { margin-top: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Novo Lead - Resolvver</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nome:</div>
              <div class="value">${safeName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${safeEmail}</div>
            </div>
            ${safeDebtAmount ? `
              <div class="field">
                <div class="label">Valor da Dívida:</div>
                <div class="value">${safeDebtAmount}</div>
              </div>
            ` : ''}
            ${safeMessage ? `
              <div class="field">
                <div class="label">Mensagem:</div>
                <div class="value">${safeMessage}</div>
              </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Este email foi enviado automaticamente através do formulário do site Resolvver.</p>
          </div>
        </div>
      </body>
    </html>
  `

  const mailOptions = {
    from: getRequiredEnv('SMTP_USER'),
    to: getRequiredEnv('LEAD_EMAIL_TO'),
    subject: `Novo Lead: ${name}`,
    html: htmlContent,
    text: `
Novo Lead - Resolvver

Nome: ${name}
Email: ${email}
${debtAmount ? `Valor da Dívida: ${debtAmount}` : ''}
${message ? `Mensagem: ${message}` : ''}
    `,
  }

  try {
    await getTransporter().sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar email do lead:', error instanceof Error ? error.message : 'Erro desconhecido')
    throw error
  }
}
