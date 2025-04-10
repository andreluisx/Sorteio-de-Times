"use client";

import { Mail, AlertTriangle, User, MessageSquare, ChevronRight, CheckCircle, Upload, Info, Clock } from "lucide-react";
import { useState } from "react";

export default function SupportForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Problema técnico",
    message: "",
    urgency: "medium"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio
    setTimeout(() => {
      console.log("Dados enviados:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "Problema técnico",
        message: "",
        urgency: "medium"
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          {/* Cabeçalho */}
          <div className="flex items-start mb-8">
            <div className="bg-red-600/20 p-3 rounded-lg mr-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Relatar Problema</h1>
              <p className="text-slate-300">
                Preencha o formulário abaixo e nossa equipe entrará em contato o mais rápido possível
              </p>
            </div>
          </div>

          {/* Formulário */}
          {submitSuccess ? (
            <div className="bg-green-900/30 border border-green-800 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-600/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mensagem enviada com sucesso!</h3>
              <p className="text-slate-300 mb-4">
                Recebemos seu relato e vamos analisar o mais breve possível. Caso precise, você pode enviar outro relato.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
              >
                Enviar novo relato
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Nome */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Seu Nome
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5"
                    placeholder="Digite seu nome completo"
                  />
                </div>
              </div>

              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Seu Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Campo Assunto */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Tipo de Problema
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                >
                  <option value="Problema técnico">Problema técnico</option>
                  <option value="Dúvida sobre funcionalidade">Dúvida sobre funcionalidade</option>
                  <option value="Sugestão de melhoria">Sugestão de melhoria</option>
                  <option value="Outro assunto">Outro assunto</option>
                </select>
              </div>

              {/* Campo Urgência */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nível de Urgência
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: "low", label: "Baixa", color: "bg-blue-500" },
                    { value: "medium", label: "Média", color: "bg-yellow-500" },
                    { value: "high", label: "Alta", color: "bg-red-500" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`urgency-${option.value}`}
                        name="urgency"
                        value={option.value}
                        checked={formData.urgency === option.value}
                        onChange={handleChange}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`urgency-${option.value}`}
                        className={`px-4 py-2 rounded-lg cursor-pointer border ${formData.urgency === option.value ? `${option.color} border-transparent` : "bg-slate-800 border-slate-700 hover:bg-slate-700"}`}
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campo Mensagem */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Descrição Detalhada
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <MessageSquare className="h-5 w-5 text-slate-500" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5"
                    placeholder="Descreva seu problema ou dúvida com o máximo de detalhes possível..."
                  />
                </div>
              </div>

              {/* Anexos (opcional) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Anexar Imagens (Opcional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700/50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-slate-500 mb-2" />
                      <p className="text-sm text-slate-400">
                        <span className="font-semibold">Clique para enviar</span> ou arraste arquivos
                      </p>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF (Máx. 5MB)</p>
                    </div>
                    <input type="file" className="hidden" multiple />
                  </label>
                </div>
              </div>

              {/* Termos e Envio */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4 rounded bg-slate-800 border-slate-700 focus:ring-red-500"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm text-slate-300">
                  Concordo em compartilhar estas informações com a equipe de suporte para análise do meu caso
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center px-6 py-3 rounded-lg font-semibold transition-colors ${isSubmitting ? "bg-red-800 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar Relato"
                )}
              </button>
            </form>
          )}

          {/* Rodapé */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2 text-red-500" />
              Outras formas de contato
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-slate-400" />
                Email: andremice1@hotmail.com
              </li>
              <li className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-slate-400" />
                Chat online: 75 988133687
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-slate-400" />
                Horário de atendimento: Seg-Sex, 9h às 18h
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}