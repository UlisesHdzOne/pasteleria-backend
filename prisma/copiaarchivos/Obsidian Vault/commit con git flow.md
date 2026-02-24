
crea ramas
```
git flow feature start nombre-feature
```

Solo un detalle: en vez de `-m` doble, podrías usar un editor (por convención), o mejor sintaxis multi-línea así:

```bash
git commit -m "feat(prisma): integra Prisma con NestJS y crea modelo User" \
  -m "✅ Setup inicial del proyecto con NestJS

- Creación del proyecto con nest new
- Inicialización de Git y Git Flow
- Configuración de Docker + PostgreSQL

✅ Configuración de Prisma

- Instalación de Prisma CLI y @prisma/client
- Archivo schema.prisma con modelo User
- Migración ejecutada
- Integración de Prisma con NestJS:
  - PrismaModule
  - PrismaService
  - Registro global en AppModule"
```

