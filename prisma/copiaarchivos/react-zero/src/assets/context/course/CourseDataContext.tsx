import { createContext, useContext, useState, type ReactNode } from "react";
import type { CourseListItem, CourseMeta } from "../../../types/course/course";

type CourseDataContext = {
  courses: CourseListItem[];
  meta: CourseMeta | null;
  error: string | null;
  setCourses: React.Dispatch<React.SetStateAction<CourseListItem[]>>;
  setMeta: React.Dispatch<React.SetStateAction<CourseMeta | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};
const CourseDataContext = createContext<CourseDataContext>({
  courses: [],
  meta: null,
  error: null,
  setCourses: () => {},
  setMeta: () => {},
  setError: () => {},
});
export const CourseDataProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [meta, setMeta] = useState<CourseMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <CourseDataContext.Provider
      value={{ courses, setCourses, meta, setMeta, error, setError }}
    >
      {children}
    </CourseDataContext.Provider>
  );
};

export const useCourseData = () => useContext(CourseDataContext);
