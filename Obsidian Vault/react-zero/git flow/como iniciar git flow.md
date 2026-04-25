# como iniciar la instalacion de git flow

Primero necesitas **hacer el primer commit**.  
Git Flow requiere al menos un commit en `main`.
## 1️⃣ Cambiarte a `develop`

```
git checkout develop
```

## 2️⃣ Traer los cambios del remoto

```
git fetch origin
git pull origin develop
```

## 3️⃣ Verifica tu estado

```
git status
```

- Si dice “Your branch is up to date with 'origin/develop'”, entonces tu develop local está actualizado.
---

## 1️⃣ Primer commit

```bash
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin https://github.com/UlisesHdzOne/pasteleria-backend.git
git push -u origin main
```

---

## 2️⃣ Instalar git-flow (si no lo tienes)

En Arch:

```bash
sudo pacman -S gitflow-avh
```

Verifica:

```bash
git flow version
```

---

## 3️⃣ Inicializar git flow en el proyecto

Dentro del repo:

```bash
git flow init
```

Déjalo con los valores por defecto:

- main
    
- develop
    
- feature/
    
- release/
    
- hotfix/
    

---

👉 Después de eso ya puedes crear ramas:

```bash
git flow feature start nombre-feature
```

Primero commit → luego init git flow.  
Ese es el orden correcto.


----

# 🔹 Crear nueva feature

```
git flow feature start users-module
```

ejemplos
```
git flow feature start create-new-module-customer
```


``

---

# 🔹 Trabajar en la feature
## 🚀 **PASO 3: EJECUTAR CORRECCIONES AUTOMÁTICAS**

### **3.1 Ejecutar Prettier para formatear todo**
```bash
# Formatear todos los archivos
npx prettier --write "src/**/*.{ts,tsx,js,jsx,css,html}"

# También formatear archivos de configuración
npx prettier --write "*.{js,ts,json,md}"
```

### **3.2 Ejecutar ESLint con auto-fix**
```bash
# Corregir errores automáticamente
npx eslint "src/**/*.{ts,tsx}" --fix

# Verificar que no hay errores
npx eslint "src/**/*.{ts,tsx}" --max-warnings 0
```

### **3.3 Verificar TypeScript**
```bash
# Verificar tipos TypeScript
npx tsc --noEmit

# Si hay errores de tipo, mostrarlos
npx tsc --noEmit 2>&1 | head -20
```
---

npm run format
npm run lint
npm run lint:check
npm run type-check


---


```
Eres un asistente que genera mensajes de commit siguiendo **Conventional Commits**.  
Recibirás solo una línea de commit en formato:  
`tipo(scope): descripción`  
Tu tarea es generar un mensaje de commit listo para usar con `git commit`, cumpliendo lo siguiente:

1. Mantén exactamente el **tipo** y **scope**.
    
2. La **descripción principal** del commit debe estar en **inglés**.
    
3. Agrega entre **2 y 3 bullets** explicando el cambio, pero estos bullets deben estar en **español**.
    
4. Los bullets deben ser **breves, claros y fáciles de entender**; no inventes detalles específicos, solo amplía lo que implica la funcionalidad.
    
5. El commit debe generarse como un **comando completo de git**, usando la opción `-m` para la descripción principal y cada bullet.
    
6. **Ubicación para pegar el comando:**
    
    - Abre tu terminal dentro del proyecto de git
        
    - Asegúrate de haber agregado los cambios (`git add .`)
        
    - Pega el comando generado en la terminal y presiona Enter para crear el commit
        

Ejemplo de formato de salida:

git commit -m "feat(cake-price): implement CRUD operations for cake prices with validation" \  
  -m "- Añade operaciones CRUD para gestionar precios de pasteles" \  
  -m "- Incorpora validaciones para asegurar consistencia en los precios"

Entrada de ejemplo para generar commit:  
`feat(cake-flavor,cake-size,cake-price): enhance services and modules with public methods and proper exports`

entrada que nesesita crear el commit --> 

```


```
# haces tus cambios
git add .
git commit -m "feat(prisma): instalar y configurar Prisma en NestJS
```


(Si haces más cambios → repites add + commit)



---

# 🔹 Subir la feature al remoto (recomendado)

git branch 
para saber en que rama estas

`git push -u origin feature/users-module`
`git push -u origin feature/prisma_install`
`git push -u origin feature/create-new-module-customer`
git push -u origin feature/catalogos
git push -u origin feature/cake-flavor-backend

---

# 🔹 Terminar la feature

`git flow feature finish users-module`
`git flow feature finish prisma_install`
`git flow feature finish create-new-module-customer`
`git flow feature finish copiaarchivos`
git flow feature finish cake-flavor-backend


Esto:

- Hace merge a `develop`
    
- Borra la rama local
    
- Te deja en `develop`
    

---

# 🔹 Subir develop

git push origin develop

---

# 🔹 (Opcional) borrar rama remota

`git push origin --delete feature/users-module`
`git push origin --delete feature/prisma_install`


---

# 🔹 Empezar otra feature
`git checkout develop`
git pull origin develop
`git flow feature start otra-feature`
git flow feature start customer
git flow feature start customer-response
git flow feature start cake-flavor-backend
git flow feature start cake-flavor-backend



---

## 🔥 Resumen mental correcto

start → commit → push feature → finish → push develop → start nueva feature

Eso es Git Flow bien aplicado en un proyecto profesional.

  npx nest g resource cake-flavor  --> para crear un modulo en prisma nest
npx nest g resource modules/customer  --- mejor ya esta modules la carpeta



---


# Instalar knip
npm install -D knip

# Ejecutar
npx knip

# Modo producción (solo código realmente usado)
npx knip --production


-----------------\
Depende del tipo de cambio:

| Situación | Mejor opción | Razón |
|-----------|--------------|-------|
| **Nuevo código de error de Prisma** (ej: P2034 Transaction Conflict) | **A** — Crear handler nuevo | Lógica completamente diferente, merece su propia clase |
| **Más constraints del mismo tipo** (ej: agregar `Product_sku_key` a unique constraints) | **B** — Extender config | Es solo datos, no lógica. Solo agregas al `UNIQUE_CONSTRAINTS` |
| **Nuevo patrón de inferencia** (ej: detectar "username" en mensajes) | **B** — Extender handler existente | Agregas al array `UNIQUE_PATTERNS` o `FIELD_MESSAGES` |

## Regla práctica:

**¿Necesitas modificar un `if` o `switch`?** → Opción A (nuevo handler)  
**¿Solo agregas datos a un objeto/array existente?** → Opción B (extender config)

Ejemplo real: Mañana agregas el modelo `Product` con campo `sku` único.

```typescript
// Opción B - Solo esto, cero código nuevo:
UNIQUE_CONSTRAINTS: {
  Product_sku_key: { field: 'sku', message: 'SKU ya registrado' }
}
```

vs si Prisma lanza un error nuevo de "Deadlock" (P2034):

```typescript
// Opción A - Necesitas lógica nueva:
class DeadlockHandler extends BasePrismaHandler {
  canHandle(code) { return code === 'P2034'; }
  handle(exception, response) {
    return this.buildConflictResponse(response, 'general', 
      'Conflicto de concurrencia, reintenta');
  }
}
```

**Conclusión:** Para constraints únicos y FK ya existentes, siempre **B**. Para nuevos tipos de errores de Prisma, **A**.