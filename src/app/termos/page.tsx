import type { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso da Resolvver - Condições para utilização dos nossos serviços.',
}

export default function TermsPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-navy to-brand-slate text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Termos de Uso</h1>
            <p className="text-xl text-brand-sky">
              Última atualização: Janeiro de 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <Container size="small">
          <div className="prose prose-lg max-w-none">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar o site da Resolvver, você concorda em cumprir estes termos de uso e todas as leis e regulamentos aplicáveis.
            </p>

            <h2>2. Serviços</h2>
            <p>
              A Resolvver oferece serviços de consultoria e intermediação para renegociação de dívidas. Os resultados podem variar de acordo com cada caso específico.
            </p>

            <h2>3. Responsabilidades do Usuário</h2>
            <p>
              Você é responsável por:
            </p>
            <ul>
              <li>Fornecer informações verdadeiras e precisas</li>
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Cumprir todas as obrigações financeiras acordadas</li>
              <li>Notificar-nos sobre qualquer uso não autorizado de sua conta</li>
            </ul>

            <h2>4. Limitação de Responsabilidade</h2>
            <p>
              A Resolvver não garante resultados específicos de desconto ou prazo. Todas as negociações dependem da aprovação dos credores e das condições específicas de cada caso.
            </p>

            <h2>5. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo deste site, incluindo textos, gráficos, logos e imagens, é propriedade da Resolvver e protegido por leis de direitos autorais.
            </p>

            <h2>6. Modificações</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site.
            </p>

            <h2>7. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será submetida ao foro da comarca do usuário.
            </p>

            <h2>8. Contato</h2>
            <p>
              Para questões sobre estes termos, entre em contato através do email contato@resolvver.com.br
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
