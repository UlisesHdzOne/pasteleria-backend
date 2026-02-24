import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type AssignResult =
  | { success: true }
  | { success: false; code: string; message: string };

type CourseDrivenPayload = {
  courseId: number;
  drivenId: number;
};

type CourseAssignmentActionsContextType = {
  assignCourseToDriven: (data: CourseDrivenPayload) => Promise<AssignResult>;
  loading: boolean;
};

const CourseAssignmentActionsContext =
  createContext<CourseAssignmentActionsContextType>({
    assignCourseToDriven: async () => ({
      success: false,
      code: "CONTEXT_NOT_READY",
      message: "Context not initialized",
    }),
    loading: false,
  });

export const CourseAssignmentActionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  const assignCourseToDriven = useCallback(
    async ({
      courseId,
      drivenId,
    }: CourseDrivenPayload): Promise<AssignResult> => {
      setLoading(true);

      try {
        const res = await fetch("http://localhost:3000/driven-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId, drivenId }),
        });

        if (res.ok) {
          return { success: true };
        }

        let error: any = {};
        try {
          error = await res.json();
        } catch {}

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
    <CourseAssignmentActionsContext.Provider
      value={{ assignCourseToDriven, loading }}
    >
      {children}
    </CourseAssignmentActionsContext.Provider>
  );
};

export const useCourseAssignmentActions = () =>
  useContext(CourseAssignmentActionsContext);

///Asignar curso a Driven ok
