import type { DrivenListItem, DrivenMeta } from "../../../types/driven/driven";
import { createContext, useContext, useState, type ReactNode } from "react";

type DrivenDataContextType = {
  drivens: DrivenListItem[];
  meta: DrivenMeta | null;
  error: string | null;
  setDrivens: React.Dispatch<React.SetStateAction<DrivenListItem[]>>;
  setMeta: React.Dispatch<React.SetStateAction<DrivenMeta | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const DrivenDataContext = createContext<DrivenDataContextType>({
  drivens: [],
  meta: null,
  error: null,
  setDrivens: () => {},
  setMeta: () => {},
  setError: () => {},
});

export const DrivenDataProvider = ({ children }: { children: ReactNode }) => {
  const [drivens, setDrivens] = useState<DrivenListItem[]>([]);
  const [meta, setMeta] = useState<DrivenMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <DrivenDataContext.Provider value={{ drivens, meta, error, setDrivens, setMeta, setError }}>
      {children}
    </DrivenDataContext.Provider>
  );
};

export const useDrivenData = () => useContext(DrivenDataContext);
