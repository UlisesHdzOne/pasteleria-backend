export type ToastType = "success" | "error";

export interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
}

export interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}
