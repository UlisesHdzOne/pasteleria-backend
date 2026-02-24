import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useCourseData } from "./CourseDataContext";
import type {
  CourseInput,
  CoursesResponse,
} from "../../../types/course/course";
import { normalizeError, type NormalizedErrors } from "../../../normalizeError";

type CourseActionsContextType = {
  fetchCourses: (params?: {
    search?: string;
    page?: number;
    isActive?: boolean;
    statusLifecycle?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  }) => Promise<void>;

  createCourse: (course: CourseInput) => Promise<{
    success: boolean;
    errors?: NormalizedErrors;
  }>;

  deleteCourse: (id: number) => Promise<boolean>;

  updateCourse: (
    id: number,
    data: Partial<CourseInput>,
  ) => Promise<{ success: boolean; errors?: NormalizedErrors }>;

  loading: boolean;
};

const CourseActionsContext = createContext<CourseActionsContextType>({
  fetchCourses: async () => {},
  createCourse: async () => ({ success: false }),
  deleteCourse: async () => false,
  updateCourse: async () => ({ success: false }),

  loading: false,
});

export const CourseActionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { setCourses, setMeta, setError } = useCourseData();
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const activeRequests = useRef(0);
  const cacheRef = useRef<Map<string, CoursesResponse>>(new Map());

  const fetchCourses = useCallback(
    async (params?: {
      search?: string;
      page?: number;
      isActive?: boolean;
      statusLifecycle?: "DRAFT" | "ACTIVE" | "ARCHIVED";
    }) => {
      const queryKey = JSON.stringify(params ?? {});
      if (cacheRef.current.has(queryKey)) {
        const cached = cacheRef.current.get(queryKey)!;
        setCourses(cached.data);
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
        if (typeof params?.isActive === "boolean") {
          query.append("isActive", params.isActive ? "true" : "false");
        }
        if (params?.statusLifecycle) {
          query.append("statusLifecycle", params.statusLifecycle);
        }

        const res = await fetch(
          `http://localhost:3000/course?${query.toString()}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Error al cargar drivens");

        const data: CoursesResponse = await res.json();
        setCourses(data.data);
        setMeta(data.meta);
        cacheRef.current.set(queryKey, data);
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        activeRequests.current -= 1;
        if (activeRequests.current === 0) setLoading(false);
      }
    },
    [setCourses, setMeta, setError],
  );

  const createCourse = useCallback(
    async (course: CourseInput) => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/course", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(course),
        });

        if (!res.ok) {
          const err = await res.json();
          return {
            success: false,
            errors: normalizeError(err, res.status),
          };
        }

        cacheRef.current.clear();
        await fetchCourses({ page: 1 });

        return { success: true };
      } catch {
        return {
          success: false,
          errors: { general: ["Error de red"] },
        };
      } finally {
        setLoading(false);
      }
    },
    [fetchCourses],
  );

  const deleteCourse = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/course/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) return false;

        // limpiar cache y recargar lista
        cacheRef.current.clear();
        await fetchCourses({ page: 1 });

        return true;
      } catch {
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchCourses],
  );

  const updateCourse = useCallback(
    async (id: number, data: Partial<CourseInput>) => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/course/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const err = await res.json();
          return {
            success: false,
            errors: normalizeError(err, res.status),
          };
        }

        cacheRef.current.clear();
        await fetchCourses({ page: 1 });

        return { success: true };
      } catch {
        return {
          success: false,
          errors: { general: ["Error de red"] },
        };
      } finally {
        setLoading(false);
      }
    },
    [fetchCourses],
  );

  return (
    <CourseActionsContext.Provider
      value={{
        fetchCourses,
        createCourse,
        deleteCourse,
        updateCourse,
        loading,
      }}
    >
      {children}
    </CourseActionsContext.Provider>
  );
};

export const useCourseAction = () => useContext(CourseActionsContext);
