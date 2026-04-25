### 1. Instala Prisma CLI y genera el archivo base

```bash
npm install prisma --save-dev
npx prisma init
```

Esto crea:

- una carpeta `prisma/` con `schema.prisma
[[migraciones del archivo schema.prisma]]
    
- un archivo `.env`
[[archivo ya configurado]]

 

### 2. Configure dos archivos de docker
[[docker-compose]]
[[Dockerfile]]

### 3. el siguiente comando es para entrar como en la consola dentro del contenedor del back y poder hacer las migraciones de los modelos que agregemos

```bash
docker compose down -v
docker compose up --build
```




### 4.integrar Prisma en Nest con `PrismaModule` y `PrismaService`
