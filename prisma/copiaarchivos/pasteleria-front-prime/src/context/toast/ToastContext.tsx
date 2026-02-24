import { createContext } from "react";
import type { ToastContextValue } from "./types";
//import { ToastContextValue } from "./types";

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export default ToastContext;
