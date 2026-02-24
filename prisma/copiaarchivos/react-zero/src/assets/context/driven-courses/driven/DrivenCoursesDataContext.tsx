import { createContext, useContext, useState, type ReactNode } from "react";

export type DrivenCourseItem = {
  id: number;
  name: string;
  isActive: boolean;
  status: string;
  progress: number;
  assignedAt: string;
};

export type DrivenCoursesMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type DrivenCoursesDataContextType = {
  courses: DrivenCourseItem[];
  meta: DrivenCoursesMeta | null;
  error: string | null;
  setCourses: React.Dispatch<React.SetStateAction<DrivenCourseItem[]>>;
  setMeta: React.Dispatch<React.SetStateAction<DrivenCoursesMeta | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const DrivenCoursesDataContext = createContext<DrivenCoursesDataContextType>({
  courses: [],
  meta: null,
  error: null,
  setCourses: () => {},
  setMeta: () => {},
  setError: () => {},
});

export const DrivenCoursesDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [courses, setCourses] = useState<DrivenCourseItem[]>([]);
  const [meta, setMeta] = useState<DrivenCoursesMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <DrivenCoursesDataContext.Provider
      value={{ courses, meta, error, setCourses, setMeta, setError }}
    >
      {children}
    </DrivenCoursesDataContext.Provider>
  );
};

export const useDrivenCoursesData = () => useContext(DrivenCoursesDataContext);
//Cursos del Driven modal 1
