import Link from 'next/link';

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
                <li><Link href="/info/tutorial" className="hover:text-red-400 transition-colors">Tipos de Sorteio</Link></li>
                <li><Link href="/info/tutorial" className="hover:text-red-400 transition-colors">Estatísticas</Link></li>
                <li><Link href="/info/tutorial" className="hover:text-red-400 transition-colors">Histórico</Link></li>
                <li><Link href="/info/tutorial" className="hover:text-red-400 transition-colors">Ranking</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/info/faq" className="hover:text-red-400 transition-colors">Perguntas Frequentes</Link></li>
                <li><Link href="#" className="hover:text-red-400 transition-colors">Contato</Link></li>
                <li><Link href="/info/tutorial" className="hover:text-red-400 transition-colors">Tutoriais</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/info/terms" className="hover:text-red-400 transition-colors">Termos de Uso</Link></li>
                <li><Link href="#" className="hover:text-red-400 transition-colors">Privacidade</Link></li>
                <li><Link href="#" className="hover:text-red-400 transition-colors">Cookies</Link></li>
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