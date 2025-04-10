'use client';

import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Tutorial() {
  // Dados do tutorial - pode ser movido para um arquivo separado depois
  const tutorialSections = [
    {
      title: 'Primeiros Passos',
      steps: [
        {
          title: 'Criando sua Conta',
          description:
            'Registre-se usando email ou sua conta Google para começar a usar todos os recursos',
          imagePath: '/tutorial/register.png', // Você substituirá por suas imagens
        },
        {
          title: 'Configuração Inicial',
          description:
            'Defina suas preferências de tema da interface, e icones de rank',
          imagePath: 'Recurso Futuro',
        },
      ],
    },
    {
      title: 'Gerenciamento de Jogadores',
      steps: [
        {
          title: 'Adicionando Jogadores',
          description:
            'Adicione jogadores clicando nesse icone, presente nas telas de criação de partida.',
          imagePath: '/tutorial/add.png',
        },
        {
          title: 'Cadastrando um jogador',
          description:
            'Preencha o campo de nome e estrelas para criar um jogador',
          imagePath: '/tutorial/player.png',
        },
        {
          title: 'Todos os jogadores',
          description:
            'Clique em "estatisticas de jogadores" na barra do lado, e ao navegar clique no botão de jogadores',
          imagePath: '/tutorial/players.png',
        },
        {
          title: 'Editar um jogador',
          description:
            'Você pode editar um jogador ao seguir o caminho de "estatisticas de jogadores > jogadores > abrir um jogador"',
          imagePath: '/tutorial/editing.png',
        },
      ],
    },
    {
      title: 'Realizando Sorteios',
      steps: [
        {
          title: 'Selecionando um método',
          description:
            'na barra lateral selecione o tipo de sorteio',
          imagePath: '/tutorial/methods.png',
        },
        {
          title: 'Selecionando jogadores',
          description: 'Clique nos cards de jogadores do banco para que eles entrem no sorteio',
          imagePath: '/tutorial/click.png',
        },
        {
          title: 'Iniciando Sorteio',
          description: 'Se você selecionar um número par de participantes o botão sortear ficará disponível',
          imagePath: '/tutorial/sortear.png',
        },
        
      ],
    },
    {
      title: 'Times Escolhidos',
      steps: [
        {
          title: 'Selecionando o método',
          description:
            'na barra lateral selecione clique em "Você escolhe os times"',
          imagePath: '/tutorial/voce.png',
        },
        {
          title: 'Como definir os times',
          description: 'Segure e arraste os cards dos jogadores para a área do time que você quer',
          imagePath: '/tutorial/drag.png',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Tutorial Completo</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Aprenda a usar todas as funcionalidades da plataforma passo a passo
          </p>
        </div>

        {/* Tutorial Sections */}
        <div className="space-y-16">
          {tutorialSections.map((section, sectionIndex) => (
            <section
              key={sectionIndex}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-8"
            >
              <div className="flex items-center mb-8">
                <div className="bg-red-600/20 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-red-500">
                    {sectionIndex + 1}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold">{section.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.steps.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-red-500 transition-colors"
                  >
                    {/* Placeholder para imagem - substitua pelo seu componente Image */}
                    <div className="bg-slate-700 h-48 flex items-center justify-center">
                      {step.imagePath.startsWith('/') ? (
                        <Image
                          src={step.imagePath}
                          alt={step.title}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <span className="text-slate-500">
                          {step.imagePath}
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-slate-300 mb-4">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Pronto para começar?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Acesse agora sua conta e coloque em prática tudo o que aprendeu
          </p>
          <div className="flex justify-center space-x-4">
            <button onClick={()=>window.history.back()} className="cursor-pointer px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
