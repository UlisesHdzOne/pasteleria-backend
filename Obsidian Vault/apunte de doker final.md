primero creamos el proyecto con
```
npm i -g @nestjs/cli
nest new nest-prisma-backend
```

y elejimos npm
```
cd nest-prisma-backend
npm install prisma @prisma/client  (1)
npx prisma init  (2)
```

tambien instalamos
```
npm install @nestjs/config
```
modificamos el prisma/schema.prisma
```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

en el archivo agregamos la credenciales de la base de datos
```
DATABASE_URL="postgresql://postgres:postgres@db:5432/nestdb"
```

Genera cliente Prisma local
```
npx prisma generate
```

Ahora crea el `Dockerfile` limpio
```
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
COPY src ./src
COPY .env ./
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
```

Crea `docker-compose.yml y tambien crea la base de datos
nestdb
```
version: '3.8'

  

services:

db:

image: postgres:15

environment:

POSTGRES_USER: postgres

POSTGRES_PASSWORD: postgres

POSTGRES_DB: nestdb

ports:

- "5434:5432"

volumes:

- pgdata:/var/lib/postgresql/data

  

backend:

build:

context: .

dockerfile: Dockerfile

container_name: nest-prisma-backend

ports:

- "3000:3000"

depends_on:

- db

volumes:

- .:/app

- /app/node_modules

env_file:

- .env

restart: always

stdin_open: true

tty: true

  

volumes:

pgdata:
```

Construye y levanta todo
```
sudo docker compose up --build
```

en el caso que de no crear el contenedor solo levantarlo es
```
sudo docker compose up
```

para reiniciar el contenedor  pero no hay que detener el  compose up 
```
docker restart nest-prisma-backend
```
``
comando para eliminar el contenedor si lo ocupamos
```
docker compose down -v
```

ahora podemos migrar las bases de datos iniciales en el contenedor.
Puedes entrar al contenedor con:
```
docker exec -it <nombre_contenedor> sh
ejemplo:
docker exec -it nest_backend sh
```

luego lo ejecutamos 
```
npx prisma migrate dev --name init
```

por si queremos ver el log del back esto es en la consola local
```
docker logs -f nest-prisma-backend
```

-----
cuando hay que instalar algo en este caso jwt
Instálalo en tu proyecto **directamente**, y si usas Docker, asegúrate de:

1. **Instalarlo localmente** (para desarrollo fuera del contenedor):
    
    ```bash
    npm install @nestjs/jwt @nestjs/passport passport passport-jwt
    npm install -D @types/passport-jwt
    ```
    
2. **Reconstruir el contenedor** para que tenga los paquetes:
    
    ```bash
    docker compose up --build
    docker compose up --build --force-recreate
    ```
    

----
cuando necesitemos insta