'use client'

import Link from 'next/link'
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { z } from 'zod'
import { siteConfig } from '@/config/site'
import { simulationLeadSchema } from '@/lib/validation'
import { trackWolfgangSimulation } from '@/lib/wolfgang-tracking'
import type {
  BuscaClienteResponse,
  FaixaDivida,
  FaixaRenda,
  FormularioSimulacaoData,
  PainelContatoAtivo,
  PerfilSimulacao,
  RespostaSimulacao,
} from '@/types/contact'

const opcoesPerfil: Array<{ value: PerfilSimulacao; label: string }> = [
  { value: 'aposentado', label: 'Aposentado / Pensionista' },
  { value: 'loas', label: 'Beneficiário LOAS' },
  { value: 'servidor', label: 'Servidor Público' },
]

const opcoesDivida: Array<{ value: Exclude<FaixaDivida, ''>; label: string }> = [
  { value: 'low', label: 'Menos de R$ 5.000' },
  { value: '5k', label: 'R$ 5.000 - R$ 10.000' },
  { value: '10k', label: 'R$ 10.000 - R$ 50.000' },
  { value: '50k', label: 'Mais de R$ 50.000' },
]

const opcoesRenda: Array<{ value: Exclude<FaixaRenda, ''>; label: string }> = [
  { value: 'low', label: 'Inferior a R$ 2.000' },
  { value: '2k', label: 'Entre R$ 2.000 a R$ 5.000' },
  { value: '5k', label: 'Superior a R$ 5.000' },
]

const dadosIniciaisSimulacao: FormularioSimulacaoData = {
  nome: '',
  telefone: '',
  email: '',
  perfil: '',
  faixa_divida: '',
  faixa_renda: '',
  consentimento: false,
}

const extrairDigitos = (value: string) => value.replace(/\D/g, '')

const formatarCpf = (value: string) => {
  const digits = extrairDigitos(value).slice(0, 11)

  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
}

const formatarTelefone = (value: string) => {
  const digits = extrairDigitos(value).slice(0, 11)

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }

  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

const formatarWhatsappLink = (value: string) => `https://wa.me/${extrairDigitos(value)}`

