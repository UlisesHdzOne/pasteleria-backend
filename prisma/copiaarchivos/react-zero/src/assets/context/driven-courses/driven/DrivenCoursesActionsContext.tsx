import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import {
  useDrivenCoursesData,
  type DrivenCourseItem,
  type DrivenCoursesMeta,
} from "./DrivenCoursesDataContext";

type DrivenCoursesActionsContextType = {
  fetchCourses: (
    drivenId: number,
    params?: { page?: number; limit?: number },
  ) => Promise<void>;
  loading: boolean;
};

const DrivenCoursesActionsContext =
  createContext<DrivenCoursesActionsContextType>({
    fetchCourses: async () => {},
    loading: false,
  });

export const DrivenCoursesActionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { setCourses, setMeta, setError } = useDrivenCoursesData();
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchCourses = useCallback(
    async (drivenId: number, params?: { page?: number; limit?: number }) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams();
        if (params?.page) query.append("page", String(params.page));
        if (params?.limit) query.append("limit", String(params.limit ?? 10));

        const res = await fetch(
          `http://localhost:3000/driven-course/driven/${drivenId}?${query.toString()}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Error al cargar cursos");

        const data = (await res.json()) as {
          data: DrivenCourseItem[];
          meta: DrivenCoursesMeta;
        };
        setCourses(data.data);
        setMeta(data.meta);
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [setCourses, setMeta, setError],
  );

  return (
    <DrivenCoursesActionsContext.Provider value={{ fetchCourses, loading }}>
      {children}
    </DrivenCoursesActionsContext.Provider>
  );
};

export const useDrivenCoursesActions = () =>
  useContext(DrivenCoursesActionsContext);
//Cursos del Driven modal 1
