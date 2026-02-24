## 🎯 Objetivo

Contenerizar completamente el entorno backend: tanto NestJS como PostgreSQL corren en sus propios contenedores. Ya no dependemos del sistema anfitrión para correr el backend o conectar Prisma.

---
sudo pacman -s docker-compose
## 📁 Estructura del proyecto

```
📁 back-end-atomo/
  ├── backend/
  │   ├── src/
  │   ├── prisma/
  │   ├── Dockerfile
  │   └── ...
  ├── docker-compose.yml
  └── .env
```

---

## 🧾 Paso a paso

---

### 1. Crear `.env`

Este `.env` lo usan tanto NestJS como Prisma. Como todo corre en Docker, usamos el **nombre del servicio** como host (no `localhost`).

```env
DATABASE_URL=postgresql://ulisesdb:ulises123@db:5432/nestdb
JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d
```

---

### 2. Dockerfile para backend

Dentro de `backend/Dockerfile`:

```Dockerfile
# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Generar Prisma client
RUN npx prisma generate

# Compilar el proyecto NestJS (si usas TypeScript)
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "start:dev"]
```

---

### 3. Crear `docker-compose.yml` general

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
    build: ./backend
    container_name: backend
    ports:
      - "3000:3000"
    depends_on:
      - db
    volumes:
      - ./backend:/app
    env_file:
      - .env

volumes:
  pgdata:
```

---

### 4. Comandos utilizados

#### Para construir y levantar los contenedores:

```
docker compose up --build -d
```

#### Para ingresar al contenedor del backend:

```
docker compose exec backend sh
```

Una vez dentro, puedes correr:

```bash
npx prisma migrate dev --name init
```

Esto aplica las migraciones desde dentro del contenedor.

---

### 5. Prisma y migraciones

Ya dentro del contenedor `backend`, ejecutamos los comandos de Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

### 6. Verificar servicios corriendo

```bash
docker ps
```

Debes ver:

- backend corriendo en `3000`
    
- db corriendo en `5434`
    

---

## ✅ Resultado

- Código fuente backend **dentro del contenedor**.
    
- Base de datos en otro contenedor.
    
- Prisma se ejecuta desde dentro del contenedor backend y conecta usando `db:5432`.
    
- Proyecto completamente auto contenido, sin depender del entorno local.
    



-------------------------------
Correcto. En el flujo anterior ya incluí la migración dentro del `CMD` del Dockerfile, pero si **prefieres hacerlo manualmente**, aquí te dejo **los pasos completos** con la migración Prisma incluida como parte separada:

---

## 🧱 1. Estructura base del proyecto

```
backend/
├── Dockerfile
├── .env
├── prisma/
│   └── schema.prisma
├── src/
├── package.json
├── tsconfig.json
```

Y afuera (raíz o monorepo):

```
docker-compose.yml
```

---

## ⚙️ 2. `.env`

```env
DATABASE_URL=postgresql://ulisesdb:ulises123@db:5432/nestdb
JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d
```

---

## 🐘 3. `docker-compose.yml`

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
      context: ./backend
      dockerfile: Dockerfile
    restart: unless-stopped
    env_file:
      - ./backend/.env
    ports:
      - "3000:3000"
    depends_on:
      - db
    volumes:
      - ./backend:/app

volumes:
  pgdata:
```

---

## 🐳 4. `Dockerfile` (sin migrar automáticamente)

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json tsconfig*.json ./
COPY prisma ./prisma

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
```

---

## 🚀 5. Levantar los contenedores

```bash
docker compose up -d --build
```

---

## 🧪 6. Ejecutar migraciones Prisma dentro del contenedor

```bash
# Entra al contenedor
docker compose exec backend sh

# Dentro del contenedor
npx prisma migrate dev --name init
exit
```

> Esto ejecuta la migración y genera el Prisma Client.

---

## ✅ 7. Verifica que esté corriendo

```bash
docker compose logs -f backend
```

---

### 🔁 Alternativa: migrar automáticamente en Dockerfile

Si no quieres entrar al contenedor manualmente, puedes usar este `CMD` en el Dockerfile:

```Dockerfile
CMD npx prisma generate && npx prisma migrate dev --name init && npm run start:dev
```

Pero ten en cuenta que `migrate dev` solo se debe ejecutar una vez. Lo recomendable es **hacer migraciones a mano**, y solo hacer `generate` automático si lo deseas.

---

Sí, las migraciones con Prisma debes hacerlas manualmente (no se ejecutan solas). Aquí van los pasos claros y directos:

---

### 🧱 **1. Modifica tu archivo `prisma/schema.prisma`**

Agrega o cambia modelos, por ejemplo:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

---

### 🧪 **2. Crea la migración**

Desde la raíz de tu proyecto:

```bash
npx prisma migrate dev --name nombre_de_la_migracion
```

Ejemplo:

```bash
npx prisma migrate dev --name create-user-model
```

Esto hará:

* Crear una carpeta en `prisma/migrations/`.
* Aplicar los cambios a la base de datos.
* Regenerar Prisma Client automáticamente.

---

### 🔍 **3. Verifica si la tabla se creó**

Puedes entrar al contenedor de la base de datos con `psql` o usar un cliente como TablePlus o DBeaver para ver las tablas.

---

### ✅ **4. Usar Prisma Client**

En tu código puedes usar Prisma para consultar la nueva tabla:

```ts
const users = await prisma.user.findMany();
```

---

¿Quieres que las migraciones se apliquen automáticamente dentro del contenedor? También se puede hacer.


--------------------------------------------------
[[doker ejemplo programar desde el contenedor ]]
