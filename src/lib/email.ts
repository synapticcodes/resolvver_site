import nodemailer from 'nodemailer'
import type { LeadFormData } from '@/types/lead'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendLeadEmail(data: LeadFormData) {
  const { name, email, phone, debtAmount, message } = data

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
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Telefone:</div>
              <div class="value">${phone}</div>
            </div>
            ${debtAmount ? `
              <div class="field">
                <div class="label">Valor da Dívida:</div>
                <div class="value">${debtAmount}</div>
              </div>
            ` : ''}
            ${message ? `
              <div class="field">
                <div class="label">Mensagem:</div>
                <div class="value">${message}</div>
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
    from: process.env.SMTP_USER,
    to: process.env.LEAD_EMAIL_TO,
    subject: `Novo Lead: ${name}`,
    html: htmlContent,
    text: `
Novo Lead - Resolvver

Nome: ${name}
Email: ${email}
Telefone: ${phone}
${debtAmount ? `Valor da Dívida: ${debtAmount}` : ''}
${message ? `Mensagem: ${message}` : ''}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
