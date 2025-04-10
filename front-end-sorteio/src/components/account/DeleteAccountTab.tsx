import React, { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

const DeleteAccountTab: React.FC = () => {
  const [confirmationText, setConfirmationText] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleDeleteAccount = () => {
    if (confirmationText === "DELETAR CONTA" && isConfirmed) {
      // Lógica para deletar a conta
      console.log("Conta deletada");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center">
        <Trash2 className="h-5 w-5 mr-2 text-red-500" />
        Deletar Conta
      </h2>
      
      <div className="bg-slate-800 rounded-lg border border-red-900 p-6">
        <div className="text-center mb-6">
          <div className="bg-red-900/30 inline-flex p-4 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-red-400">
            Atenção: Esta ação é irreversível
          </h3>
          <p className="text-slate-300">
            Todos os seus dados, incluindo jogadores, partidas e estatísticas serão permanentemente removidos.
          </p>
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
            Antes de deletar sua conta:
          </h4>
          <ul className="space-y-2 text-sm text-slate-400 pl-6">
            <li className="list-disc">Exporte seus dados se desejar manter um backup</li>
            <li className="list-disc">Cancele qualquer assinatura ativa primeiro</li>
            <li className="list-disc">Esta ação não pode ser desfeita</li>
          </ul>
        </div>
        
        <div>
          <label className="block text-sm text-slate-400 mb-3">
            Digite <span className="font-bold">DELETAR CONTA</span> para confirmar:
          </label>
          <input 
            type="text" 
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value.toUpperCase())}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mb-4"
            placeholder="DELETAR CONTA"
          />
          
          <div className="flex items-center mb-4">
            <input 
              id="confirm-delete"
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 focus:ring-red-500 mr-2"
            />
            <label htmlFor="confirm-delete" className="text-sm text-slate-300">
              Eu entendo que todos os meus dados serão permanentemente removidos
            </label>
          </div>
          
          <button
            onClick={handleDeleteAccount}
            disabled={confirmationText !== "DELETAR CONTA" || !isConfirmed}
            className={`w-full py-3 rounded-lg font-medium text-white transition-colors flex items-center justify-center ${
              confirmationText === "DELETAR CONTA" && isConfirmed
                ? "bg-red-900 hover:bg-red-800"
                : "bg-slate-700 cursor-not-allowed"
            }`}
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Deletar Minha Conta Permanentemente
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountTab;