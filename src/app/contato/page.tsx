import ContatoExperience from '@/components/contact/ContatoExperience'
import { buildPageMetadata } from '@/lib/metadata'
import type { PainelContatoAtivo } from '@/types/contact'

const resolveInitialMode = (mode: string | string[] | undefined): PainelContatoAtivo => {
  const resolvedMode = Array.isArray(mode) ? mode[0] : mode

  if (resolvedMode === 'cliente' || resolvedMode === 'simulacao') {
    return resolvedMode
  }

  return null
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await searchParams
  const initialMode = resolveInitialMode(resolvedSearchParams.modo)

  if (initialMode === 'simulacao') {
    return buildPageMetadata({
      title: 'Simule seu caso',
      description: 'Liquidamos suas dívidas com até 90% de desconto. Descubra quanto você pode economizar com nosso simulador.',
      path: '/contato?modo=simulacao',
    })
  }

  if (initialMode === 'cliente') {
    return buildPageMetadata({
      title: 'Atendimento ao cliente',
      description: 'Já é cliente Resolvver? Informe seu CPF, encontre seu cadastro e escolha o canal ideal para acompanhar seu caso.',
      path: '/contato?modo=cliente',
    })
  }

  return buildPageMetadata({
    title: 'Contato',
    description: 'Entre em contato com a Resolvver para tirar dúvidas, iniciar sua simulação e entender as possibilidades de reorganizar suas dívidas.',
    path: '/contato',
  })
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await searchParams
  const initialMode = resolveInitialMode(resolvedSearchParams.modo)

  return <ContatoExperience initialMode={initialMode} />
}
