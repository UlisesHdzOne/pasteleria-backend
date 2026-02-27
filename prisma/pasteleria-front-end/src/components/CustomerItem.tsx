import {User, Phone, Calendar, Trash2, Edit3} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { Customer } from '../context/customer/types';

type CustomerItemProps = {
  customer: Customer;
  onClick?: () => void;
  onDelete?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
};

const CustomerItem = ({ customer, onClick, onDelete, onEdit }: CustomerItemProps) => {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isActionVisible, setIsActionVisible] = useState(false);
  const startXRef = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const SWIPE_THRESHOLD = 80;
  const MAX_SWIPE = 160;

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX - dragX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    const newX = clientX - startXRef.current;
    // Limitar el deslizamiento entre -MAX_SWIPE y MAX_SWIPE
    const clampedX = Math.max(-MAX_SWIPE, Math.min(MAX_SWIPE, newX));
    setDragX(clampedX);
  };

  const handleEnd = () => {
    setIsDragging(false);
    
    // Si deslizó más del threshold, fijar en posición abierta
    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      setDragX(dragX > 0 ? MAX_SWIPE : -MAX_SWIPE);
      setIsActionVisible(true);
    } else {
      // Volver a posición cerrada
      setDragX(0);
      setIsActionVisible(false);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragX]);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node) && isActionVisible) {
        setDragX(0);
        setIsActionVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActionVisible]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(customer);
    }
    setDragX(0);
    setIsActionVisible(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(customer);
    }
    setDragX(0);
    setIsActionVisible(false);
  };

  const handleCardClick = () => {
    if (!isActionVisible && onClick) {
      onClick();
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative overflow-hidden rounded-xl"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Botones de acción detrás */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        {/* Botón Editar (izquierda) */}
        <div
          className={`flex items-center justify-center w-20 h-full transition-all duration-300 ${
            dragX > SWIPE_THRESHOLD ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <button
            onClick={handleEdit}
            className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
          >
            <Edit3 className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Botón Eliminar (derecha) */}
        <div
          className={`flex items-center justify-center w-20 h-full transition-all duration-300 ${
            dragX < -SWIPE_THRESHOLD ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <button
            onClick={handleDelete}
            className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
          >
            <Trash2 className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Tarjeta principal deslizable */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleCardClick}
        className="group bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing relative z-10"
        style={{
          transform: `translateX(${dragX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <User className="w-6 h-6 text-white" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 text-lg truncate">
              {customer.firstName} {customer.lastName}
            </h3>
            
            <div className="flex items-center gap-4 mt-1.5">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              
              {customer.createdAt && (
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">{new Date(customer.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Indicador de swipe */}
          <div className="flex gap-1">
            <div className={`w-1 h-1 rounded-full transition-all duration-200 ${
              dragX > 20 ? 'bg-emerald-500 scale-125' : 'bg-slate-300'
            }`}></div>
            <div className={`w-1 h-1 rounded-full transition-all duration-200 ${
              dragX < -20 ? 'bg-red-500 scale-125' : 'bg-slate-300'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerItem;
