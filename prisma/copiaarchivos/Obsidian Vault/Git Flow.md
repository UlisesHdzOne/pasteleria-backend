---

## 🧠 Guía Rápida: Git + SSH + Git Flow en Manjaro

---
### 🐧 Instalación y configuración inicial

```bash
sudo pacman -S git
```

#### Configura tu identidad:

```
git config --global user.name "UlisesHdzOne"
git config --global user.email "ulisesdejesusk9999@gmail.com"
```

---

## 🔐 Configuración de SSH con GitHub

1. **Generar clave SSH**
    
    ```
    ssh-keygen -t ed25519 -C "ulisesdejesusk9999@gmail.com"
    ```
    
2. **Iniciar el agente y añadir la clave**
    
    ```
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519
    ```
    
3. **Copiar clave pública**
    
    ```
    cat ~/.ssh/id_ed25519.pub
    ```
    
4. **Agregarla en GitHub**  
    Ir a [https://github.com/settings/ssh/new](https://github.com/settings/ssh/new)  
    → Pegar clave pública  
    → Guardar
    
5. **Probar conexión**
    
    ```
    ssh -T git@github.com
    ```
    
    Debería mostrar:  
    `Hi UlisesHdzOne! You've successfully authenticated...`
    

---

### 🌐 Configurar el origen remoto con SSH

```bash
git remote set-url origin git@github.com:UlisesHdzOne/tu-repo.git
```

---

## 🌱 Git Flow (estructura de ramas)

### Instalación (desde AUR con `yay`)

```
yay -S gitflow-avh
```

### Iniciar Git Flow en tu repositorio

```
git flow init
```

Presiona `Enter` en todas las preguntas para aceptar nombres por defecto:

- `main` (producción)
    
- `develop` (desarrollo)
    
- Prefijos: `feature/`, `bugfix/`, etc.
    

---

## 🚧 Flujo de trabajo con Git Flow

### 🧱 Crear y trabajar una `feature`

```bash
git checkout develop
git pull origin develop

git flow feature start nombre-feature

# hacer cambios...
git add .
git commit -m "feat: descripción"

git push --set-upstream origin feature/nombre-feature

este comando lo pide almenos solo una vez para que se conecte al repo
**Solución: cambia la URL remota a usar SSH:**
git remote set-url origin git@github.com:UlisesHdzOne/chickencore.git

```

### Al terminar la feature

1. **Crear Pull Request** de `feature/nombre-feature` → `develop`.

2. Cuando `develop` esté listo para producción, crear Pull Request de `develop` → `main`.

3. Las ramas `feature/*` no se eliminan, quedan disponibles para revisión, seguimiento o nuevos cambios.

Sí, correcto. El orden de los Pull Requests sería así:

1. **Primer Pull Request**
    
    - **base**: `develop`
    - **compare**: `feature/nombre-feature`
    - Objetivo: integrar la feature a la rama de desarrollo.
2. **Segundo Pull Request (cuando esté listo para producción)**
    
    - **base**: `main`
    - **compare**: `develop`
    - Objetivo: desplegar todos los cambios de desarrollo a producción.

✔️ Así mantienes limpio el flujo de trabajo y evitas merges directos a `main`.

al terminar nos movemos de rama con
(1) git checkout develop
y actualizamos la rama 
(2) git pull origin develop

```

---

### 🐞 Otras ramas especiales

|Tipo|Uso|Ejemplo|
|---|---|---|
|`feature/`|Nueva funcionalidad|`feature/login`|
|`bugfix/`|Corrección en desarrollo|`bugfix/fix-navbar`|
|`release/`|Preparar versión para producción|`release/v1.2.0`|
|`hotfix/`|Parche urgente en producción|`hotfix/fix-login-crash`|
|`support/`|Mantenimiento de versiones antiguas|`support/v1.0`|

---

## 🧪 Sincronizar ramas locales y remotas

```bash
git checkout main
git pull origin main

git checkout develop
git reset --hard main
git push origin develop --force
```

---

## 🧼 Eliminar o borrar ramas locales

```bash
git branch -d nombre-de-la-rama
```

para eliminar una rama no fucionada

git branch -D feature/hotfix/reemplazar-mailer-por-nodemailer
 una rama remota
 git push origin --delete nombre-de-la-rama
git push origin --delete cursor/solicitar-feedback-y-sugerencias-de-estructura-1fa0

---

Usaste correctamente esta secuencia para forzar que tu rama local sea igual a la remota:

```bash
git fetch origin
git reset --hard origin/main
git clean -fd
```

### Explicación:

1. `git fetch origin`: descarga los cambios del remoto sin aplicarlos.
    
2. `git reset --hard origin/main`: fuerza que tu rama local sea igual a la del remoto (`main` en este caso), descartando tus commits locales.
    
3. `git clean -fd`: elimina archivos sin seguimiento (`untracked`) y carpetas que no están en el control de versiones.
    

### ⚠️ Nota

Te dio errores por permisos, así que tuviste que ejecutarlo como `jesus`, probablemente con más permisos. Eso resolvió el problema.

Ya no necesitas hacer nada más. Todo quedó limpio y actualizado.v


-------------
cuando hay que limiar despues del pull request 

git clean -fd  # ⚠️ elimina archivos/directorios no rastreados
git pull
