"use client";

import { ChevronDown, HelpCircle, Users, Shuffle, BarChart2, Star, Award, Database } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Como faço para cadastrar novos jogadores?",
      answer: "Nas seções de sorteio, clique no icone de + no canto inferior direito e preencha as informações básicas como nome e nível de habilidade. Você pode atribuir de 1 a 10 estrelas para cada jogador.",
      icon: <Users className="h-5 w-5 text-red-500" />
    },
    {
      question: "Qual a diferença entre os métodos de sorteio?",
      answer: "O balanceamento por estrelas usa sua avaliação manual, o por winrate considera o histórico de vitórias, e o aleatório distribui os jogadores sem critérios de habilidade.",
      icon: <Shuffle className="h-5 w-5 text-blue-500" />
    },
    {
      question: "Meus dados estão seguros na plataforma?",
      answer: "Sim, utilizamos criptografia e seguimos as melhores práticas de segurança. Você pode excluir seus dados a qualquer momento nas configurações da conta.",
      icon: <HelpCircle className="h-5 w-5 text-green-500" />
    },
    {
      question: "Como o sistema calcula o winrate?",
      answer: "O winrate é calculado dividindo o número de vitórias pelo total de partidas jogadas. Jogadores com menos de 5 partidas têm um winrate provisório.",
      icon: <BarChart2 className="h-5 w-5 text-yellow-500" />
    },
    {
      question: "Posso editar as estrelas de um jogador depois?",
      answer: "Sim, a qualquer momento você pode ajustar a avaliação de um jogador. Isso afetará apenas os sorteios futuros, não os históricos.",
      icon: <Star className="h-5 w-5 text-purple-500" />
    },
    {
      question: "Quantos jogadores posso cadastrar?",
      answer: "Atualmente permitimos até 10 jogadores por conta gratuita. Planos premium oferecem limites maiores e recursos adicionais.",
      icon: <Users className="h-5 w-5 text-red-500" />
    },
    {
      question: "Como funciona o ranking de jogadores?",
      answer: "O ranking considera o winrate do jogador em relacão a quantidade de partida. Quanto mais partidas e maior o winrate maior sua posição",
      icon: <Award className="h-5 w-5 text-orange-500" />
    },
    {
      question: "Posso exportar meus dados?",
      answer: "Sim, na seção 'Configurações' você pode exportar todos seus jogadores e estatísticas em PDF.",
      icon: <Database className="h-5 w-5 text-cyan-500" />
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
          <p className="text-xl text-slate-300">
            Encontre respostas para as dúvidas mais comuns sobre a plataforma
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden transition-all"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    {faq.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              
              <div 
                className={`px-6 pb-6 pt-0 transition-all duration-300 ${
                  activeIndex === index ? "block" : "hidden"
                }`}
              >
                <div className="pl-10">
                  <p className="text-slate-300">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-slate-800 p-8 rounded-xl border border-slate-700 text-center">
          <h3 className="text-2xl font-semibold mb-4">Não encontrou sua dúvida?</h3>
          <p className="text-slate-300 mb-6">
            Entre em contato com nosso suporte e teremos prazer em ajudar
          </p>
          <button className="cursor-pointer px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
            Contatar Suporte
          </button>
        </div>
      </div>
    </div>
  );
}