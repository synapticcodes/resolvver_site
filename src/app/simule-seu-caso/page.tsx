import { permanentRedirect } from 'next/navigation'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Simule seu caso',
  description: 'Descubra quanto você pode economizar com a renegociação de dívidas da Resolvver e envie sua simulação para receber contato.',
  path: '/simule-seu-caso',
})

export default function SimulatePage() {
  permanentRedirect('/contato?modo=simulacao')
}
