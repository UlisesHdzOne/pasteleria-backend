import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  // Manejar teclado para accesibilidad
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay con efecto de difuminado */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Cerrar modal"
        className="fixed inset-0 bg-background/10 backdrop-blur-md transition-all duration-300 cursor-pointer"
        onClick={onClose}
        onKeyDown={handleKeyDown}
      />
      
      {/* Contenedor del modal centrado */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Card del modal que aparece adelante */}
        <div
          role="dialog"
          aria-modal="true"
          aria-hidden="true" // No es interactivo, solo previene propagación
          className="relative w-full max-w-md transform rounded-xl bg-gradient-to-br from-white via-white to-secondary/20 p-0 shadow-2xl transition-all border-2 border-secondary/40 overflow-hidden"
          onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click en la card
        >
          {children}
        </div>
      </div>
    </div>
  );
};
