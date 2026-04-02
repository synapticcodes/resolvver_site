type UtmData = {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
}

type WolfgangTrackingPayload = {
  event: 'FormSubmit'
  event_id: string
  event_source_url: string
  fbp?: string
  fbc?: string
  utm?: UtmData
  lead: {
    name?: string
    phone?: string
    email?: string
  }
  extra: {
    source: 'site_resolvver_contato_simulacao'
    perfil: string
    faixa_divida: string
    faixa_renda: string
  }
}

type WolfgangTrackingInput = {
  nome: string
  telefone: string
  email: string
  perfil: string
  faixaDivida: string
  faixaRenda: string
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: (...args: unknown[]) => void
    __wolfgangMetaPixelInitialized?: boolean
  }
}

type MetaQueueFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded?: boolean
  version?: string
  push?: (...args: unknown[]) => void
}

const COOKIE_DAYS = 90
const SECONDS_PER_DAY = 86400
const FBP_RAND_MAX = 1e16
const UTM_STORAGE_KEY = 'resolvver_wolfgang_utm'
const FBCLID_STORAGE_KEY = 'resolvver_wolfgang_fbclid'
const META_PIXEL_ID = process.env.NEXT_PUBLIC_WOLFGANG_META_PIXEL_ID

const readCookie = (name: string) => {
  if (typeof document === 'undefined') {
    return null
  }

  const escapedName = name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

const setCookie = (name: string, value: string, days: number) => {
  if (typeof document === 'undefined') {
    return
  }

  const maxAge = days > 0 ? `; max-age=${String(Math.floor(days * SECONDS_PER_DAY))}` : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/${maxAge}; samesite=lax`
}

const readQueryParam = (key: string) => {
  if (typeof window === 'undefined') {
    return null
  }

  const params = new URLSearchParams(window.location.search || '')
  const value = params.get(key)
  return value && value.trim() ? value.trim() : null
}

const readStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const writeStorage = (key: string, value: string) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Ignora indisponibilidade de storage no navegador.
  }
}

const getOrCreateFbp = () => {
  const existing = readCookie('_fbp')

  if (existing) {
    return existing
  }

  const generated = `fb.1.${String(Math.floor(Date.now() / 1000))}.${String(Math.floor(Math.random() * FBP_RAND_MAX))}`
  setCookie('_fbp', generated, COOKIE_DAYS)
  return generated
}

const getOrCreateFbc = () => {
  const existing = readCookie('_fbc')

  if (existing) {
    return existing
  }

  const fbclid = readQueryParam('fbclid') ?? readStorage(FBCLID_STORAGE_KEY)

  if (!fbclid) {
    return null
  }

  const generated = `fb.1.${String(Math.floor(Date.now() / 1000))}.${fbclid}`
  setCookie('_fbc', generated, COOKIE_DAYS)
  return generated
}

const getUtmFromQuery = (): UtmData | undefined => {
  const utm: UtmData = {}

  const source = readQueryParam('utm_source')
  const medium = readQueryParam('utm_medium')
  const campaign = readQueryParam('utm_campaign')
  const content = readQueryParam('utm_content')
  const term = readQueryParam('utm_term')

  if (source) utm.source = source
  if (medium) utm.medium = medium
  if (campaign) utm.campaign = campaign
  if (content) utm.content = content
  if (term) utm.term = term

  return Object.keys(utm).length ? utm : undefined
}

const getPersistedUtm = (): UtmData | undefined => {
  const storedValue = readStorage(UTM_STORAGE_KEY)

  if (!storedValue) {
    return undefined
  }

  try {
    const parsed = JSON.parse(storedValue) as UtmData
    return Object.keys(parsed).length ? parsed : undefined
  } catch {
    return undefined
  }
}

const getUtm = (): UtmData | undefined => getUtmFromQuery() ?? getPersistedUtm()

const normalizePhone = (raw: string) => {
  const digits = raw.replace(/\D/g, '')

  if (!digits) {
    return undefined
  }

  if (digits.length >= 12) {
    return `+${digits}`
  }

  if (digits.length === 10 || digits.length === 11) {
    return `+55${digits}`
  }

  return raw.startsWith('+') ? `+${digits}` : digits
}

const createEventId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  let seed = Date.now()

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (seed + Math.random() * 16) % 16 | 0
    seed = Math.floor(seed / 16)
    return (char === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}

const ensureMetaPixelLoaded = () => {
  if (!META_PIXEL_ID || typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  if (!window.fbq) {
    const queueHandler = function (...args: unknown[]) {
      queueHandler.callMethod
        ? queueHandler.callMethod.apply(queueHandler, args)
        : queueHandler.queue.push(args)
    } as MetaQueueFunction

    queueHandler.queue = []
    queueHandler.push = queueHandler
    queueHandler.loaded = true
    queueHandler.version = '2.0'

    window.fbq = queueHandler
    window._fbq = queueHandler

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript?.parentNode?.insertBefore(script, firstScript)
  }

  if (!window.__wolfgangMetaPixelInitialized) {
    window.fbq?.('init', META_PIXEL_ID)
    window.__wolfgangMetaPixelInitialized = true
  }
}

const sendMetaLead = (eventId: string) => {
  if (!META_PIXEL_ID || typeof window === 'undefined') {
    return
  }

  ensureMetaPixelLoaded()

  window.fbq?.('track', 'Lead', {}, { eventID: `${eventId}:Lead` })
  window.fbq?.('trackCustom', 'PreencheuFormulario', {}, { eventID: `${eventId}:PreencheuFormulario` })
}

export const persistWolfgangAttribution = () => {
  if (typeof window === 'undefined') {
    return
  }

  const utm = getUtmFromQuery()

  if (utm) {
    writeStorage(UTM_STORAGE_KEY, JSON.stringify(utm))
  }

  const fbclid = readQueryParam('fbclid')

  if (fbclid) {
    writeStorage(FBCLID_STORAGE_KEY, fbclid)

    if (!readCookie('_fbc')) {
      const generated = `fb.1.${String(Math.floor(Date.now() / 1000))}.${fbclid}`
      setCookie('_fbc', generated, COOKIE_DAYS)
    }
  }
}

export async function trackWolfgangSimulation(input: WolfgangTrackingInput) {
  if (typeof window === 'undefined') {
    return
  }

  const eventId = createEventId()
  const payload: WolfgangTrackingPayload = {
    event: 'FormSubmit',
    event_id: eventId,
    event_source_url: window.location.href,
    fbp: getOrCreateFbp(),
    fbc: getOrCreateFbc() ?? undefined,
    utm: getUtm(),
    lead: {
      name: input.nome.trim() || undefined,
      email: input.email.trim().toLowerCase() || undefined,
      phone: normalizePhone(input.telefone),
    },
    extra: {
      source: 'site_resolvver_contato_simulacao',
      perfil: input.perfil,
      faixa_divida: input.faixaDivida,
      faixa_renda: input.faixaRenda,
    },
  }

  sendMetaLead(eventId)

  try {
    await fetch('/api/tracking/wolfgang', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch (error) {
    console.error('Erro ao enviar tracking Wolfgang:', error)
  }
}
