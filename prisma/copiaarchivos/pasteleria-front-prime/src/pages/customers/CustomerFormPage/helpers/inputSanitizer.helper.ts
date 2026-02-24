export type InputType = "text" | "phone";

export interface InputValidationRule {
  pattern: RegExp;
  allowSpaces?: boolean;
  minLength?: number;
  maxLength?: number;
  format?: string;
  errorMessage?: string;
}

export interface SanitizedResult {
  value: string;
  isValid: boolean;
  wasSanitized: boolean;
  removedChars?: string[];
}

export class InputSanitizer {
  private static readonly TEXT_PATTERN = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  private static readonly PHONE_PATTERN = /^[0-9\s\-()]+$/;

  private static readonly RULES: Record<InputType, InputValidationRule> = {
    text: {
      pattern: InputSanitizer.TEXT_PATTERN,
      allowSpaces: true,
      minLength: 3,
      maxLength: 50,
      format: "Solo letras y espacios",
      errorMessage: "Solo se permiten letras y espacios",
    },
    phone: {
      pattern: InputSanitizer.PHONE_PATTERN,
      minLength: 10,
      maxLength: 15,
      format: "Solo números y - ( )",
      errorMessage: "Solo se permiten números y caracteres telefónicos (- ( ))",
    },
  };

  static sanitize(value: string, type: InputType): SanitizedResult {
    const rule = this.RULES[type];
    const originalValue = value;

    // Eliminar caracteres no permitidos
    const sanitizedValue = value.replace(
      new RegExp(`[^${this.getPatternString(type)}]`, "g"),
      "",
    );

    // Truncar si excede el máximo
    const truncatedValue = rule.maxLength
      ? sanitizedValue.slice(0, rule.maxLength)
      : sanitizedValue;

    // Identificar caracteres eliminados
    const removedChars = originalValue
      .split("")
      .filter((char) => !truncatedValue.includes(char));

    return {
      value: truncatedValue,
      isValid:
        rule.pattern.test(truncatedValue) &&
        (!rule.maxLength || truncatedValue.length <= rule.maxLength),
      wasSanitized: originalValue !== truncatedValue,
      removedChars: removedChars.length > 0 ? removedChars : undefined,
    };
  }

  static validate(value: string, type: InputType): string[] {
    const rule = this.RULES[type];
    const errors: string[] = [];

    if (!value.trim()) {
      errors.push(`El campo es obligatorio`);
      return errors;
    }

    // Validar patrón
    if (!rule.pattern.test(value)) {
      errors.push(rule.errorMessage || "Formato inválido");
    }

    // Validar longitud
    if (rule.minLength && value.length < rule.minLength) {
      errors.push(`Debe tener al menos ${rule.minLength} caracteres`);
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push(`Máximo ${rule.maxLength} caracteres`);
    }

    return errors;
  }

  static formatPhone(value: string): string {
    // Formatear teléfono: (55) 1234-5678
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6, 10)}`;
    }
  }

  static getPatternString(type: InputType): string {
    switch (type) {
      case "text":
        return "a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s";
      case "phone":
        return "0-9\\s\\-\\(\\)";
      default:
        return "";
    }
  }

  static getRule(type: InputType): InputValidationRule {
    return this.RULES[type];
  }
}
