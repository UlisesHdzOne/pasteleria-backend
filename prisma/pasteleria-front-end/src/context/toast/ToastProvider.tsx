//import { useState, ReactNode } from "react";
import ToastContext from "./ToastContext";
//import { ToastState, ToastType } from "./types";
//import Toast from "../../components/shared/Toast";
import { useState, type ReactNode } from "react";
import type { ToastState, ToastType } from "./types";
import Toast from "../../components/shared/Toast";

interface Props {
  children: ReactNode;
}

const ToastProvider = ({ children }: Props) => {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
    visible: false,
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

// como usarlo
// const { showToast } = useToast();

// showToast("Cliente creado correctamente", "success");
