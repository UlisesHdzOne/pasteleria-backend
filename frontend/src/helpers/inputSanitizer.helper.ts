export type InputType =
  | "firstName"
  | "lastName"
  | "fullName"
  | "shortText"
  | "description"
  | "phone"
  | "email"
  | "url"
  | "postalCode"
  | "number"
  | "hexColor";

type InputRule = {
  pattern: RegExp;
  charPattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  errorMessage: string;
  sanitize?: (value: string) => string;
};

interface SanitizedResult {
  value: string;
  isValid: boolean;
  wasSanitized: boolean;
  removedChars?: string[];
}

export class InputSanitizer {
  private static readonly RULES: Record<InputType, InputRule> = {
    firstName: {
      pattern: /^[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü'-]*(\s[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü'-]*)*$/,
      charPattern: /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/,
      minLength: 2,
      maxLength: 25,
      errorMessage: "Solo letras, espacios, apóstrofos y guiones",
      sanitize: (value) =>
        value
          .replace(/\s+/g, " ")
          .toLowerCase()
          .replace(/\b[a-záéíóúñü]/g, (c) => c.toUpperCase()),
    },
    lastName: {
      pattern: /^[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü'-]+(\s[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü'-]+)*$/,
      charPattern: /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/,
      minLength: 1,
      maxLength: 30,
      errorMessage: "Solo letras, espacios, apóstrofos y guiones",
      sanitize: (value) =>
        value
          .replace(/\s+/g, " ")
          .toLowerCase()
          .replace(/\b[a-záéíóúñü]/g, (c) => c.toUpperCase()),
    },
    fullName: {
      pattern: /^[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü'-]+(\s+[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü'-]+)+$/,
      charPattern: /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/,
      minLength: 3,
      maxLength: 50,
      errorMessage: "Nombre completo requerido (nombre y apellido)",
      sanitize: (value) =>
        value
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase()
          .replace(/\b[a-záéíóúñü]/g, (c) => c.toUpperCase()),
    },
    shortText: {
      pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;:!?¿¡()-]+$/,
      charPattern: /[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;:!?¿¡()-]/,
      minLength: 2,
      maxLength: 50,
      errorMessage: "Caracteres no permitidos",
    },
    phone: {
      pattern: /^\(?\d{2,3}\)?[\s\-]?\d{3,4}[\s\-]?\d{4}$/,
      charPattern: /[0-9\s\-()]/,
      minLength: 10,
      maxLength: 15,
      errorMessage: "Formato de teléfono inválido",
      sanitize: (value) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length <= 2) return cleaned;
        if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
        if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6, 10)}`;
      },
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      charPattern: /[a-zA-Z0-9._%+-@]/,
      minLength: 5,
      maxLength: 100,
      errorMessage: "Formato de email inválido",
    },
    url: {
      pattern: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}(\/.*)?$/,
      charPattern: /[a-zA-Z0-9._~:/?#\[\]@!$&'()*+,;=%-]/,
      minLength: 3,
      maxLength: 500,
      errorMessage: "URL inválida",
      sanitize: (value) => {
        let url = value.trim();
        if (!/^https?:\/\//i.test(url)) {
          url = `https://${url}`;
        }
        return url.toLowerCase();
      },
    },
    postalCode: {
      pattern: /^[A-Za-z0-9\s-]+$/,
      charPattern: /[A-Za-z0-9\s-]/,
      minLength: 3,
      maxLength: 10,
      errorMessage: "Código postal inválido",
      sanitize: (value) => value.toUpperCase().trim(),
    },
    number: {
      pattern: /^-?\d+\.?\d*$/,
      charPattern: /[0-9.-]/,
      minLength: 1,
      maxLength: 10,
      errorMessage: "Solo se permiten números (enteros o decimales)",
    },
    description: {
      pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;:!?¿¡()'"-]+$/,
      charPattern: /[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;:!?¿¡()'"-]/,
      minLength: 5,
      maxLength: 500,
      errorMessage: "Caracteres no permitidos en la descripción",
    },
    hexColor: {
      pattern: /^#[0-9A-F]{6}$/,
      charPattern: /[0-9A-Fa-f#]/,
      minLength: 7,
      maxLength: 7,
      errorMessage: "Debe ser un color hex válido, ej: #FF5733",
      sanitize: (value) => value.toUpperCase().trim(),
    },
  };

  static sanitize(value: string, type: InputType): SanitizedResult {
    const rule = this.RULES[type];
    const originalValue = value;

    // Crear copia segura de charPattern para evitar problemas con /g
    const safeCharPattern = rule.charPattern
      ? new RegExp(rule.charPattern.source)
      : null;

    // 1. Limpiar caracteres usando charPattern si existe (sin trim para permitir espacios al escribir)
    let processedValue = value;
    if (safeCharPattern) {
      processedValue = [...processedValue]
        .filter((char) => safeCharPattern.test(char))
        .join("");
    }

    // 3. Aplicar sanitización específica del tipo si existe
    if (rule.sanitize) {
      processedValue = rule.sanitize(processedValue);
    }

    // 4. Truncar por maxLength
    const truncatedValue = rule.maxLength
      ? processedValue.slice(0, rule.maxLength)
      : processedValue;

    // 5. Calcular caracteres removidos
    const removedChars = safeCharPattern
      ? [...originalValue].filter((char) => !safeCharPattern.test(char))
      : undefined;

    // 6. Detectar si hubo sanitización en cualquier etapa
    const wasSanitized =
      originalValue !== processedValue || processedValue !== truncatedValue;

    // 7. Validar con pattern + min/max
    const isValid =
      rule.pattern.test(truncatedValue) &&
      (!rule.minLength || truncatedValue.length >= rule.minLength) &&
      (!rule.maxLength || truncatedValue.length <= rule.maxLength);

    return {
      value: truncatedValue,
      isValid,
      wasSanitized,
      removedChars:
        removedChars && removedChars.length > 0 ? removedChars : undefined,
    };
  }

  static validate(value: string, type: InputType): string[] {
    const rule = this.RULES[type];
    const errors: string[] = [];

    if (!value.trim()) {
      return errors;
    }

    if (!rule.pattern.test(value)) {
      errors.push(rule.errorMessage || "Formato inválido");
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors.push(`Mínimo ${rule.minLength} caracteres`);
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push(`Máximo ${rule.maxLength} caracteres`);
    }

    return errors;
  }

  static validateRequired(value: string, fieldName: string): string[] {
    if (!value || !value.trim()) {
      return [`${fieldName} es requerido`];
    }
    return [];
  }

  static formatPhone(value: string): string {
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

  static getRule(type: InputType): InputRule {
    return this.RULES[type];
  }
}
