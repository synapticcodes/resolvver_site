import { NextRequest, NextResponse } from 'next/server'
import { clientesMockados } from '@/data/clientes'
import { cpfLookupSchema } from '@/lib/validation'

export const runtime = 'nodejs'

const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

const rateLimitStore = new Map<string, number[]>()

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

export async function GET(request: NextRequest) {
  const clientId = getClientIdentifier(request)

  if (isRateLimited(clientId)) {
    return NextResponse.json(
      { error: 'Muitas buscas em sequência. Aguarde um minuto e tente novamente.' },
      { status: 429 }
    )
  }

  const cpf = request.nextUrl.searchParams.get('cpf')?.replace(/\D/g, '') ?? ''
  const validationResult = cpfLookupSchema.safeParse({ cpf })

  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'CPF inválido. Informe os 11 dígitos para continuar.' },
      { status: 400 }
    )
  }

  try {
    const cliente = clientesMockados[validationResult.data.cpf]
    const encontrado = Boolean(cliente)

    console.info('Busca de cliente por CPF', {
      encontrado,
      finalCpf: validationResult.data.cpf.slice(-4),
    })

    if (!cliente) {
      return NextResponse.json({ found: false }, { status: 200 })
    }

    return NextResponse.json(
      {
        found: true,
        cliente,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao buscar cliente por CPF:', error)

    return NextResponse.json(
      { error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    )
  }
}
