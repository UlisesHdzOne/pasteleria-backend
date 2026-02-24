import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { DrivenCourseStatus } from "../../../types/driven-course-status";

export type UpdateStatusResult =
  | { success: true }
  | { success: false; code: string; message: string };

type DrivenCourseStatusActionsContextType = {
  updateStatus: (
    courseId: number,
    drivenId: number,
    status: DrivenCourseStatus,
  ) => Promise<UpdateStatusResult>;
  loading: boolean;
};

const DrivenCourseStatusActionsContext =
  createContext<DrivenCourseStatusActionsContextType>({
    updateStatus: async () => ({
      success: false,
      code: "CONTEXT_NOT_READY",
      message: "Context not initialized",
    }),
    loading: false,
  });

export const DrivenCourseStatusActionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  const updateStatus = useCallback(
    async (
      courseId: number,
      drivenId: number,
      status: DrivenCourseStatus,
    ): Promise<UpdateStatusResult> => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/course/${courseId}/driven/${drivenId}/status`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          },
        );

        if (res.ok) return { success: true };

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
        setLoading(false);
      }
    },
    [],
  );

  return (
    <DrivenCourseStatusActionsContext.Provider
      value={{ updateStatus, loading }}
    >
      {children}
    </DrivenCourseStatusActionsContext.Provider>
  );
};

export const useDrivenCourseStatusActions = () =>
  useContext(DrivenCourseStatusActionsContext);