const formatarData = (value: string) => {
  const date = new Date(`${value}T12:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('pt-BR').format(date)
}

const obterMensagemDesqualificacao = (faixaDivida: FaixaDivida, faixaRenda: FaixaRenda) => {
  const dividaBaixa = faixaDivida === 'low'
  const rendaBaixa = faixaRenda === 'low'

  if (!dividaBaixa && !rendaBaixa) {
    return null
  }

  if (dividaBaixa && rendaBaixa) {
    return {
      title: 'Infelizmente seu perfil não se qualifica',
      description:
        'No momento, nosso serviço de renegociação atende dívidas a partir de R$ 5.000 e renda a partir de R$ 2.000 mensais. Agradecemos o seu interesse e desejamos sucesso na resolução da sua situação financeira.',
    }
  }

  if (dividaBaixa) {
    return {
      title: 'Seu perfil não se qualifica no momento',
      description:
        'Nosso serviço é voltado para renegociação de dívidas a partir de R$ 5.000. Agradecemos o seu interesse e desejamos que você consiga resolver sua situação em breve.',
    }
  }

  return {
    title: 'Seu perfil não se qualifica no momento',
    description:
      'Nosso plano de renegociação foi desenhado para quem recebe a partir de R$ 2.000 mensais. Agradecemos o seu interesse e esperamos poder ajudá-lo no futuro.',
  }
}

function IconeUsuario() {
  return (
    <svg className="h-6 w-6 text-[#1A6B52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
    </svg>
  )
}

function IconeSeta() {
  return (
    <svg className="h-6 w-6 text-[#1A6B52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 16.5V6.75m0 0l-3.75 3.75M12 6.75l3.75 3.75M5.25 18.75h13.5" />
    </svg>
  )
}

function IconeCadeado() {
  return (
    <svg className="h-4 w-4 text-[#1A6B52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16.5 10.5V7.875a4.5 4.5 0 10-9 0V10.5m-.75 0h10.5A1.5 1.5 0 0118.75 12v6.75a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z" />
    </svg>
  )
}

function IconeCheck() {
  return (
    <svg className="h-6 w-6 text-[#1A6B52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.25 12.75l4.5 4.5 9-9" />
    </svg>
  )
}

function IconeErro() {
  return (
    <svg className="h-5 w-5 text-[#E24B4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function IconeInfo() {
  return (
    <svg className="h-5 w-5 text-[#854F0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m0 3.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function IconeWhatsapp() {
  return (
    <svg className="h-5 w-5 text-[#15803d]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.52 2 2.06 6.46 2.06 11.98c0 1.94.55 3.84 1.6 5.48L2 22l4.69-1.6a9.95 9.95 0 005.35 1.55h.01c5.51 0 9.97-4.46 9.97-9.97A9.98 9.98 0 0012.04 2zm5.83 14.17c-.24.68-1.4 1.29-1.93 1.38-.5.09-1.12.13-1.81-.09-.42-.13-.95-.31-1.64-.61-2.88-1.25-4.75-4.31-4.89-4.5-.13-.18-1.17-1.55-1.17-2.95 0-1.39.73-2.08.99-2.36.25-.28.55-.35.73-.35.19 0 .36 0 .52.01.17 0 .39-.06.61.46.23.56.78 1.94.85 2.09.07.15.11.32.02.5-.09.18-.13.31-.27.48-.13.16-.29.36-.41.48-.13.13-.27.28-.11.55.16.28.72 1.18 1.54 1.91 1.06.95 1.95 1.24 2.22 1.38.28.14.44.12.6-.07.17-.19.71-.82.91-1.1.19-.28.39-.23.65-.14.27.09 1.67.79 1.96.93.28.14.47.21.54.33.07.11.07.66-.17 1.34z" />
    </svg>
  )
}

function IconeEmail() {
  return (
    <svg className="h-5 w-5 text-[#1A6B52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21.75 7.5v9A2.25 2.25 0 0119.5 18.75h-15A2.25 2.25 0 012.25 16.5v-9m19.5 0A2.25 2.25 0 0019.5 5.25h-15A2.25 2.25 0 002.25 7.5m19.5 0v.24a2.25 2.25 0 01-1.07 1.92l-6.75 4.22a2.25 2.25 0 01-2.38 0L4.82 9.66a2.25 2.25 0 01-1.07-1.92V7.5" />
    </svg>
  )
}

function IconeCelular() {
  return (
    <svg className="h-5 w-5 text-[#1A6B52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.5 2.25h3a2.25 2.25 0 012.25 2.25v15a2.25 2.25 0 01-2.25 2.25h-3a2.25 2.25 0 01-2.25-2.25v-15A2.25 2.25 0 0110.5 2.25z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.5 18.75h3" />
    </svg>
  )
}

function SeloSeguranca({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-center text-xs font-medium text-[#1A6B52]">
      <IconeCadeado />
      <span>{text}</span>
    </div>
  )
}

function CartaoCanal({
  icon,
  title,
  description,
  href,
  cta,
  primary = false,
}: {
  icon: ReactNode
  title: string
  description: string
  href: string
  cta: string
  primary?: boolean
}) {
  return (
    <div className="rounded-xl border border-black/8 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${primary ? 'bg-green-100' : 'bg-[#E6F7F2]'}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0F2B4A]">{title}</p>
            <p className="text-sm text-[#555F6B]">{description}</p>
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
            primary
              ? 'bg-[#1DB387] text-white hover:bg-[#0D9E74]'
              : 'border border-[#1DB387] text-[#1DB387] hover:bg-[#E6F7F2]'
          }`}
        >
          {cta}
        </a>
      </div>
    </div>
  )
}

