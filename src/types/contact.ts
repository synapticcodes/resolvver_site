export type PainelContatoAtivo = 'cliente' | 'simulacao' | null

export type PerfilSimulacao = 'aposentado' | 'loas' | 'servidor'
export type FaixaDivida = 'low' | '5k' | '10k' | '50k' | ''
export type FaixaRenda = 'low' | '2k' | '5k' | ''

export interface ClienteEncontrado {
  nome: string
  status: string
  plano: string
  proximo_vencimento: string
  whatsapp_consultor: string
}

export interface BuscaClienteResponse {
  found: boolean
  cliente?: ClienteEncontrado
  error?: string
}

export interface FormularioSimulacaoData {
  nome: string
  telefone: string
  email: string
  perfil: PerfilSimulacao | ''
  faixa_divida: FaixaDivida
  faixa_renda: FaixaRenda
  consentimento: boolean
}

export interface RespostaSimulacao {
  success: boolean
  message: string
}
