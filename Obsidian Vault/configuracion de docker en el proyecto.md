```yml
version: '3.8'
services:
db:
image: postgres:15
environment:
POSTGRES_USER: ${POSTGRES_USER}
POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
POSTGRES_DB: ${POSTGRES_DB}
ports:
- '5434:5432'
volumes:
- pgdata:/var/lib/postgresql/data
backend:
build:
context: .
dockerfile: Dockerfile
container_name: prime-back
ports:
- '3000:3000'
- '5555:5555'
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


```Dockerfile
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