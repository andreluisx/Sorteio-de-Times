'use client';

import { ChevronRight } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-slate-800/50 p-8 rounded-xl border border-slate-700">
        <h1 className="text-4xl font-bold mb-8 text-center">Termos de Uso</h1>
        <p className="text-slate-300 mb-8 text-center">
          Última atualização: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8">
          {/* Seção 1 */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 mr-2 text-red-500" />
              1. Aceitação dos Termos
            </h2>
            <p className="text-slate-300">
              Ao acessar ou utilizar a plataforma{' '}
              <span className="text-red-400">TeamBalance</span>, você concorda
              com estes Termos de Uso e com nossa Política de Privacidade. Se
              não concordar com estes termos, não utilize nossos serviços.
            </p>
          </section>

          {/* Seção 2 */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 mr-2 text-red-500" />
              2. Funcionalidades da Plataforma
            </h2>
            <p className="text-slate-300 mb-4">A plataforma permite:</p>
            <ul className="space-y-3 text-slate-300 pl-5">
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                Cadastrar jogadores e atribuir níveis de habilidade
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                Sortear times balanceados por diferentes métodos (estrelas,
                winrate ou aleatório)
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                Registrar resultados de partidas e atualizar estatísticas
                automaticamente
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                Visualizar rankings, histórico de partidas e desempenho
                individual
              </li>
            </ul>
          </section>

          {/* Seção 3 */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 mr-2 text-red-500" />
              3. Responsabilidades do Usuário
            </h2>
            <ul className="space-y-3 text-slate-300 pl-5">
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="font-medium">Dados Verídicos:</span> Você é
                responsável pela precisão das informações cadastradas (nomes,
                habilidades, resultados)
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="font-medium">Uso Adequado:</span> Não utilize a
                plataforma para atividades ilegais, fraudulentas ou que violem
                direitos de terceiros
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="font-medium">Conta Segura:</span> Mantenha sua
                senha em sigilo e notifique-nos em caso de acesso não autorizado
              </li>
            </ul>
          </section>

          {/* Seção 4 */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 mr-2 text-red-500" />
              4. Limitação de Responsabilidade
            </h2>
            <ul className="space-y-3 text-slate-300 pl-5">
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                Não garantimos que os sorteios sempre resultem em times
                perfeitamente equilibrados
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                Não nos responsabilizamos por disputas entre usuários ou
                resultados de partidas reais
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                A plataforma é fornecida "como está", sem garantias de
                disponibilidade contínua ou ausência de erros
              </li>
            </ul>
          </section>

          {/* Seção 5 */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 mr-2 text-red-500" />
              5. Modificações e Encerramento
            </h2>
            <ul className="space-y-3 text-slate-300 pl-5">
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                Reservamo-nos o direito de alterar estes termos a qualquer
                momento
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                Podemos suspender ou encerrar contas que violarem estes termos
              </li>
            </ul>
          </section>

          {/* Seção 6 */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 mr-2 text-red-500" />
              6. Privacidade e Dados
            </h2>
            <p className="text-slate-300">
              Seus dados são tratados conforme nossa Política de Privacidade. Ao
              usar a plataforma, você concorda com a coleta e processamento de
              informações necessárias para os serviços oferecidos.
            </p>
          </section>

          {/* Seção 7 */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 mr-2 text-red-500" />
              7. Lei Aplicável
            </h2>
            <p className="text-slate-300">
              Estes Termos são regidos pelas leis do Brasil e quaisquer disputas
              serão resolvidas nos tribunais competentes dessa localidade.
            </p>
          </section>

          {/* Seção 8 */}
          <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 mr-2 text-red-500" />
              8. Contato
            </h2>
            <p className="text-slate-300">
              Dúvidas ou reclamações sobre estes Termos devem ser enviadas para:{' '}
              <span className="text-red-400">andremice1@hotmail.com</span>
            </p>
          </section>

          <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 text-center">
            <p className="text-lg text-slate-300">
              Ao utilizar a plataforma, você confirma que leu, compreendeu e
              aceitou estes Termos de Uso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
