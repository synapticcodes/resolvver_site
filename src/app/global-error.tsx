'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-slate-900">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-emerald">
            Ocorreu um erro inesperado
          </p>
          <h1 className="mb-4 text-3xl font-bold text-brand-navy">
            Não foi possível carregar esta página
          </h1>
          <p className="mb-8 text-base text-brand-slate">
            Nossa equipe foi notificada. Tente novamente em alguns instantes.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy"
          >
            Tentar novamente
          </button>
        </main>
      </body>
    </html>
  )
}
