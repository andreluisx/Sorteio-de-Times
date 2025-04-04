// components/ui/ConfirmationModal.tsx
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-90" onClick={onClose} />
      <div className="relative border flex flex-col justify-center items-center gap-5 px-10 py-10 border-slate-600 bg-gradient-to-b bg-slate-900 rounded-2xl overflow-hidden">
        <h3 className="text-xl font-bold">{title}</h3>
        <p>{message}</p>
        <div className="flex justify-center flex-row gap-5">
          <button 
            onClick={onConfirm} 
            className="bg-red-900 hover:bg-red-800 px-5 py-2 rounded-md cursor-pointer transition-colors"
          >
            {confirmText}
          </button>
          <button 
            onClick={onClose}
            className="bg-green-900 hover:bg-green-800 px-5 py-2 rounded-md cursor-pointer transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};