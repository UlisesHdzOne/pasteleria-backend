import {
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import type { FieldValidationState } from "../../components/fieldStyles.helper";
import type { CustomerCreateRequest } from "../../services/customers/customer.types";
import {
  InputSanitizer,
  type InputType,
} from "../../helpers/inputSanitizer.helper";

// ─── Types ──────────────────────────────────────────────────────────

export type CustomerField =
  | "firstName"
  | "lastName"
  | "phone"
  | "email"
  | "avatar";

type CustomerFormData = Omit<CustomerCreateRequest, "avatar"> & {
  avatar?: string;
};

type FieldState = {
  value: string;
  errors: string[];
  touched: boolean;
  wasSanitized: boolean;
};

type FormState = {
  fields: Record<CustomerField, FieldState>;
  submitCount: number;
};

// ─── Constants ────────────────────────────────────────────────────────

const FIELD_INPUT_TYPES: Record<CustomerField, InputType> = {
  firstName: "firstName",
  lastName: "lastName",
  phone: "phone",
  email: "email",
  avatar: "url",
};

const REQUIRED_FIELDS: CustomerField[] = ["firstName", "lastName", "phone"];

const FIELD_LABELS: Record<CustomerField, string> = {
  firstName: "Nombre",
  lastName: "Apellido",
  phone: "Teléfono",
  email: "Correo electrónico",
  avatar: "Avatar",
};

// ─── Pure Functions (fuera del hook, no dependen de React) ────────────

/** Valida campo y retorna errores como string[] */
function validateCustomerField(
  field: CustomerField,
  value: string,
): string[] {
  const isRequired = REQUIRED_FIELDS.includes(field);
  const errors: string[] = [];

  // Validar requerido
  if (isRequired && !value.trim()) {
    errors.push(`El ${FIELD_LABELS[field]} es requerido`);
    return errors;
  }

  // Validar según tipo - cada error como string (siempre, no solo cuando hay valor)
  if (value.trim()) {
    const inputType = FIELD_INPUT_TYPES[field];
    const validationErrors = InputSanitizer.validate(value, inputType);
    errors.push(...validationErrors);
  }

  return errors;
}

function sanitizeCustomerField(
  field: CustomerField,
  value: string,
): { value: string; wasSanitized: boolean } {
  const inputType = FIELD_INPUT_TYPES[field];
  const result = InputSanitizer.sanitize(value, inputType);
  return {
    value: result.value,
    wasSanitized: result.wasSanitized,
  };
}

// Computa estado de validación basado en errores y touched - Selector puro
function computeValidationState(
  errors: string[],
  isTouched = false,
): {
  isValid: boolean;
  hasError: boolean;
  errorMessage: string | null;
  status: "idle" | "valid" | "error";
} {
  const hasErrors = errors.length > 0;
  const isValid = !hasErrors;
  const hasError = isTouched && hasErrors;
  const status: "idle" | "valid" | "error" = hasError
    ? "error"
    : isTouched
      ? "valid"
      : "idle";

  return {
    isValid,
    hasError,
    errorMessage: hasErrors ? errors[0] : null,
    status,
  };
}

// Helper para comparar datos del formulario de forma eficiente
function isSameData(
  current: Record<CustomerField, FieldState>,
  newData: CustomerFormData,
): boolean {
  return (
    current.firstName.value === (newData.firstName || "") &&
    current.lastName.value === (newData.lastName || "") &&
    current.phone.value === (newData.phone || "") &&
    current.email.value === (newData.email || "") &&
    current.avatar.value === (newData.avatar || "")
  );
}

function createInitialFields(
  data: CustomerFormData,
): Record<CustomerField, FieldState> {
  const createField = (value: string): FieldState => ({
    value,
    errors: [],
    touched: false,
    wasSanitized: false,
  });

  return {
    firstName: createField(data.firstName || ""),
    lastName: createField(data.lastName || ""),
    phone: createField(data.phone || ""),
    email: createField(data.email || ""),
    avatar: createField(data.avatar || ""),
  };
}

// ─── Reducer ──────────────────────────────────────────────────────────

type Action =
  | { type: "CHANGE"; field: CustomerField; value: string; wasSanitized: boolean }
  | { type: "BLUR"; field: CustomerField }
  | { type: "TOUCH_FIELD"; field: CustomerField }
  | { type: "SET_ERRORS"; field: CustomerField; errors: string[] }
  | { type: "CLEAR_ERRORS"; field?: CustomerField }
  | { type: "RESET"; data?: CustomerFormData }
  | { type: "SUBMIT" };

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "CHANGE": {
      const { field, value, wasSanitized } = action;
      const errors = validateCustomerField(field, value);
      const fieldState = state.fields[field];

      return {
        ...state,
        fields: {
          ...state.fields,
          [field]: {
            ...fieldState,
            value,
            errors,
            wasSanitized,
          },
        },
      };
    }

    case "TOUCH_FIELD": {
      const { field } = action;
      const fieldState = state.fields[field];

      return {
        ...state,
        fields: {
          ...state.fields,
          [field]: {
            ...fieldState,
            touched: true,
          },
        },
      };
    }

    case "BLUR": {
      const { field } = action;
      const fieldState = state.fields[field];
      const errors = validateCustomerField(field, fieldState.value);

      return {
        ...state,
        fields: {
          ...state.fields,
          [field]: {
            ...fieldState,
            touched: true,
            errors,
          },
        },
      };
    }

    case "SET_ERRORS": {
      const { field, errors } = action;
      const fieldState = state.fields[field];

      return {
        ...state,
        fields: {
          ...state.fields,
          [field]: {
            ...fieldState,
            touched: true,
            errors,
          },
        },
      };
    }

    case "CLEAR_ERRORS": {
      const { field } = action;

      if (field) {
        const fieldState = state.fields[field];

        return {
          ...state,
          fields: {
            ...state.fields,
            [field]: {
              ...fieldState,
              errors: [],
            },
          },
        };
      }

      // Limpiar todos los errores
      const newFields = { ...state.fields };
      (Object.keys(newFields) as CustomerField[]).forEach((f) => {
        newFields[f] = {
          ...newFields[f],
          errors: [],
        };
      });

      return {
        ...state,
        fields: newFields,
      };
    }

    case "RESET": {
      const data = action.data;
      return {
        fields: createInitialFields(
          data || { firstName: "", lastName: "", phone: "", email: "" },
        ),
        submitCount: 0,
      };
    }

    case "SUBMIT": {
      const validatedFields = Object.entries(state.fields).reduce(
        (acc, [key, fieldState]) => {
          const field = key as CustomerField;
          const errors = validateCustomerField(field, fieldState.value);

          return {
            ...acc,
            [key]: {
              ...fieldState,
              touched: true,
              errors,
            },
          };
        },
        {} as Record<CustomerField, FieldState>,
      );

      return {
        ...state,
        submitCount: state.submitCount + 1,
        fields: validatedFields,
      };
    }

    default:
      return state;
  }
}

