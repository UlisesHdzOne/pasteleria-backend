import React, { forwardRef, useRef } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import type {
  FieldValidationState,
  FieldStyles,
} from "../helpers/fieldState.helper";
import type { InputType } from "../helpers/inputSanitizer.helper";
import { InputSanitizer } from "../helpers/inputSanitizer.helper";

interface ValidatedInputProps {
  id: string;
  type: "text" | "tel";
  inputType: InputType;
  value: string;
  placeholder: string;
  disabled: boolean;
  fieldState: FieldValidationState;
  styles: FieldStyles;
  leftIcon?: React.ReactNode;
  onChange: (value: string) => void;
  onBlur: () => void;
  onFocus?: () => void;
  onPaste?: (e: React.ClipboardEvent) => void;
  ariaProps: React.HTMLAttributes<HTMLInputElement>;
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  (
    {
      id,
      type,
      inputType,
      value,
      placeholder,
      disabled,
      fieldState,
      styles,
      leftIcon,
      onChange,
      onBlur,
      onFocus,
      onPaste,
      ariaProps,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Manejar cambio de valor con sanitización
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const sanitized = InputSanitizer.sanitize(newValue, inputType);

      // Aplicar formato especial para teléfono
      const finalValue =
        inputType === "phone"
          ? InputSanitizer.formatPhone(sanitized.value)
          : sanitized.value;

      onChange(finalValue);
    };

    // Manejar pegado para prevenir entrada inválida
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const sanitized = InputSanitizer.sanitize(pastedText, inputType);

      // Aplicar formato especial para teléfono
      const finalValue =
        inputType === "phone"
          ? InputSanitizer.formatPhone(sanitized.value)
          : sanitized.value;

      onChange(finalValue);

      onPaste?.(e);
    };

    const renderIcon = () => {
      switch (styles.iconType) {
        case "spinner":
          return (
            <div
              className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
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
              className="w-5 h-5 text-red-500"
              role="img"
              aria-label="Error en campo"
            />
          );
        default:
          return null;
      }
    };

    const errorId = `${id}-error`;
    const hasError = fieldState.hasError;

    return (
      <div className={styles.container}>
        <label htmlFor={id} className={styles.label}>
          {/* Label content handled by parent */}
        </label>
        <div className="relative">
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}
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
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onPaste={handlePaste}
            className={styles.input}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            aria-errormessage={hasError ? errorId : undefined}
            data-state={fieldState.state}
            {...ariaProps}
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
            style={{
              opacity: fieldState.isTouched ? 1 : 0,
              transform: fieldState.isTouched ? "scale(1)" : "scale(0.8)",
            }}
            aria-hidden="true"
          >
            {renderIcon()}
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
            {fieldState.errors[0]}
          </p>
        )}
      </div>
    );
  },
);

ValidatedInput.displayName = "ValidatedInput";
