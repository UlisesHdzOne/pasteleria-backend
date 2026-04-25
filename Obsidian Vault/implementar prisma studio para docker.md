hay que configurar el puerto 5555 en el  docker-compose.yml

```yaml
services:
  backend:
    ports:
      - '3000:3000'
      - '5555:5555'
```



el archivo completo queda asi ->[[configuracion de docker en el proyecto]]




entra en el contenerdo de docker

```
docker exec -it prime-back sh
npx prisma studio --port 5555
```

Luego abre en tu navegador:

```
http://localhost:5555
```