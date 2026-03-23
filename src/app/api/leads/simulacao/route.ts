import { NextRequest, NextResponse } from 'next/server'
import { siteConfig } from '@/config/site'
import { simulationLeadSchema } from '@/lib/validation'

export const runtime = 'nodejs'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

const allowedOrigins = new Set([
  siteConfig.url,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
])

const rateLimitStore = new Map<string, number[]>()

const isAllowedOrigin = (origin: string) => allowedOrigins.has(origin)

const getClientIdentifier = (request: NextRequest) => {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  return realIp ?? 'unknown'
}

const isRateLimited = (clientId: string) => {
  const now = Date.now()
  const recentRequests = (rateLimitStore.get(clientId) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(clientId, recentRequests)
    return true
  }

  recentRequests.push(now)
  rateLimitStore.set(clientId, recentRequests)
  return false
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  const clientId = getClientIdentifier(request)

  if (origin && !isAllowedOrigin(origin)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Origem da solicitação não permitida.',
      },
      { status: 403 }
    )
  }

  if (isRateLimited(clientId)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Muitas tentativas em sequência. Aguarde alguns minutos e tente novamente.',
      },
      { status: 429 }
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Corpo da requisição inválido.',
      },
      { status: 400 }
    )
  }

  const validationResult = simulationLeadSchema.safeParse(body)

  if (!validationResult.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Dados inválidos. Revise os campos e tente novamente.',
        errors: validationResult.error.errors,
      },
      { status: 400 }
    )
  }

  try {
    console.info('Lead de simulação recebido', {
      perfil: validationResult.data.perfil,
      faixaDivida: validationResult.data.faixa_divida,
      faixaRenda: validationResult.data.faixa_renda,
      utmSource: validationResult.data.utm_source,
      utmMedium: validationResult.data.utm_medium,
      createdAt: validationResult.data.created_at,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Simulação recebida com sucesso.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao registrar lead de simulação:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno. Tente novamente.',
      },
      { status: 500 }
    )
  }
}
