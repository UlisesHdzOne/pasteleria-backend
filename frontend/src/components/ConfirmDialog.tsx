///import { Modal } from './Modal';

import { Modal } from "./Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
};

export const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger'
}: Props) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'bg-destructive hover:bg-destructive/90 focus:ring-destructive';
      case 'warning':
        return 'bg-primary hover:bg-primary/90 focus:ring-primary';
      case 'info':
        return 'bg-secondary hover:bg-secondary/80 focus:ring-secondary text-secondary-foreground';
      default:
        return 'bg-primary hover:bg-primary/90 focus:ring-primary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {/* Icono según el tipo */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4">
          {type === 'danger' && (
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          )}
          {type === 'warning' && (
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          )}
          {type === 'info' && (
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <svg className="h-6 w-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Título y mensaje */}
        <h3 className="text-lg font-medium text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {message}
        </p>

        {/* Botones */}
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-border/80 bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getConfirmButtonClass()}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
