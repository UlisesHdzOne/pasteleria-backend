// src/main.ts
import { NestFactory } from '@nestjs/core';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes
  app.useGlobalPipes(new CustomValidationPipe());

  // Global filters - obtener del DI container para inyección de dependencias
  const globalFilter = app.get(GlobalExceptionFilter);
  app.useGlobalFilters(globalFilter);

  // Global response wrapper
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Habilitar CORS si es necesario

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application running on: ${await app.getUrl()}`);
}

void bootstrap();
