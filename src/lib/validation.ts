import { z } from 'zod'

export const leadFormSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),

  email: z.string()
    .email('Email inválido')
    .toLowerCase(),

  debtAmount: z.string().optional(),

  message: z.string()
    .max(1000, 'Mensagem muito longa')
    .optional(),

  website: z.string()
    .trim()
    .max(0, 'Campo inválido')
    .optional(),

  consent: z.literal(true, {
    errorMap: () => ({ message: 'Você deve aceitar os termos para continuar' })
  })
})

export type LeadFormInput = z.infer<typeof leadFormSchema>

export const cpfLookupSchema = z.object({
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido'),
})

export const simulationLeadSchema = z.object({
  nome: z.string()
    .trim()
    .min(2, 'Informe seu nome completo')
    .max(100, 'Nome muito longo'),

  telefone: z.string()
    .transform((value) => value.replace(/\D/g, ''))
    .pipe(z.string().min(10, 'Informe um telefone válido').max(11, 'Informe um telefone válido')),

  email: z.string()
    .trim()
    .email('Email inválido')
    .toLowerCase(),

  perfil: z.enum(['aposentado', 'loas', 'servidor'], {
    errorMap: () => ({ message: 'Selecione seu perfil' }),
  }),

  faixa_divida: z.enum(['5k', '10k', '50k'], {
    errorMap: () => ({ message: 'Selecione uma faixa de dívida elegível' }),
  }),

  faixa_renda: z.enum(['2k', '5k'], {
    errorMap: () => ({ message: 'Selecione uma faixa de renda elegível' }),
  }),

  consentimento: z.literal(true, {
    errorMap: () => ({ message: 'Você precisa aceitar os termos para continuar' }),
  }),

  utm_source: z.string().trim().min(1).max(100),
  utm_medium: z.string().trim().min(1).max(100),
  created_at: z.string().datetime('Data de criação inválida'),
})

export type SimulationLeadInput = z.infer<typeof simulationLeadSchema>
