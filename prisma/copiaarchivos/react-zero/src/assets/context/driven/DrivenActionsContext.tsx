import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useDrivenData } from "./DrivenDataContext";
import type { DrivenResponse } from "../../../types/driven/driven";

type FetchParams = {
  search?: string;
  page?: number;
  isActive?: boolean;
};

type Driven = {
  name: string;
};

type CreateDrivenResult =
  | { success: true; driven: Driven }
  | { success: false; code: string; message: string };

type DrivenActionsContextType = {
  fetchDrivens: (params?: FetchParams) => Promise<void>;
  createDriven: (data: Driven) => Promise<CreateDrivenResult>;

  loading: boolean;
};

const DrivenActionsContext = createContext<DrivenActionsContextType>({
  fetchDrivens: async () => {},
  createDriven: async () => ({
    success: false,
    code: "CONTEXT_NOT_READY",
    message: "Context not initialized",
  }),
  loading: false,
});

export const DrivenActionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { setDrivens, setMeta, setError } = useDrivenData(); // ✅ ahora podemos actualizar los datos
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const activeRequests = useRef(0);
  const cacheRef = useRef<Map<string, DrivenResponse>>(new Map());

  const fetchDrivens = useCallback(
    async (params?: { search?: string; page?: number; isActive?: boolean }) => {
      const queryKey = JSON.stringify(params ?? {});
      if (cacheRef.current.has(queryKey)) {
        const cached = cacheRef.current.get(queryKey)!;
        setDrivens(cached.data);
        setMeta(cached.meta);
        setError(null);
        return;
      }

      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      activeRequests.current += 1;
      if (activeRequests.current === 1) setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams();
        if (params?.search) query.append("search", params.search);
        if (params?.page) query.append("page", String(params.page));
        if (params?.isActive !== undefined)
          query.append("isActive", String(params.isActive));

        const res = await fetch(
          `http://localhost:3000/drivens?${query.toString()}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Error al cargar drivens");

        const data: DrivenResponse = await res.json();
        setDrivens(data.data);
        setMeta(data.meta);
        cacheRef.current.set(queryKey, data);
        
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        activeRequests.current -= 1;
        if (activeRequests.current === 0) setLoading(false);
      }
    },
    [setDrivens, setMeta, setError],
  );

  const createDriven = useCallback(
    async (data: Driven): Promise<CreateDrivenResult> => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:3000/drivens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const newDriven = await res.json();
          setDrivens((prev) => [newDriven, ...prev]);
          cacheRef.current.clear();
          return { success: true, driven: newDriven };
        }

        // Manejo de errores desde el backend
        const errorData = await res.json();
        return {
          success: false,
          code: errorData.code ?? "UNKNOWN_ERROR",
          message: errorData.message ?? "Error al crear driven",
        };
      } catch {
        return {
          success: false,
          code: "NETWORK_ERROR",
          message: "Network error",
        };
      } finally {
        setLoading(false);
      }
    },
    [setDrivens],
  );

  return (
    <DrivenActionsContext.Provider
      value={{ fetchDrivens, createDriven, loading }}
    >
      {children}
    </DrivenActionsContext.Provider>
  );
};

export const useDrivenActions = () => useContext(DrivenActionsContext);
