'use client'

import { useState } from 'react'
import { z } from 'zod'
import Button from '@/components/ui/Button'
import { leadFormSchema } from '@/lib/validation'
import type { LeadFormData } from '@/types/lead'

export default function LeadForm() {
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    name: '',
    email: '',
    debtAmount: '',
    message: '',
    consent: false,
    website: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSubmitStatus('idle')

    try {
      // Validate form data
      const validatedData = leadFormSchema.parse(formData)

      setIsSubmitting(true)

      // Submit to API
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          debtAmount: '',
          message: '',
          consent: false,
          website: '',
        })
      } else {
        setSubmitStatus('error')
        setErrors({ submit: result.message || 'Erro ao enviar formulário' })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setSubmitStatus('error')
        setErrors({ submit: 'Erro ao enviar formulário. Tente novamente.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-navy mb-2">
          Nome completo *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.name ? 'border-red-500' : 'border-brand-emerald/40'
          } focus:ring-2 focus:ring-brand-emerald focus:border-brand-emerald`}
          placeholder="Seu nome completo"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-navy mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.email ? 'border-red-500' : 'border-brand-emerald/40'
          } focus:ring-2 focus:ring-brand-emerald focus:border-brand-emerald`}
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Debt Amount */}
      <div>
        <label htmlFor="debtAmount" className="block text-sm font-medium text-brand-navy mb-2">
          Valor aproximado da dívida (opcional)
        </label>
        <select
          id="debtAmount"
          name="debtAmount"
          value={formData.debtAmount}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-brand-emerald/40 focus:ring-2 focus:ring-brand-emerald focus:border-brand-emerald"
        >
          <option value="">Selecione uma faixa</option>
          <option value="Menos de R$ 5.000">Menos de R$ 5.000</option>
          <option value="R$ 5.000 - R$ 10.000">R$ 5.000 - R$ 10.000</option>
          <option value="R$ 10.000 - R$ 50.000">R$ 10.000 - R$ 50.000</option>
          <option value="Mais de R$ 50.000">Mais de R$ 50.000</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-navy mb-2">
          Mensagem (opcional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-brand-emerald/40 focus:ring-2 focus:ring-brand-emerald focus:border-brand-emerald"
          placeholder="Conte-nos um pouco mais sobre sua situação..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website || ''}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {/* Consent */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent || false}
          onChange={handleChange}
        className={`mt-1 w-4 h-4 text-brand-emerald border-brand-emerald/40 rounded focus:ring-brand-emerald ${
          errors.consent ? 'border-red-500' : ''
        }`}
      />
        <label htmlFor="consent" className="ml-2 text-sm text-brand-slate">
          Concordo em compartilhar minhas informações para receber contato da Resolvver. Li e aceito a{' '}
          <a href="/privacidade" className="text-brand-emerald hover:underline">
            Política de Privacidade
          </a>{' '}
          e os{' '}
          <a href="/termos" className="text-brand-emerald hover:underline">
            Termos de Uso
          </a>
          . *
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-red-500">{errors.consent}</p>
      )}

      {/* Submit Error */}
      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-600 font-medium">
            Formulário enviado com sucesso! Nossa equipe entrará em contato em breve.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        fullWidth
        size="lg"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar simulação'}
      </Button>

      <p className="text-xs text-brand-slate text-center">
        * Campos obrigatórios
      </p>
    </form>
  )
}
