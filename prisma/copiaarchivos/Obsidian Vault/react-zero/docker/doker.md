hay que cambiar el nombre del contenedor
`container_name: postgres_db_dev-pasteleria`
cambia el puerto o elimina el que esta usando en ocasiones creamos otro contenedor que esta corriendo ahi
```
ports:
- '${POSTGRES_PORT:-5434 este cambia}:5432'
```

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/nestdb-pasteleria?schema=public
```
cambia el 5432 o elimina el que ya corre ahi

```yml
services:

db:

image: postgres:15-alpine

container_name: postgres_db_dev-pasteleria

ports:

- '${POSTGRES_PORT:-5434}:5432'

environment:

POSTGRES_USER: ${POSTGRES_USER:-postgres}

POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-password123}

POSTGRES_DB: ${POSTGRES_DB:-carwash_db}

env_file:

- .env

restart: unless-stopped # ← MEJOR que 'always'

volumes:

- postgres_data:/var/lib/postgresql/data # ← PERSISTENCIA

networks:

- app-network # ← RED AISLADA

healthcheck: # ← HEALTH CHECK

test: ['CMD-SHELL', 'pg_isready -U ${POSTGRES_USER:-postgres}']

interval: 10s

timeout: 5s

retries: 5

start_period: 30s

  

volumes:

postgres_data: # ← VOLUME DEFINIDO

name: pasteleria_postgres_data

  

networks:

app-network: # ← NETWORK DEFINIDO

driver: bridge

name: carwash_network
```


```.env
# ================ ENTORNO ================

NODE_ENV=development

PORT=3000

  

# ================ POSTGRESQL ================

POSTGRES_USER=postgres

POSTGRES_PASSWORD=postgres

POSTGRES_DB=nestdb-pasteleria

POSTGRES_PORT=5434

DATABASE_URL=postgresql://postgres:postgres@localhost:5434/nestdb-pasteleria?schema=public

  

# ================ PRISMA ================

PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK=1

  

# ================ JWT ================

JWT_SECRET=tu_clave_secreta_super_segura_y_larga_aqui

JWT_EXPIRES_IN=1h

JWT_REFRESH_EXPIRES_IN=7d

  

# ================ CORS ================

CORS_ORIGIN=http://localhost:5173,http://localhost:8100 # ← ¡AGREGA ESTA LÍNEA!

  

# ================ APP ================

FRONTEND_URL=http://localhost:8100,http://localhost:5173

SEND_WELCOME_EMAIL=false

SEND_PASSWORD_ON_CREATE=false

PAGINATION_DEFAULT_LIMIT=10

PAGINATION_MAX_LIMIT=100

  

# 📁 .env

# Logging Configuration

LOG_LEVEL=info # error, warn, info, debug

LOG_DB_QUERIES=false # true para desarrollo si quieres ver queries

  

# CATEGORIES CONFIG

CATEGORIES_MAX_PER_PAGE=50

CATEGORIES_MAX_BULK_OPERATION=20

CATEGORIES_RESERVED_WORDS=admin,system,root,test,default,trash,deleted

  

# LOGGING

LOG_LEVEL=debug
```
## 2️⃣ Levanta Docker

```
docker compose down -v
docker compose up -d
```

Verifica:

`docker ps`

Si el contenedor está healthy, vas bien.

## 2️3 Luego prueba:

```
docker exec -it postgres_db_dev-pasteleria psql -U postgres -d nestdb-pasteleria
```