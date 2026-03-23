import type { ClienteEncontrado } from '@/types/contact'

export const clientesMockados: Record<string, ClienteEncontrado> = {
  '12345678909': {
    nome: 'Maria Aparecida Santos',
    status: 'Em negociação',
    plano: 'No Azul - 24x',
    proximo_vencimento: '2026-03-22',
    whatsapp_consultor: '5551999999999',
  },
  '39053344705': {
    nome: 'José Roberto Ferreira',
    status: 'Plano ativo',
    plano: 'Recomeço - 18x',
    proximo_vencimento: '2026-04-05',
    whatsapp_consultor: '5551988887777',
  },
  '52998224725': {
    nome: 'Sandra Cristina Lima',
    status: 'Aguardando pagamento',
    plano: 'No Azul - 12x',
    proximo_vencimento: '2026-03-28',
    whatsapp_consultor: '5551977776666',
  },
}
