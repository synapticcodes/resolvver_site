import { z } from 'zod'

export const leadFormSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),

  email: z.string()
    .email('Email inválido')
    .toLowerCase(),

  phone: z.string()
    .regex(
      /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/,
      'Telefone inválido. Use o formato (XX) XXXXX-XXXX'
    ),

  debtAmount: z.string().optional(),

  message: z.string()
    .max(1000, 'Mensagem muito longa')
    .optional(),

  consent: z.literal(true, {
    errorMap: () => ({ message: 'Você deve aceitar os termos para continuar' })
  })
})

export type LeadFormInput = z.infer<typeof leadFormSchema>
