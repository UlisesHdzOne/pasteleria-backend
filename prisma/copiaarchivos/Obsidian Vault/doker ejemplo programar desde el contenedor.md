
### ✅ 1. Estructura de carpetas sugerida

```bash
nest-docker-app/
├── docker-compose.yml
├── Dockerfile
├── .env
└── app/
    └── (código NestJS irá aquí)
```

---

### ✅ 2. Contenido de archivos

#### `docker-compose.yml`

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: ulisesdb
      POSTGRES_PASSWORD: ulises123
      POSTGRES_DB: nestdb
    ports:
      - "5434:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build:
      context: ./app
      dockerfile: ../Dockerfile
    container_name: nest-backend
    volumes:
      - ./app:/app
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - db
    command: npm run start:dev

volumes:
  pgdata:
```

---

#### `Dockerfile`

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json tsconfig*.json ./
RUN npm install

COPY prisma ./prisma
COPY src ./src
COPY .env ./

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
```

---

#### `.env`

```env
DATABASE_URL=postgresql://ulisesdb:ulises123@db:5432/nestdb
JWT_SECRET=ulises_jwt
```

---

### ✅ 3. Crear el proyecto NestJS

Desde tu terminal:

```bash
npm i -g @nestjs/cli
nest new app
# Elige npm, no uses Git aquí
```

Mueve el contenido de `app/` a tu carpeta `nest-docker-app/app/`.

---

### ✅ 4. Agrega Prisma y genera cliente

```bash
cd app
npm install @prisma/client
npm install -D prisma
npx prisma init
```

Edita `prisma/schema.prisma` y pon el contenido con la base de datos:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

### ✅ 5. Construye y levanta

Desde la raíz (`nest-docker-app`):

```bash
docker-compose up --build
```

---

### ✅ 6. Instalación de recursos

Cada vez que necesites instalar algo (por ejemplo `jsonwebtoken`), hazlo así:1

1. Abre terminal dentro del contenedor:
    

```bash
docker exec -it nest-backend bash
```

2. Instala el paquete dentro del contenedor:
    

```bash
npm install jsonwebtoken
```

> También se reflejará en `package.json` porque el código está montado como volumen.

---

¿Quieres que te cree un CRUD de ejemplo para probar?