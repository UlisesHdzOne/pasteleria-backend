import { createContext, useContext, useState, type ReactNode } from "react";
import type { DrivenCourseListItem, DrivenCourseMeta } from "../../../../types/driven-course/driven-course";

type DrivenCourseAllDataContextType = {
  items: DrivenCourseListItem[];
  meta: DrivenCourseMeta | null;
  error: string | null;
  setItems: React.Dispatch<React.SetStateAction<DrivenCourseListItem[]>>;
  setMeta: React.Dispatch<React.SetStateAction<DrivenCourseMeta | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const DrivenCourseAllDataContext =
  createContext<DrivenCourseAllDataContextType>({
    items: [],
    meta: null,
    error: null,
    setItems: () => {},
    setMeta: () => {},
    setError: () => {},
  });

export const DrivenCourseAllDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [items, setItems] = useState<DrivenCourseListItem[]>([]);
  const [meta, setMeta] = useState<DrivenCourseMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <DrivenCourseAllDataContext.Provider
      value={{ items, meta, error, setItems, setMeta, setError }}
    >
      {children}
    </DrivenCourseAllDataContext.Provider>
  );
};

export const useDrivenCourseAllData = () =>
  useContext(DrivenCourseAllDataContext);
