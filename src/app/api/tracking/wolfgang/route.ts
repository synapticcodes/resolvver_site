import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { siteConfig } from '@/config/site'

export const runtime = 'nodejs'

const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10

const allowedOrigins = new Set([
  siteConfig.url,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
])

const rateLimitStore = new Map<string, number[]>()

const wolfgangTrackingSchema = z.object({
  event: z.literal('FormSubmit'),
  event_id: z.string().min(1).max(120),
  event_source_url: z.string().url(),
  fbp: z.string().max(255).optional(),
  fbc: z.string().max(255).optional(),
  utm: z.object({
    source: z.string().max(255).optional(),
    medium: z.string().max(255).optional(),
    campaign: z.string().max(255).optional(),
    content: z.string().max(255).optional(),
    term: z.string().max(255).optional(),
  }).optional(),
  lead: z.object({
    name: z.string().max(255).optional(),
    phone: z.string().max(32).optional(),
    email: z.string().email().optional(),
  }),
  extra: z.object({
    source: z.literal('site_resolvver_contato_simulacao'),
    perfil: z.enum(['aposentado', 'loas', 'servidor']),
    faixa_divida: z.enum(['5k', '10k', '50k']),
    faixa_renda: z.enum(['2k', '5k']),
  }),
})

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
      { success: false, message: 'Origem da solicitação não permitida.' },
      { status: 403 }
    )
  }

  if (isRateLimited(clientId)) {
    return NextResponse.json(
      { success: false, message: 'Muitas tentativas de tracking em sequência.' },
      { status: 429 }
    )
  }

  const trackUrl = process.env.WOLFGANG_TRACK_URL

  if (!trackUrl) {
    return NextResponse.json(
      { success: false, message: 'Tracking Wolfgang não configurado.' },
      { status: 503 }
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Corpo da requisição inválido.' },
      { status: 400 }
    )
  }

  const validationResult = wolfgangTrackingSchema.safeParse(body)

  if (!validationResult.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Payload de tracking inválido.',
        errors: validationResult.error.errors,
      },
      { status: 400 }
    )
  }

  try {
    const upstreamResponse = await fetch(trackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validationResult.data),
      cache: 'no-store',
    })

    const upstreamText = await upstreamResponse.text()

    if (!upstreamResponse.ok) {
      console.error('Erro ao encaminhar tracking Wolfgang', {
        status: upstreamResponse.status,
        body: upstreamText,
      })

      return NextResponse.json(
        { success: false, message: 'Falha ao encaminhar tracking Wolfgang.' },
        { status: 502 }
      )
    }

    console.info('Tracking Wolfgang encaminhado com sucesso', {
      event: validationResult.data.event,
      eventId: validationResult.data.event_id,
      source: validationResult.data.extra.source,
      utmSource: validationResult.data.utm?.source ?? null,
    })

    return NextResponse.json(
      { success: true, message: 'Tracking enviado com sucesso.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro interno ao encaminhar tracking Wolfgang:', error)

    return NextResponse.json(
      { success: false, message: 'Erro interno ao enviar tracking Wolfgang.' },
      { status: 500 }
    )
  }
}
