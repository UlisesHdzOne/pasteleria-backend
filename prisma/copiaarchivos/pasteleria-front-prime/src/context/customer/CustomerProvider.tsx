import React, { useState, useCallback, type ReactNode } from "react";
import CustomerContext from "./CustomerContext";
import axios from "axios";
import { customerService } from "../../services/customer.service";
import type {
  CustomerState,
  CreateCustomerResult,
  BackendError,
  CustomerContextValue,
  CreateCustomerDTO,
  FetchCustomersParams,
} from "./types";

const initialState: CustomerState = {
  customers: [],
  currentCustomer: null,
  loading: false,
  error: null,
  meta: null,
};

interface CustomerProviderProps {
  children: ReactNode;
}

const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [state, setState] = useState<CustomerState>(initialState);

  const createCustomer = useCallback(
    async (payload: CreateCustomerDTO): Promise<CreateCustomerResult> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const newCustomer = await customerService.create(payload);

        setState((prev) => ({
          ...prev,
          loading: false,
        }));

        return {
          success: true,
          data: newCustomer,
        };
      } catch (error) {
        let errorMessage = "Error desconocido";
        let errorCode = "UNKNOWN_ERROR";
        let field: string | undefined;

        if (axios.isAxiosError<BackendError>(error)) {
          if (error.response?.data) {
            errorMessage = error.response.data.message;
            errorCode = error.response.data.code;
            field = error.response.data.field;
          } else if (error.request) {
            errorMessage = "Error de red. No se pudo conectar al servidor.";
            errorCode = "NETWORK_ERROR";
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
          errorCode = "NATIVE_ERROR";
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));

        return {
          success: false,
          error: errorMessage,
          code: errorCode,
          field,
        };
      }
    },
    [],
  );

  const fetchCustomers = useCallback(async (params?: FetchCustomersParams) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await customerService.findAll(params);

      setState((prev) => ({
        ...prev,
        customers: response.data,
        meta: response.meta,
        loading: false,
      }));
    } catch (error) {
      let errorMessage = "Error al obtener clientes";

      if (axios.isAxiosError<BackendError>(error)) {
        errorMessage =
          error.response?.data?.message ||
          "Error del servidor al obtener clientes";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  const value: CustomerContextValue = {
    customers: state.customers,
    currentCustomer: state.currentCustomer,
    loading: state.loading,
    error: state.error,
    meta: state.meta,
    createCustomer,
    fetchCustomers,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
