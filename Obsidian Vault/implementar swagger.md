### 1. Instala dependencias

```bash
npm install --save @nestjs/swagger swagger-ui-express
```

---

### 2. Configura Swagger en `main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PrimeBack API')
    .setDescription('API para manejo de usuarios')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

---

### 3. Agrega decoradores en DTO y Controladores para mejorar la documentación

Ejemplo en `create-user.dto.ts`:

```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Pérez' })
  name: string;

  @ApiProperty({ example: 'juan@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}
```

Ejemplo en `users.controller.ts`:

```ts
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  //...
}
```

---

### 4. Corre tu proyecto y entra a

```
http://localhost:3000/api
```



---

