import type { CreateCustomerDTO } from "../../../context/customer/types";
import type { InputType } from "./helpers/inputSanitizer.helper";

export interface FieldConfig {
  label: string;
  placeholder: string;
  type: "text" | "tel";
  inputType: InputType;
  icon?: "phone";
  formatHint?: string;
}

export const FIELD_CONFIG: Record<keyof CreateCustomerDTO, FieldConfig> = {
  firstName: {
    label: "Primer Nombre",
    placeholder: "Jose",
    type: "text",
    inputType: "text",
    formatHint: "Solo letras y espacios",
  },
  lastName: {
    label: "Apellido",
    placeholder: "Perez",
    type: "text",
    inputType: "text",
    formatHint: "Solo letras y espacios",
  },
  phone: {
    label: "Teléfono",
    placeholder: "(55) 1234-5678",
    type: "tel",
    inputType: "phone",
    icon: "phone",
    formatHint: "Solo números y caracteres telefónicos",
  },
} as const;
