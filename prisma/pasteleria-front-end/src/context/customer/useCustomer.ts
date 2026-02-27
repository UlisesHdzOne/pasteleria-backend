import { useContext } from 'react';
import CustomerContext from './CustomerContext';
import type { CustomerContextValue } from './types';


// Hook personalizado con validación
export const useCustomer = (): CustomerContextValue => {
  const context = useContext(CustomerContext);

  if (context === undefined) {
    throw new Error('useCustomer debe ser usado dentro de CustomerProvider');
  }

  return context;
};