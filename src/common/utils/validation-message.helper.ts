export class ValidationMessageHelper {
  private static readonly messageTranslations: Record<string, string> = {
    'must be longer than or equal to': 'debe tener al menos',
    'must be shorter than or equal to': 'debe tener como máximo',
    'must be an email': 'debe ser un email válido',
    'should not be empty': 'no debe estar vacío',
    'must be a string': 'debe ser texto',
    'must be a number': 'debe ser un número',
    'must match': 'debe coincidir con',
    'must not be one of the following values': 'no debe ser uno de los siguientes valores',
    'must be a boolean': 'debe ser verdadero o falso',
    'must be an array': 'debe ser un arreglo',
    'must be a valid enum': 'debe ser una opción válida',
  };

  static translateMessage(englishMessage: string): string {
    let translated = englishMessage;
    
    // Traducir patrones comunes
    Object.entries(this.messageTranslations).forEach(([english, spanish]) => {
      translated = translated.replace(new RegExp(english, 'g'), spanish);
    });

    // Traducciones específicas
    if (translated.includes('characters')) {
      translated = translated.replace('characters', 'caracteres');
    }

    if (translated.includes('digits')) {
      translated = translated.replace('digits', 'dígitos');
    }

    if (translated.includes('must contain only letters')) {
      translated = translated.replace('must contain only letters', 'debe contener solo letras');
    }

    if (translated.includes('must contain only numbers')) {
      translated = translated.replace('must contain only numbers', 'debe contener solo números');
    }

    return translated;
  }

  static parseFieldAndMessage(validationMessage: string): { field: string; message: string } | null {
    // Parsear "phone must be longer than or equal to 10 characters"
    const match = validationMessage.match(/^(\w+)\s+(.+)$/);
    if (!match) return null;

    const field = match[1];
    const englishMessage = match[2];
    const translatedMessage = this.translateMessage(englishMessage);

    return { field, message: translatedMessage };
  }
}
