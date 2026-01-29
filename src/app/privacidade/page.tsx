import type { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da Resolvver - Como tratamos seus dados pessoais.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-navy to-brand-slate text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Política de Privacidade
            </h1>
            <p className="text-xl text-brand-sky">
              Última atualização: Janeiro de 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <Container size="small">
          <div className="prose prose-lg max-w-none">
            <h2>1. Coleta de Informações</h2>
            <p>
              A Resolvver coleta informações pessoais quando você utiliza nossos serviços, incluindo nome, email, telefone e informações sobre suas dívidas.
            </p>

            <h2>2. Uso das Informações</h2>
            <p>
              Utilizamos suas informações para:
            </p>
            <ul>
              <li>Processar e gerenciar sua solicitação de renegociação de dívidas</li>
              <li>Entrar em contato com você sobre nossos serviços</li>
              <li>Melhorar nossos serviços e experiência do usuário</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2>3. Proteção de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2>4. Compartilhamento de Informações</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para prestar nossos serviços ou quando exigido por lei.
            </p>

            <h2>5. Seus Direitos</h2>
            <p>
              Você tem o direito de acessar, corrigir, excluir ou transferir seus dados pessoais. Para exercer esses direitos, entre em contato conosco.
            </p>

            <h2>6. Contato</h2>
            <p>
              Para questões sobre esta política de privacidade, entre em contato através do email contato@resolvver.com.br
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
