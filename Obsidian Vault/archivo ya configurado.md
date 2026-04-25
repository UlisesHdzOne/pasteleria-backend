```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=primebackdb
DATABASE_URL=postgresql://postgres:postgres@db:5432/primebackdb
```

tema relacionado
[[configuracion de docker en el proyecto]]



```jsx
# ================ ENTORNO ================

NODE_ENV=development

PORT=3000

  

# ================ POSTGRESQL ================

POSTGRES_USER=postgres

POSTGRES_PASSWORD=postgres

POSTGRES_DB=nestdb

DATABASE_URL=postgresql://postgres:postgres@localhost:5433/nestdb?schema=public

#

# ================ PRISMA ================

PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK=1

JWT_SECRET=tu_clave_secreta_super_segura_y_larga_aqui

JWT_EXPIRES_IN=1h

  

FRONTEND_URL=http://localhost:5173
```


```
services:

db:

image: postgres:15-alpine

container_name: postgres_db_dev

ports:

- "5433:5432"

environment:

POSTGRES_USER: ${POSTGRES_USER}

POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}

POSTGRES_DB: ${POSTGRES_DB}

env_file:

- .env

restart: always
```