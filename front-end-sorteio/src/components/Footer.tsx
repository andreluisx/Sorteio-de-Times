export default function Footer(){
  return(
    <footer className="bg-slate-900 flex w-full py-12 px-4 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-red-600 p-2 rounded-lg">
                </div>
                <span className="text-lg font-bold">TeamDraft</span>
              </div>
              <p className="text-slate-400 mb-4">
                Plataforma especializada em sorteios equilibrados para partidas amadoras ou profissionais.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-red-400 transition-colors">Tipos de Sorteio</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Estatísticas</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Histórico</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Ranking</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-red-400 transition-colors">Perguntas Frequentes</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Tutoriais</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-red-400 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
            <p>© 2025 TeamDraft. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
  )
}