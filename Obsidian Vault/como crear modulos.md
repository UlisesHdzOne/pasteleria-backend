```
npx nest g module modules/user
npx nest g service modules/user 
npx nest g controller modules/user
```

```

git add .
git commit -m "feat(user): estructura base del módulo User creada"


```

Orden recomendado para crear el código en este patrón:

1. **Define la entidad (modelo) en `domain/entities`** (opcional si usas Prisma directo).
    
2. **Crea el repositorio** (`infrastructure/repositories`) con métodos para BD.
    
3. **Implementa los casos de uso** (`application/use-cases`) usando el repositorio.
    
4. **Crea el servicio** (`user.service.ts`) que orquesta los casos de uso.
    
5. **Haz el controlador** (`user.controller.ts`) que expone la API y llama al servicio.
    
6. **Configura el módulo** (`user.module.ts`) para importar y proveer todo.
    

Así construyes de adentro hacia afuera, siguiendo la separación de responsabilidades.




Ruta: `src/modules/user/dto/create-user.dto.ts`
Ruta: `src/modules/user/domain/entities/user.entity.ts`


