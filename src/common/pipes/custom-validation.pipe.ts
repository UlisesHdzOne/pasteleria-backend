import { ValidationPipe, UnprocessableEntityException } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors: Record<string, string[]> = {};

        for (const error of errors) {
          const field = error.property;

          formattedErrors[field] = Object.values(error.constraints ?? {});
        }

        throw new UnprocessableEntityException({
          success: false,
          message: 'Error de validación',
          data: null,
          errors: formattedErrors,
        });
      },
    });
  }
}