export default function ContatoExperience({
  initialMode = null,
}: {
  initialMode?: PainelContatoAtivo
}) {
  const [painelAtivo, setPainelAtivo] = useState<PainelContatoAtivo>(initialMode)
  const [cpf, setCpf] = useState('')
  const [erroCpf, setErroCpf] = useState('')
  const [cpfTemErroVisual, setCpfTemErroVisual] = useState(false)
  const [estadoBusca, setEstadoBusca] = useState<'idle' | 'loading' | 'not_found' | 'error' | 'found'>('idle')
  const [clienteEncontrado, setClienteEncontrado] = useState<BuscaClienteResponse['cliente']>()

  const [formData, setFormData] = useState<FormularioSimulacaoData>(dadosIniciaisSimulacao)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const alertaQualificacao = obterMensagemDesqualificacao(formData.faixa_divida, formData.faixa_renda)
  const simulacaoDesqualificada = Boolean(alertaQualificacao)

  useEffect(() => {
    if (!cpfTemErroVisual) {
      return
    }

    const timer = window.setTimeout(() => setCpfTemErroVisual(false), 1500)
    return () => window.clearTimeout(timer)
  }, [cpfTemErroVisual])

  const handleTogglePainel = (painel: Exclude<PainelContatoAtivo, null>) => {
    setPainelAtivo((prev) => (prev === painel ? null : painel))

    if (painel === 'cliente') {
      setSubmitStatus('idle')
      setSubmitMessage('')
      setFormErrors({})
    }

    if (painel === 'simulacao') {
      setErroCpf('')
      if (estadoBusca !== 'found') {
        setEstadoBusca('idle')
      }
    }
  }

  const buscarCliente = async () => {
    const cpfNumerico = extrairDigitos(cpf)

    if (cpfNumerico.length !== 11) {
      setErroCpf('Informe um CPF válido com 11 dígitos.')
      setCpfTemErroVisual(true)
      return
    }

    setErroCpf('')
    setEstadoBusca('loading')

    try {
      const response = await fetch(`/api/clientes/buscar?cpf=${cpfNumerico}`)
      const result = (await response.json()) as BuscaClienteResponse

      if (!response.ok) {
        setClienteEncontrado(undefined)
        setEstadoBusca('error')
        setErroCpf(result.error ?? 'Não foi possível buscar seu cadastro agora.')
        return
      }

      if (!result.found || !result.cliente) {
        setClienteEncontrado(undefined)
        setEstadoBusca('not_found')
        return
      }

      setClienteEncontrado(result.cliente)
      setEstadoBusca('found')
    } catch {
      setClienteEncontrado(undefined)
      setEstadoBusca('error')
      setErroCpf('Não foi possível buscar seu cadastro agora. Tente novamente em instantes.')
    }
  }

  const handleCpfSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await buscarCliente()
  }

  const handleSimulationFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target
    const checked = type === 'checkbox' ? event.target.checked : undefined
    const nextValue = name === 'telefone' ? formatarTelefone(value) : value

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : nextValue,
    }))

    setSubmitStatus('idle')
    setSubmitMessage('')

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const nextErrors = { ...prev }
        delete nextErrors[name]
        return nextErrors
      })
    }
  }

  const handlePerfilSelect = (perfil: PerfilSimulacao) => {
    setFormData((prev) => ({ ...prev, perfil }))

    if (formErrors.perfil) {
      setFormErrors((prev) => {
        const nextErrors = { ...prev }
        delete nextErrors.perfil
        return nextErrors
      })
    }
  }

  const handleSimulationSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setFormErrors({})
    setSubmitStatus('idle')
    setSubmitMessage('')

    if (simulacaoDesqualificada) {
      return
    }

    try {
      const payload = simulationLeadSchema.parse({
        ...formData,
        utm_source: 'site',
        utm_medium: 'contato',
        created_at: new Date().toISOString(),
      })

      setIsSubmitting(true)

      const response = await fetch('/api/leads/simulacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as RespostaSimulacao

      if (!response.ok || !result.success) {
        setSubmitStatus('error')
        setSubmitMessage(result.message ?? 'Não foi possível enviar sua simulação.')
        return
      }

      setSubmitStatus('success')
      setSubmitMessage(result.message)
      void trackWolfgangSimulation({
        nome: payload.nome,
        telefone: payload.telefone,
        email: payload.email,
        perfil: payload.perfil,
        faixaDivida: payload.faixa_divida,
        faixaRenda: payload.faixa_renda,
      })
      setFormData(dadosIniciaisSimulacao)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const nextErrors: Record<string, string> = {}

        for (const issue of error.errors) {
          const field = issue.path[0]

          if (field) {
            nextErrors[field.toString()] = issue.message
          }
        }

        setFormErrors(nextErrors)
      } else {
        setSubmitStatus('error')
        setSubmitMessage('Não foi possível enviar sua simulação. Tente novamente em instantes.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#F8FBFC] py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A6B52]">
            Fale com a Resolvver
          </span>
          <h1 className="mt-4 text-[28px] font-bold text-[#0F2B4A] md:text-[36px]">
            Como podemos ajudar?
          </h1>
          <p className="mt-3 text-[15px] text-[#555F6B]">
            Escolha a opção que melhor se encaixa na sua situação.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleTogglePainel('cliente')}
            className={`rounded-[14px] border-2 p-6 text-center transition-all duration-200 ${
              painelAtivo === 'cliente'
                ? 'border-[#1DB387] bg-[#F4FBF8]'
                : 'border-gray-200 bg-white hover:border-[#1DB387]'
            }`}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F7F2]">
              <IconeUsuario />
            </div>
            <h2 className="text-[17px] font-semibold text-[#0F2B4A]">Já sou cliente</h2>
            <p className="mt-2 text-[13px] text-[#555F6B]">
              Acesse nosso canal de suporte para tirar dúvidas ou acompanhar seu caso.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleTogglePainel('simulacao')}
            className={`rounded-[14px] border-2 p-6 text-center transition-all duration-200 ${
              painelAtivo === 'simulacao'
                ? 'border-[#1DB387] bg-[#F4FBF8]'
                : 'border-gray-200 bg-white hover:border-[#1DB387]'
            }`}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F7F2]">
              <IconeSeta />
            </div>
            <h2 className="text-[17px] font-semibold text-[#0F2B4A]">Quero simular meu caso</h2>
            <p className="mt-2 text-[13px] text-[#555F6B]">
              Descubra quanto você pode economizar. Simule gratuitamente.
            </p>
          </button>
        </div>

        {painelAtivo === 'cliente' && (
          <div className="rounded-[14px] bg-[#F4FBF8] p-6">
            {estadoBusca !== 'found' || !clienteEncontrado ? (
              <div className="space-y-6">
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-[#0F2B4A]">Encontre seu cadastro</h3>
                  <p className="mt-2 text-sm text-[#555F6B]">
                    Informe seu CPF para localizarmos seu caso e direcionar você ao canal certo.
                  </p>
                </div>

                <form onSubmit={handleCpfSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="cpf" className="mb-2 block text-sm font-medium text-[#0F2B4A]">
                      CPF *
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        id="cpf"
                        name="cpf"
                        type="text"
                        inputMode="numeric"
                        maxLength={14}
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(event) => setCpf(formatarCpf(event.target.value))}
                        className={`h-[46px] w-full rounded-[10px] border bg-white px-4 text-base font-medium tracking-[0.08em] text-[#0F2B4A] outline-none transition-colors ${
                          cpfTemErroVisual || erroCpf
                            ? 'border-[#E24B4A]'
                            : 'border-black/10 focus:border-[#1DB387]'
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={estadoBusca === 'loading'}
                        className="inline-flex h-[46px] items-center justify-center rounded-full bg-[#1DB387] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0D9E74] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {estadoBusca === 'loading' ? 'Buscando...' : 'Buscar'}
                      </button>
                    </div>
                    {erroCpf && estadoBusca !== 'error' && (
                      <p className="mt-2 text-sm text-[#E24B4A]">{erroCpf}</p>
                    )}
                  </div>
                </form>

                {estadoBusca === 'loading' && (
                  <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-4 text-sm text-[#0F2B4A]">
                    <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#E6F7F2] border-t-[#1DB387]" />
                    <span>Buscando seu cadastro...</span>
                  </div>
                )}

                {estadoBusca === 'error' && (
                  <div className="rounded-xl border border-[#E24B4A]/20 bg-white px-4 py-4">
                    <p className="text-sm font-medium text-[#0F2B4A]">{erroCpf}</p>
                  </div>
                )}

                {estadoBusca === 'not_found' && (
                  <div className="rounded-xl border border-[#E24B4A]/20 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FDECEC]">
                        <IconeErro />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-[#0F2B4A]">CPF não encontrado</p>
                        <p className="text-sm text-[#555F6B]">
                          Não localizamos este CPF em nossa base. Confira se digitou corretamente ou, se ainda não é cliente,{' '}
                          <button
                            type="button"
                            onClick={() => setPainelAtivo('simulacao')}
                            className="font-semibold text-[#1DB387] underline"
                          >
                            simule seu caso aqui
                          </button>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <SeloSeguranca text="Seus dados estão protegidos e não serão compartilhados" />
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-start gap-4 border-b border-black/8 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F7F2]">
                    <IconeCheck />
                  </div>
                  <div>
                    <p className="text-[17px] font-semibold text-[#0F2B4A]">
                      Olá, <span className="font-bold">{clienteEncontrado.nome}</span>!
                    </p>
                    <p className="mt-1 text-sm text-[#555F6B]">
                      Encontramos seu cadastro. Escolha como deseja falar conosco.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-black/8 bg-white px-4 py-4">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.15em] text-[#1A6B52]">
                    Resumo do seu caso
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-[11px] text-[#888888]">Status</p>
                      <p className="mt-1 flex items-center gap-2 text-[13px] font-semibold text-[#0F2B4A]">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#1DB387]" />
                        {clienteEncontrado.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#888888]">Plano</p>
                      <p className="mt-1 text-[13px] font-semibold text-[#0F2B4A]">{clienteEncontrado.plano}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#888888]">Próx. vencimento</p>
                      <p className="mt-1 text-[13px] font-semibold text-[#0F2B4A]">
                        {formatarData(clienteEncontrado.proximo_vencimento)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-[#0F2B4A]">Canais de atendimento</p>
                  <CartaoCanal
                    icon={<IconeWhatsapp />}
                    title="WhatsApp"
                    description="Fale com seu consultor dedicado"
                    href={formatarWhatsappLink(clienteEncontrado.whatsapp_consultor)}
                    cta="Abrir conversa"
                    primary
                  />
                  <CartaoCanal
                    icon={<IconeEmail />}
                    title="E-mail"
                    description={siteConfig.support.email}
                    href={`mailto:${siteConfig.support.email}`}
                    cta="Enviar e-mail"
                  />
                  <CartaoCanal
                    icon={<IconeCelular />}
                    title="App Resolvver"
                    description="Acompanhe tudo em tempo real"
                    href={siteConfig.support.appUrl}
                    cta="Baixar app"
                  />
                </div>

                <div className="border-l-[3px] border-[#1DB387] bg-white px-4 py-3 text-sm text-[#555F6B]">
                  {siteConfig.support.serviceHours}
                </div>
              </div>
            )}
          </div>
        )}

        {painelAtivo === 'simulacao' && (
          <div className="rounded-[14px] bg-[#F4FBF8] p-6">
            <div className="space-y-6">
              <div className="rounded-[14px] border border-[#1DB387]/15 bg-white px-5 py-5 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1A6B52]">
                  Simule seu caso
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#0F2B4A] md:text-[32px]">
                  Liquidamos suas dívidas com até 90% de desconto
                </h2>
                <p className="mt-3 text-sm text-[#555F6B] md:text-base">
                  Descubra quanto você pode economizar com nosso simulador.
                </p>
              </div>

              <div className="text-left">
                <h3 className="text-xl font-semibold text-[#0F2B4A]">Simule seu caso gratuitamente</h3>
                <p className="mt-2 text-sm text-[#555F6B]">
                  Preencha os dados abaixo e nossa equipe entrará em contato com uma análise personalizada.
                </p>
              </div>

              {submitStatus === 'success' ? (
                <div className="rounded-xl border border-[#1DB387]/20 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F7F2]">
                      <IconeCheck />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#0F2B4A]">Obrigado! Recebemos sua simulação.</p>
                      <p className="mt-1 text-sm text-[#555F6B]">
                        Entraremos em contato em breve pelo WhatsApp ou email informado.
                      </p>
                      {submitMessage && (
                        <p className="mt-2 text-sm text-[#1A6B52]">{submitMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSimulationSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nome" className="mb-2 block text-sm font-medium text-[#0F2B4A]">
                      Nome completo *
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      value={formData.nome}
                      onChange={handleSimulationFieldChange}
                      placeholder="Digite seu nome"
                      className={`w-full rounded-[10px] border bg-white px-4 py-3 text-base text-[#0F2B4A] outline-none transition-colors ${
                        formErrors.nome ? 'border-[#E24B4A]' : 'border-black/12 focus:border-[#1DB387]'
                      }`}
                    />
                    {formErrors.nome && <p className="mt-2 text-sm text-[#E24B4A]">{formErrors.nome}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="telefone" className="mb-2 block text-sm font-medium text-[#0F2B4A]">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        inputMode="numeric"
                        value={formData.telefone}
                        onChange={handleSimulationFieldChange}
                        placeholder="(00) 00000-0000"
                        className={`w-full rounded-[10px] border bg-white px-4 py-3 text-base text-[#0F2B4A] outline-none transition-colors ${
                          formErrors.telefone ? 'border-[#E24B4A]' : 'border-black/12 focus:border-[#1DB387]'
                        }`}
                      />
                      {formErrors.telefone && <p className="mt-2 text-sm text-[#E24B4A]">{formErrors.telefone}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#0F2B4A]">
                        E-mail *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleSimulationFieldChange}
                        placeholder="seu@email.com"
                        className={`w-full rounded-[10px] border bg-white px-4 py-3 text-base text-[#0F2B4A] outline-none transition-colors ${
                          formErrors.email ? 'border-[#E24B4A]' : 'border-black/12 focus:border-[#1DB387]'
                        }`}
                      />
                      {formErrors.email && <p className="mt-2 text-sm text-[#E24B4A]">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#0F2B4A]">Você é: *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {opcoesPerfil.map((option) => {
                        const ativo = formData.perfil === option.value

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handlePerfilSelect(option.value)}
                            className={`rounded-[10px] border px-2 py-3 text-center text-[12.5px] font-medium transition-colors ${
                              ativo
                                ? 'border-[#1DB387] bg-[#E6F7F2] text-[#1A6B52]'
                                : 'border-black/12 bg-white text-[#0F2B4A] hover:border-[#1DB387]'
                            }`}
                          >
                            {option.label}
                          </button>
                        )
                      })}
                    </div>
                    {formErrors.perfil && <p className="mt-2 text-sm text-[#E24B4A]">{formErrors.perfil}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="faixa_divida" className="mb-2 block text-sm font-medium text-[#0F2B4A]">
                        Valor aproximado da dívida *
                      </label>
                      <p className="mb-2 text-[11.5px] text-[#888888]">
                        Soma de todos os empréstimos e dívidas em aberto
                      </p>
                      <select
                        id="faixa_divida"
                        name="faixa_divida"
                        value={formData.faixa_divida}
                        onChange={handleSimulationFieldChange}
                        className={`w-full rounded-[10px] border bg-white px-4 py-3 text-base text-[#0F2B4A] outline-none transition-colors ${
                          formErrors.faixa_divida ? 'border-[#E24B4A]' : 'border-black/12 focus:border-[#1DB387]'
                        }`}
                      >
                        <option value="">Selecione uma faixa</option>
                        {opcoesDivida.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {formErrors.faixa_divida && (
                        <p className="mt-2 text-sm text-[#E24B4A]">{formErrors.faixa_divida}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="faixa_renda" className="mb-2 block text-sm font-medium text-[#0F2B4A]">
                        Salário ou benefício líquido *
                      </label>
                      <p className="mb-2 text-[11.5px] text-[#888888]">
                        Valor que cai na sua conta após descontos
                      </p>
                      <select
                        id="faixa_renda"
                        name="faixa_renda"
                        value={formData.faixa_renda}
                        onChange={handleSimulationFieldChange}
                        className={`w-full rounded-[10px] border bg-white px-4 py-3 text-base text-[#0F2B4A] outline-none transition-colors ${
                          formErrors.faixa_renda ? 'border-[#E24B4A]' : 'border-black/12 focus:border-[#1DB387]'
                        }`}
                      >
                        <option value="">Selecione uma faixa</option>
                        {opcoesRenda.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {formErrors.faixa_renda && (
                        <p className="mt-2 text-sm text-[#E24B4A]">{formErrors.faixa_renda}</p>
                      )}
                    </div>
                  </div>

                  {alertaQualificacao && (
                    <div className="flex gap-3 rounded-xl border border-[#EFD88D] bg-[#FFF8E6] p-4">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#F8E7B6]">
                        <IconeInfo />
                      </div>
                      <div>
                        <p className="font-semibold text-[#633806]">{alertaQualificacao.title}</p>
                        <p className="mt-1 text-sm text-[#854F0B]">{alertaQualificacao.description}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="flex items-start gap-3 text-xs text-[#555F6B]">
                      <input
                        type="checkbox"
                        name="consentimento"
                        checked={formData.consentimento}
                        onChange={handleSimulationFieldChange}
                        className="mt-0.5 h-4 w-4 rounded border-black/15 text-[#1DB387] focus:ring-[#1DB387]"
                      />
                      <span>
                        Concordo em compartilhar minhas informações para receber contato da Resolvver. Li e aceito a{' '}
                        <Link href="/privacidade" target="_blank" className="font-semibold text-[#1DB387] underline">
                          Política de Privacidade
                        </Link>{' '}
                        e os{' '}
                        <Link href="/termos" target="_blank" className="font-semibold text-[#1DB387] underline">
                          Termos de Uso
                        </Link>
                        . *
                      </span>
                    </label>
                    {formErrors.consentimento && (
                      <p className="mt-2 text-sm text-[#E24B4A]">{formErrors.consentimento}</p>
                    )}
                  </div>

                  {submitStatus === 'error' && submitMessage && (
                    <div className="rounded-xl border border-[#E24B4A]/15 bg-[#FDECEC] px-4 py-3 text-sm text-[#A53030]">
                      {submitMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || simulacaoDesqualificada}
                    className={`w-full rounded-full px-6 py-3.5 text-[15px] font-semibold text-white transition-colors ${
                      isSubmitting || simulacaoDesqualificada
                        ? 'cursor-not-allowed bg-[#b0b0b0]'
                        : 'bg-[#1DB387] hover:bg-[#0D9E74]'
                    }`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Simular meu caso'}
                  </button>

                  <SeloSeguranca text="Seus dados estão seguros e protegidos" />
                </form>
              )}
            </div>
          </div>
        )}

        <div className="border-t border-black/8 pt-6 text-center">
          <p className="text-sm text-[#555F6B]">Outros canais</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
            <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-[#1DB387] hover:underline">
              {siteConfig.contact.email}
            </a>
            <span className="text-[#555F6B]">·</span>
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1DB387] hover:underline"
            >
              Instagram
            </a>
            <span className="text-[#555F6B]">·</span>
            <a
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1DB387] hover:underline"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
