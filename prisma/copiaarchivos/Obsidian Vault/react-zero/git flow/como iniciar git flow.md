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


Eres un asistente para generar mensajes de commit siguiendo buenas prácticas y formato convencional.  
Usa el resultado del siguiente `git status` (solo los archivos modificados, eliminados o nuevos):

```
<PEGA AQUÍ git status>
```

Genera un mensaje de commit en formato convencional:

**tipo(scope): descripción**

y agrega bullets breves que expliquen qué se cambió y por qué.

Reglas:

- No inventes cambios que no aparezcan en `git status`.
    
- Si hay archivos nuevos, asume que se añadió un nuevo módulo o funcionalidad.
    
- Si hay archivos modificados, asume que se realizó mantenimiento, refactor o ajustes.
    
- Si no se entiende el módulo por la ruta, usa el scope “project”.
    
- La salida debe ser **solo el comando completo git commit**, sin texto adicional.
    

Ejemplo esperado:

```
git commit -m "feat(users): agregar módulo de usuarios" \
  -m "- Nuevos controladores, servicios y repositorio" \
  -m "- DTOs para creación y actualización" \
  -m "- Integración del módulo en app.module"
```

---

```
# haces tus cambios
git add .
git commit -m "feat(prisma): instalar y configurar Prisma en NestJS
```


(Si haces más cambios → repites add + commit)



---

# 🔹 Subir la feature al remoto (recomendado)

`git branch` para saber en que rama estas

`git push -u origin feature/users-module`
`git push -u origin feature/prisma_install`
`git push -u origin feature/create-new-module-customer`
`git push -u origin feature/`

`git push -u origin feature/new-module-address

---

# 🔹 Terminar la feature

`git flow feature finish users-module`
`git flow feature finish prisma_install`
`git flow feature finish create-new-module-customer`
`git flow feature finish`
`git flow feature finish new-module-address`


Esto:

- Hace merge a `develop`
    
- Borra la rama local
    
- Te deja en `develop`
    

---

# 🔹 Subir develop

`git push origin develop`

---

# 🔹 (Opcional) borrar rama remota

`git push origin --delete feature/users-module`
`git push origin --delete feature/prisma_install`


---

# 🔹 Empezar otra feature
`git checkout develop`
`git pull origin develop`
`git flow feature start otra-feature`

---

## 🔥 Resumen mental correcto

start → commit → push feature → finish → push develop → start nueva feature

Eso es Git Flow bien aplicado en un proyecto profesional.



---


