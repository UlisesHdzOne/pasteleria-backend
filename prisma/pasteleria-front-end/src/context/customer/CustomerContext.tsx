import { createContext } from 'react';
import type { CustomerContextValue } from './types';

// Creamos el contexto con un valor inicial undefined
// Usamos undefined para forzar el uso del hook personalizado
const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

export default CustomerContext;