// ─── Hook Principal ─────────────────────────────────────────────────

export function useCustomerValidation(initialData: CustomerFormData) {
  // Guardar valores iniciales para comparación de isDirty
  const initialValuesRef = useRef(initialData);

  // Estado inicial memoizado
  const initialState = useMemo<FormState>(
    () => ({
      fields: createInitialFields(initialData),
      submitCount: 0,
    }),
    [], // Solo al montar
  );

  const [state, dispatch] = useReducer(formReducer, initialState);

  // Ref para acceder al estado actual en callbacks sin dependencias
  const stateRef = useRef(state);

  // Sincronizar stateRef SIEMPRE
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // ─── Actions ────────────────────────────────────────────────────────

  const handleFieldChange = useCallback(
    (field: CustomerField, value: string) => {
      const { value: sanitizedValue, wasSanitized } = sanitizeCustomerField(field, value);
      dispatch({ type: "CHANGE", field, value: sanitizedValue, wasSanitized });
    },
    [],
  );

  const handleFieldBlur = useCallback((field: CustomerField) => {
    dispatch({ type: "TOUCH_FIELD", field });
    dispatch({ type: "BLUR", field });
  }, []);

  const setFieldErrors = useCallback(
    (field: CustomerField, errors: string[]) => {
      dispatch({ type: "SET_ERRORS", field, errors });
    },
    [],
  );

  const clearFieldErrors = useCallback((field?: CustomerField) => {
    dispatch({ type: "CLEAR_ERRORS", field });
  }, []);

  const resetForm = useCallback(
    (data?: CustomerFormData) => {
      const newData = data || {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        avatar: "",
      };

      // Comparar con estado actual para evitar renders innecesarios
      if (isSameData(stateRef.current.fields, newData)) {
        return;
      }

      // Actualizar initialValuesRef para que isDirty compare contra los nuevos valores
      initialValuesRef.current = newData;
      dispatch({ type: "RESET", data });
    },
    [dispatch],
  );

  const validateForm = useCallback(() => {
    dispatch({ type: "SUBMIT" });

    // Verificar si hay errores después de validar
    const currentFields = stateRef.current.fields;
    return Object.values(currentFields).every((f) => f.errors.length === 0);
  }, []);

  // ─── Computed Values (memoizados) ──────────────────────────────────

  const formData = useMemo<CustomerFormData>(
    () => ({
      firstName: state.fields.firstName.value,
      lastName: state.fields.lastName.value,
      phone: state.fields.phone.value,
      email: state.fields.email.value || undefined,
      avatar: state.fields.avatar.value || undefined,
    }),
    [state.fields]
  );

  useEffect(() => {
    setInitialValuesState(initialValuesRef.current);
  }, [state.fields]);

  // Estado para tracking de valores iniciales (para isDirty)
  const [initialValuesState, setInitialValuesState] = useState<CustomerFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    avatar: "",
  });

  // isDirty computado correctamente comparando contra valores iniciales
  const isDirty = useMemo(() => {
    const initial = initialValuesState;
    return (
      state.fields.firstName.value !== (initial.firstName || "") ||
      state.fields.lastName.value !== (initial.lastName || "") ||
      state.fields.phone.value !== (initial.phone || "") ||
      state.fields.email.value !== (initial.email || "") ||
      state.fields.avatar.value !== (initial.avatar || "")
    );
  }, [
    state.fields.firstName.value,
    state.fields.lastName.value,
    state.fields.phone.value,
    state.fields.email.value,
    state.fields.avatar.value,
    initialValuesState,
  ]);

  // isValid computado - verifica que todos los campos sean válidos (sin errores)
  const isValid = useMemo(
    () => Object.values(state.fields).every((f) => f.errors.length === 0),
    [state.fields]
  );

  const isSubmitDisabled = !isValid || !isDirty;

  // ─── Field Helpers ──────────────────────────────────────────────────

  // Retorna el estado completo del campo - O(1), calculando estado derivado
  const getFieldState = useCallback(
    (field: CustomerField): FieldValidationState => {
      const base = state.fields[field];
      const initialValue = initialValuesRef.current[field] || "";
      const computed = computeValidationState(base.errors, base.touched);

      return {
        value: base.value,
        isDirty: base.value !== initialValue,
        touched: base.touched,
        wasSanitized: base.wasSanitized,
        ...computed,
      };
    },
    [state.fields],
  );

  // ─── getSanitizedData (función pura, solo ejecutada en submit) ─────
  const getSanitizedData = useCallback((): CustomerCreateRequest => {
    const { fields } = stateRef.current;
    const sanitized: CustomerCreateRequest = {
      firstName: fields.firstName.value.trim(),
      lastName: fields.lastName.value.trim(),
      phone: fields.phone.value.trim(),
    };

    if (fields.email.value?.trim()) {
      sanitized.email = fields.email.value.trim();
    }

    return sanitized;
  }, []);

  // ─── Return (API pública) ───────────────────────────────────────────

  return {
    // Estado
    formData,
    fields: state.fields,
    isDirty,
    isValid,
    isSubmitDisabled,
    submitCount: state.submitCount,

    // Acciones
    handleFieldChange,
    handleFieldBlur,
    setFieldErrors,
    clearFieldErrors,
    resetForm,
    validateForm,

    // Helpers
    getFieldState,
    getSanitizedData,
  };
}

// Types ya exportados arriba, no re-exportar
