import React, { forwardRef, useRef } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { FieldStyles, FieldValidationState } from "./fieldStyles.helper";


// Componente separado para el ícono de validación
const ValidationIcon = ({
  iconType,
}: {
  iconType: "spinner" | "check" | "alert" | null;
}) => {
  switch (iconType) {
    case "spinner":
      return (
        <Loader2
          className="w-5 h-5 text-primary animate-spin"
          role="status"
          aria-label="Validando..."
        />
      );
    case "check":
      return (
        <CheckCircle
          className="w-5 h-5 text-green-500"
          role="img"
          aria-label="Campo válido"
        />
      );
    case "alert":
      return (
        <AlertCircle
          className="w-5 h-5 text-destructive"
          role="img"
          aria-label="Error en campo"
        />
      );
    default:
      return null;
  }
};

interface ValidatedInputProps {
  id: string;
  type?: "text" | "tel" | "email" | "url";
  value: string;
  placeholder?: string;
  disabled?: boolean;
  fieldState: FieldValidationState;
  styles: FieldStyles;
  leftIcon?: React.ReactNode;
  label?: React.ReactNode;
  fieldType?: "input" | "textarea";
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onPaste?: (e: React.ClipboardEvent) => void;
  ariaProps?: React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  (
    {
      id,
      type = "text",
      value,
      placeholder = "",
      disabled = false,
      fieldState,
      styles,
      leftIcon,
      label,
      fieldType = "input",
      onChange,
      onBlur,
      onFocus,
      onPaste,
      ariaProps = {},
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Manejar cambio de valor
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const newValue = e.target.value;
      onChange(newValue);
    };

    // Manejar pegado
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      onChange(pastedText);
      onPaste?.(e);
    };

    const errorId = `${id}-error`;
    const hasError = fieldState.hasError;
    const showIcon = hasError;

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && fieldType === "input" && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          {fieldType === "textarea" ? (
            <textarea
              ref={(node) => {
                textareaRef.current = node;
              }}
              id={id}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              className={`${styles.input} resize-none h-24`}
              onChange={handleChange}
              onBlur={onBlur}
              onFocus={onFocus}
              onPaste={handlePaste}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              aria-errormessage={hasError ? errorId : undefined}
              {...ariaProps}
            />
          ) : (
            <input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) ref.current = node;
              }}
              id={id}
              type={type}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              className={`${styles.input} ${leftIcon ? "pl-10" : ""} ${showIcon ? "pr-10" : ""}`}
              onChange={handleChange}
              onBlur={onBlur}
              onFocus={onFocus}
              onPaste={handlePaste}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              aria-errormessage={hasError ? errorId : undefined}
              {...ariaProps}
            />
          )}
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
            style={{
              opacity: showIcon ? 1 : 0,
              transform: showIcon ? "scale(1)" : "scale(0.8)",
            }}
            aria-hidden="true"
          >
            <ValidationIcon iconType={styles.iconType} />
          </div>
        </div>
        {hasError && (
          <p
            id={errorId}
            className={styles.error}
            role="alert"
            aria-live="polite"
            style={{
              opacity: hasError ? 1 : 0,
              transform: hasError ? "translateY(0)" : "translateY(-4px)",
            }}
          >
            {fieldState.errorMessage || "Error de validación"}
          </p>
        )}
      </div>
    );
  },
);

ValidatedInput.displayName = "ValidatedInput";
