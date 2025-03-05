"use client";

import homepageImage from '@/constants/home/home.png'

import { useState } from "react";
import { 
  Star, 
  BarChart2, 
  Shuffle, 
  Users, 
  PieChart, 
  TrendingUp, 
  Award, 
  BarChart, 
  Database, 
  ChevronRight 
} from "lucide-react";
import Image from 'next/image';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("sorteios");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Sorteios de times balanceados para suas partidas</h1>
              <p className="text-xl text-slate-300 mb-8">
                Crie times equilibrados, acompanhe estatísticas e mantenha um histórico completo das suas partidas
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
                  Começar Agora
                </button>
                <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors">
                  Saiba Mais
                </button>
              </div>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <Image height={550} width={550} src={homepageImage} alt="Demonstração da plataforma" className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-16 px-4 ">
        <div className="container mx-auto pt-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Como Funciona</h2>
          
          <div className="grid md:grid-cols-4 w-full gap-8">
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 text-center">
              <div className="bg-red-600/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Cadastre Jogadores</h3>
              <p className="text-slate-300">Adicione seus amigos e atribua níveis de habilidade iniciais</p>
            </div>
            
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 text-center">
              <div className="bg-red-600/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Shuffle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Sorteie Times</h3>
              <p className="text-slate-300">Escolha o método de balanceamento que preferir para criar times equilibrados</p>
            </div>
            
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 text-center">
              <div className="bg-red-600/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Jogue a Partida</h3>
              <p className="text-slate-300">Realize a partida com os times sorteados e divirta-se</p>
            </div>
            
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 text-center">
              <div className="bg-red-600/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Database className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Registre Resultado</h3>
              <p className="text-slate-300">Salve o resultado e atualize as estatísticas dos jogadores automaticamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Sorteio */}
      <section id="tipos-sorteio" className="pb-16 pt-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Tipos de Sorteio</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-red-500 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg mr-4">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold">Balanceado por Estrelas</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Times equilibrados com base na classificação manual de habilidade de cada jogador. Ideal para grupos onde você conhece bem o nível de cada participante.
              </p>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-slate-200">Como funciona:</span> Jogadores recebem de 1-5 estrelas e o sistema distribui igualmente o total de estrelas entre os times.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-red-500 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                  <BarChart2 className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Balanceado por Winrate</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Equilibra os times baseado no histórico de vitórias de cada jogador. Perfeito para grupos que jogam frequentemente e já possuem estatísticas.
              </p>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-slate-200">Como funciona:</span> O sistema analisa o percentual de vitórias de cada jogador e distribui para criar times com winrates médios similares.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-red-500 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                  <Shuffle className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">Sorteio Aleatório</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Distribuição completamente randômica dos jogadores. Ideal para jogos casuais ou quando todos os jogadores possuem níveis similares.
              </p>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-slate-200">Como funciona:</span> Os jogadores são distribuídos aleatoriamente sem considerar habilidades ou estatísticas anteriores.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-red-500" />
              Seleção Manual de Times
            </h3>
            <p className="text-slate-300 mb-4">
              Além dos sorteios automáticos, você pode definir manualmente os integrantes de cada time. Útil quando os capitães querem escolher suas próprias equipes ou para situações especiais.
            </p>
            <a href="#" className="text-red-400 hover:text-red-300 flex items-center w-fit">
              Saiba mais sobre seleção manual
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section id="estatisticas" className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Estatísticas Detalhadas</h2>
          
          <div className="mb-8">
            <div className="bg-slate-700 rounded-lg overflow-hidden">
              <div className="p-4 flex border-b border-slate-600">
                <button 
                  className={`px-4 py-2 ${activeTab === "sorteios" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"} rounded-lg mr-2`}
                  onClick={() => setActiveTab("sorteios")}
                >
                  Dados dos Sorteios
                </button>
                <button 
                  className={`px-4 py-2 ${activeTab === "players" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"} rounded-lg mr-2`}
                  onClick={() => setActiveTab("players")}
                >
                  Ranking de Jogadores
                </button>
                <button 
                  className={`px-4 py-2 ${activeTab === "historico" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"} rounded-lg`}
                  onClick={() => setActiveTab("historico")}
                >
                  Histórico de Partidas
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === "sorteios" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Eficiência de Balanceamento</h3>
                      <p className="text-slate-300 mb-4">
                        Acompanhe a eficácia de cada método de sorteio através de dados de vitórias e derrotas.
                      </p>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
                          Equilíbrio entre os times
                        </li>
                        <li className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
                          Tempo médio das partidas
                        </li>
                        <li className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
                          Diferença de pontuação
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <Image height={450} width={450} src={homepageImage} alt="Demonstração da plataforma" className="rounded-lg" />
                    </div>
                  </div>
                )}
                
                {activeTab === "players" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Desempenho Individual</h3>
                      <p className="text-slate-300 mb-4">
                        Ranking dos jogadores baseado em diversos fatores de performance.
                      </p>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex items-center">
                          <Award className="h-4 w-4 text-red-500 mr-2" />
                          Maior taxa de vitórias
                        </li>
                        <li className="flex items-center">
                          <Award className="h-4 w-4 text-red-500 mr-2" />
                          Jogador mais valioso
                        </li>
                        <li className="flex items-center">
                          <Award className="h-4 w-4 text-red-500 mr-2" />
                          Jogador mais consistente
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <Image height={450} width={450} src={homepageImage} alt="Demonstração da plataforma" className="rounded-lg" />
                    </div>
                  </div>
                )}
                
                {activeTab === "historico" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Histórico Completo</h3>
                      <p className="text-slate-300 mb-4">
                        Registro detalhado de todas as partidas realizadas e seus resultados.
                      </p>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex items-center">
                          <Database className="h-4 w-4 text-red-500 mr-2" />
                          Composição de times
                        </li>
                        <li className="flex items-center">
                          <Database className="h-4 w-4 text-red-500 mr-2" />
                          Resultados das partidas
                        </li>
                        <li className="flex items-center">
                          <Database className="h-4 w-4 text-red-500 mr-2" />
                          Evolução dos jogadores
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <Image height={450} width={450} src={homepageImage} alt="Demonstração da plataforma" className="rounded-lg" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Funcionalidades Principais</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cadastro de Jogadores</h3>
              <p className="text-slate-300">
                Crie perfis para todos os seus amigos com níveis de habilidade personalizados.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Estatísticas Detalhadas</h3>
              <p className="text-slate-300">
                Acompanhe o desempenho de cada jogador com métricas precisas e comparativas.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shuffle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Múltiplos Métodos de Sorteio</h3>
              <p className="text-slate-300">
                Escolha entre diferentes algoritmos para balancear os times da melhor forma.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seleção Manual</h3>
              <p className="text-slate-300">
                Opção para definir manualmente os times quando preferir não utilizar o sorteio automático.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Histórico de Partidas</h3>
              <p className="text-slate-300">
                Registro completo de todas as partidas realizadas e evolução dos jogadores ao longo do tempo.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="bg-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ranking de Jogadores</h3>
              <p className="text-slate-300">
                Classificação automática dos melhores jogadores com base em diversos critérios de performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-950 to-slate-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para sorteios perfeitos?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Experimente a plataforma e nunca mais perca tempo com sorteios manuais ou times desequilibrados
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg transition-colors">
              Criar Conta Grátis
            </button>
            <button className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold text-lg transition-colors">
              Ver Demonstração
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
}