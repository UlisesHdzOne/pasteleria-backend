
## 🏗 Crear proyecto

```bash
nest new prime-back
````

- Elegir gestor de paquetes: `npm`
    
- Este comando ya crea un repositorio Git por defecto
    

## 🗃 Inicializar Git correctamente

```bash
cd prime-back
git branch -M main
```

## 🌐 Subir a GitHub

1. Crear repositorio vacío en GitHub (sin README)
    
2. Agregar remoto y hacer primer push:
    

```bash
git remote add origin git@github.com:usuario/prime-back.git
git push -u origin main
```

> ✅ Si te pide usuario/contraseña, cambia la URL al formato SSH:
> 
> ```bash
> git remote set-url origin git@github.com:usuario/prime-back.git
> ```

## 🌱 Inicializar Git Flow

```bash
git flow init
```

- Branch principal: `main`
    
- Branch de desarrollo: `develop`
    
- Prefijos por defecto (`feature/`, `release/`, etc.)
    

## ✅ Después de `git flow init`, es buena práctica hacer

```bash
git checkout develop
git push -u origin develop
```

Así subes también tu rama `develop` al remoto.

## ✅ Proyecto listo

Ya puedes iniciar una rama de desarrollo:

```bash
git flow feature start nombre-rama

git flow feature start SEC-001-hash-passwords

```
