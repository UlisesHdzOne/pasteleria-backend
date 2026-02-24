export type FieldState = "idle" | "validating" | "valid" | "invalid" | "error";

export interface FieldValidationState {
  state: FieldState;
  hasError: boolean;
  isValid: boolean;
  isTouched: boolean;
  hasValue: boolean;
  errors: string[];
}

export interface FieldStyles {
  container: string;
  input: string;
  iconType: "spinner" | "check" | "alert" | null;
  label: string;
  error: string;
}

export class FieldStateHelper {
  static getState(
    value: string,
    errors: string[],
    touched: boolean,
    isSubmitting: boolean,
  ): FieldState {
    if (isSubmitting) return "validating";
    if (!touched && !value) return "idle";
    if (errors.length > 0) return "invalid";
    if (value && touched && errors.length === 0) return "valid";
    return "idle";
  }

  static getValidationState(
    value: string,
    errors: string[],
    touched: boolean,
    isSubmitting: boolean,
  ): FieldValidationState {
    const state = this.getState(value, errors, touched, isSubmitting);
    const hasError = errors.length > 0;
    const isValid = value.length > 0 && !hasError && touched;

    return {
      state,
      hasError,
      isValid,
      isTouched: touched,
      hasValue: value.length > 0,
      errors,
    };
  }

  static getStyles(state: FieldValidationState): FieldStyles {
    const baseInputClasses =
      "w-full pl-11 pr-10 py-3 rounded-xl border-2 transition-all duration-200";
    const baseLabelClasses =
      "block text-sm font-medium mb-2 transition-colors duration-200";
    const baseErrorClasses = "text-sm mt-1.5 transition-all duration-200";

    switch (state.state) {
      case "validating":
        return {
          container: "relative",
          input: `${baseInputClasses} border-blue-400 bg-blue-50 focus:border-blue-500`,
          iconType: "spinner",
          label: `${baseLabelClasses} text-blue-700`,
          error: `${baseErrorClasses} text-blue-600`,
        };

      case "valid":
        return {
          container: "relative",
          input: `${baseInputClasses} border-green-500 bg-green-50 focus:border-green-600`,
          iconType: "check",
          label: `${baseLabelClasses} text-green-700`,
          error: `${baseErrorClasses} text-green-600`,
        };

      case "invalid":
        return {
          container: "relative",
          input: `${baseInputClasses} border-red-500 bg-red-50 focus:border-red-600`,
          iconType: "alert",
          label: `${baseLabelClasses} text-red-700`,
          error: `${baseErrorClasses} text-red-500`,
        };

      case "idle":
      default:
        return {
          container: "relative",
          input: `${baseInputClasses} border-slate-200 bg-white focus:border-blue-500 hover:border-slate-300`,
          iconType: null,
          label: `${baseLabelClasses} text-slate-700`,
          error: `${baseErrorClasses} text-slate-500`,
        };
    }
  }

  static getAriaProps(state: FieldValidationState, fieldId: string) {
    const errorId = `${fieldId}-error`;

    return {
      "aria-invalid": state.hasError,
      "aria-describedby": state.hasError ? errorId : undefined,
      "aria-errormessage": state.hasError ? errorId : undefined,
    };
  }
}
