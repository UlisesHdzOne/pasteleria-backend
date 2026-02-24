

---

## Configuración Docker para PostgreSQL (NestJS + Prisma)

### Archivo `docker-compose.yml`

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
      - "5434:5432"  # Puerto host:puerto contenedor
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### Variables de entorno `.env`

```env
DATABASE_URL=postgresql://ulisesdb:ulises123@localhost:5434/nestdb
JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d
```

---

### Notas importantes

- El contenedor PostgreSQL expone el puerto 5432, pero en el host lo mapeamos al 5434 para evitar conflictos si tienes otra instancia local.

- `POSTGRES_USER`, `POSTGRES_PASSWORD` y `POSTGRES_DB` deben coincidir con los datos de conexión en `DATABASE_URL`.

- Se usa un volumen Docker `pgdata` para persistir la base de datos.

- El backend (NestJS + Prisma) debe usar la URL de conexión en `.env` para conectarse a la DB.

- Usa `docker compose up -d` para levantar el servicio en segundo plano.

- Si el puerto 5432 ya está ocupado en tu máquina, cambia el puerto de host (como el 5434 en este ejemplo).


docker compose up --build -d



otra confiruracion de docker de el back con la base de datos y prisma

[[dockerizacion  - solo base de datos postgresSQL]]
[[dockerizacion  - backend + base de datos en contenedores]]


[[docker produccion y desarollo back]]
