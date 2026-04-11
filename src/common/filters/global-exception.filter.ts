import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('=== GlobalExceptionFilter Debug ===');
    console.log('Exception type:', typeof exception);
    console.log('Exception constructor:', exception?.constructor?.name);
    console.log('Exception:', exception);
    console.log('Is HttpException:', exception instanceof HttpException);
    
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    //  Errores HTTP (DTO, BadRequest, etc)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      let errors: any = {};

      // Si ya tiene el formato correcto, no volver a envolver
      if (response && typeof response === 'object' && (response as any).statusCode && (response as any).errors) {
        return res.status(status).json(response);
      }

      if (typeof response === 'string') {
        errors = { message: [response] };
      } else if ((response as any).message) {
        const msg = (response as any).message;

        errors = Array.isArray(msg)
          ? this.mapArrayErrors(msg)
          : { message: [msg] };
      } else {
        errors = response;
      }

      return res.status(status).json({
        statusCode: status,
        errors,
      });
    }

    // 👉 fallback
    return res.status(500).json({
      statusCode: 500,
      errors: {
        message: ['Internal server error'],
      },
    });
  }

  private mapArrayErrors(messages: string[]) {
    const errors: Record<string, string[]> = {};

    for (const msg of messages) {
      errors['message'] = errors['message']
        ? [...errors['message'], msg]
        : [msg];
    }

    return errors;
  }
}
