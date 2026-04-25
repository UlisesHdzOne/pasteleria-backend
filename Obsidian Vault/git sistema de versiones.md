En Manjaro (Arch‑based) instalar **Git Flow**:

---

### ⚙️ Vía AUR (recomendado)

1. Instala un ayudante AUR como `yay`:
    
    ```bash
    sudo pacman -S yay
    ```
    
2. Instala `gitflow-avh` desde AUR:
    
    ```bash
    yay -S gitflow-avh
    ```
    

### ✅ Verifica la instalación

```
git flow version
```

Debería mostrar algo como:

```
git flow version 1.12.x (AVH Edition)
```

---


Perfecto. Ahora sigue estos pasos en tu proyecto:

---

### 1. Inicia Git Flow dentro del repo:

```
git flow init
```

Presiona Enter en cada pregunta para aceptar los nombres por defecto:

- `Branch name for production releases`: `main`
    
- `Branch name for "next release" development`: `develop`
    
- Prefijos: `feature/`, `bugfix/`, etc.
    

---

### 2. Crea la rama `develop` (si no existe aún):

```bash
git checkout -b develop
git push -u origin develop
```

---
Estás en la rama `develop`, que es la correcta para empezar a trabajar nuevas funcionalidades con git flow.

Para crear una rama feature, por ejemplo para “login”, usa:

```bash
git flow feature start login
```

Cuando termines la feature, la cierras con:

```bash
git flow feature finish login
```

Esto la fusiona a `develop`.

----

Claro, aquí un resumen con ejemplos para cada prefijo de git flow:

- **feature/**: para nuevas funcionalidades o mejoras.  
    Ejemplo: `feature/login` — crear login nuevo.
    
- **bugfix/**: para arreglar bugs detectados durante desarrollo (antes de release).  
    Ejemplo: `bugfix/fix-navbar` — corregir error en la barra de navegación.
    
- **release/**: preparar versión para producción, pruebas finales, arreglos menores.  
    Ejemplo: `release/v1.2.0` — preparar la versión 1.2.0.
    
- **hotfix/**: para arreglos urgentes en producción.  
    Ejemplo: `hotfix/fix-login-crash` — corregir fallo crítico en login ya en producción.
    
- **support/**: ramas para mantenimiento a versiones antiguas si es necesario.  
    Ejemplo: `support/v1.0` — soporte para la versión 1.0 antigua.
    

---
ejemplos prácticos para cada prefijo de git flow:

- **feature/**  
    Para agregar una nueva funcionalidad.  
    `git flow feature start login-system`  
    Luego trabajas y cuando termines:  
    `git flow feature finish login-system`
    
- **bugfix/**  
    Para corregir un error detectado durante el desarrollo.  
    `git flow bugfix start fix-login-error`  
    Al terminar:  
    `git flow bugfix finish fix-login-error`
    
- **release/**  
    Para preparar una versión antes de pasar a producción.  
    `git flow release start 1.0.0`  
    Haces ajustes finales y pruebas, luego:  
    `git flow release finish 1.0.0`
    
- **hotfix/**  
    Para arreglos urgentes en producción.  
    `git flow hotfix start fix-critical-bug`  
    Arreglas, pruebas y luego:  
    `git flow hotfix finish fix-critical-bug`
    
- **support/**  
    Para soporte o mantenimiento en versiones antiguas.  
    `git flow support start legacy-fix`  
    Trabajas y terminas con:  
    `git flow support finish legacy-fix`

-----


1. Crear la rama feature para la configuración JWT

```
git flow feature start jwt-config
```

2. Haces los cambios en el código para usar variables de entorno en JwtModule
  Por ejemplo, en auth.module.ts:
```
#JwtModule.register({
  secret: process.env.JWT_SECRET,
 signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
 })
```

3. Agregar y commitear cambios
```
git add .
git commit -m "configurar JwtModule con variables de entorno para secret y expiración"
```

4. Terminar la feature (merge a develop)  este no hacer 
```
git flow feature finish jwt-config
```

 Subir develop con los cambios

```
git push origin develop
```

---
esto es lo correcto
git add .

git commit -m "feat(auth): configurar JwtModule con variables de entorno y fix tsconfig.json en Docker"

git push --set-upstream origin feature/jwt-config
se sube a la rama de feature/jwt-config  cuando se aplica el git push

luego hacemos el pull request desde git la pagina web sale un boton verde
Sí, después de mergear en `main`, vuelve a `develop` con:

```bash
git checkout develop
git pull origin develop   // para checar si la rama esta actualizada
```

Y desde `develop` empiezas tu siguiente feature o tarea.

----

Para verificar ramas remotas:

```bash
git branch -r
```

Si no ves `origin/develop`, entonces debes crearla o trabajar solo con `main`.

Si quieres crear `develop` en remoto basado en local:

```bash
git push -u origin develop
```

Si no usas `develop`, puedes seguir trabajando en `main`.

----
Resumen rápido:

1. Actualizaste tu rama `main` local con `git pull origin main` para tener los últimos cambios remotos.
    
2. Cambiaste a `develop` con `git checkout develop`.
    
3. Reseteaste `develop` a `main` con `git reset --hard main` para igualar el contenido.
    
4. Forzaste el push de `develop` remoto con `git push origin develop --force` para que también quede igual que `main`.
    

---

Prompt para reutilizar esta solución:

```bash
# Actualizar rama principal local
git checkout main
git pull origin main
$
# Sincronizar develop con main localmente
git checkout develop
git reset --hard main

# Actualizar develop remoto para que coincida con main
git push origin develop --force
```


----
Exacto, si usas Git Flow, el flujo básico para una nueva feature sería: esto es lo mas correcto ok checa ojo

1. Actualiza tu rama develop local:

```bash
git checkout develop
git pull origin develop
```

2. Inicia la feature:

```
git flow feature start nombre-feature
```

3. Trabaja, commit y push a la rama remota feature:

```bash
git add .
git commit -m "feat: descripción corta"
git push --set-upstream origin feature/nombre-feature
```

4. Cuando termines, terminas la feature y haces merge a develop:

```
git flow feature finish nombre-feature
git push origin develop
```

5. Luego haces un Pull Request de develop a main para producción.

Este es el flujo típico con Git Flow. ¿Quieres que te ayude con comandos o configurarlo?

-------------------------
Usa este comando para eliminar una rama local:
git branch -d nombre-de-la-rama
