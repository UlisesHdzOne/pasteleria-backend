import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useDrivenCourseAllData } from "./DrivenCourseAllDataContext";
import type { DrivenCourseResponse } from "../../../../types/driven-course/driven-course";

type FetchParams = {
  page?: number;
  limit?: number;
  drivenId?: number;
  courseId?: number;
  status?: string;
};

type UpdateStatusResult =
  | { success: true }
  | { success: false; code: string; message: string };

type UpdateProgressResult =
  | { success: true }
  | { success: false; code: string; message: string };

type RemoveResult =
  | { success: true }
  | { success: false; code: string; message: string };

type DrivenCourseAllActionsContextType = {
  fetchAll: (params?: FetchParams) => Promise<void>;
  updateStatus: (
    drivenCourseId: number,
    status: string,
  ) => Promise<UpdateStatusResult>;
  updateProgress: (
    drivenCourseId: number,
    progress: number,
  ) => Promise<UpdateProgressResult>;

  remove: (drivenCourseId: number) => Promise<RemoveResult>;

  loading: boolean;
  loadingActionId: number | null;
};

const DrivenCourseAllActionsContext =
  createContext<DrivenCourseAllActionsContextType>({
    fetchAll: async () => {},
    updateStatus: async () => ({
      success: false,
      code: "CONTEXT_NOT_READY",
      message: "Context not initialized",
    }),

    updateProgress: async () => ({
      success: false,
      code: "CONTEXT_NOT_READY",
      message: "Context not initialized",
    }),

    remove: async () => ({
      success: false,
      code: "CONTEXT_NOT_READY",
      message: "Context not initialized",
    }),

    loading: false,
    loadingActionId: null,
  });

export const DrivenCourseAllActionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { setItems, setMeta, setError } = useDrivenCourseAllData();

  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false); // solo para fetchAll
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchAll = useCallback(
    async (params?: FetchParams) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams();
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit));
        if (params?.drivenId) query.append("drivenId", String(params.drivenId));
        if (params?.courseId) query.append("courseId", String(params.courseId));
        if (params?.status) query.append("status", params.status);

        const res = await fetch(
          `http://localhost:3000/driven-course?${query.toString()}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Error al cargar driven courses");

        const data: DrivenCourseResponse = await res.json();
        setItems(data.data);
        setMeta(data.meta);
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [setItems, setMeta, setError],
  );

  const updateStatus = useCallback(
    async (
      drivenCourseId: number,
      status: string,
    ): Promise<UpdateStatusResult> => {
      //setLoading(true);
      setActionLoadingId(drivenCourseId);

      try {
        const res = await fetch(
          `http://localhost:3000/driven-course/${drivenCourseId}/status`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          },
        );

        if (res.ok) {
          const updated = await res.json();

          setItems((prev) =>
            prev.map((item) =>
              item.drivenCourseId === drivenCourseId
                ? { ...item, status: updated.status }
                : item,
            ),
          );

          return { success: true };
        }

        const error = await res.json();
        return {
          success: false,
          code: error.code ?? "UNKNOWN_ERROR",
          message: error.message ?? "Unexpected error",
        };
      } catch {
        return {
          success: false,
          code: "NETWORK_ERROR",
          message: "Network error",
        };
      } finally {
        // setLoading(false);
        setActionLoadingId(null);
      }
    },
    [setItems], // ✅ importante
  );

  const updateProgress = useCallback(
    async (
      drivenCourseId: number,
      progress: number,
    ): Promise<UpdateProgressResult> => {
      // setLoading(true);
      setActionLoadingId(drivenCourseId);

      try {
        const res = await fetch(
          `http://localhost:3000/driven-course/${drivenCourseId}/progress`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ progress }),
          },
        );

        if (res.ok) {
          const updated = await res.json();

          setItems((prev) =>
            prev.map((item) =>
              item.drivenCourseId === drivenCourseId
                ? {
                    ...item,
                    progress: updated.progress,
                    status: updated.status,
                  }
                : item,
            ),
          );

          return { success: true };
        }

        const error = await res.json();
        return {
          success: false,
          code: error.code ?? "UNKNOWN_ERROR",
          message: error.message ?? "Unexpected error",
        };
      } catch {
        return {
          success: false,
          code: "NETWORK_ERROR",
          message: "Network error",
        };
      } finally {
        //setLoading(false);
        setActionLoadingId(null);
      }
    },
    [setItems], // ✅ importante
  );

  const remove = useCallback(
    async (drivenCourseId: number): Promise<RemoveResult> => {
      //setLoading(true);
      setActionLoadingId(drivenCourseId);

      try {
        const res = await fetch(
          `http://localhost:3000/driven-course/${drivenCourseId}`,
          { method: "DELETE" },
        );

        if (res.ok) {
          setItems((prev) =>
            prev.filter((item) => item.drivenCourseId !== drivenCourseId),
          );

          return { success: true };
        }

        const error = await res.json();
        return {
          success: false,
          code: error.code ?? "UNKNOWN_ERROR",
          message: error.message ?? "Unexpected error",
        };
      } catch {
        return {
          success: false,
          code: "NETWORK_ERROR",
          message: "Network error",
        };
      } finally {
        //setLoading(false);
        setActionLoadingId(null);
      }
    },
    [setItems], // ✅ importante
  );

  return (
    <DrivenCourseAllActionsContext.Provider
      value={{
        fetchAll,
        updateStatus,
        updateProgress,
        remove,
        loading,
        loadingActionId: actionLoadingId,
      }}
    >
      {children}
    </DrivenCourseAllActionsContext.Provider>
  );
};

export const useDrivenCourseAllActions = () =>
  useContext(DrivenCourseAllActionsContext);
//Driven course
