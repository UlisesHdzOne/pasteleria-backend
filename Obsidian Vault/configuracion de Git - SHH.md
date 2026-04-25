## 🛠️ Configuración de Git + SSH en Manjaro (GitHub)

### 📍 1. Inicializar repositorio Git

```
git init
```

---

### 📍 2. Configurar nombre de usuario y correo

```
git config --global user.name "UlisesHdzOne"
git config --global user.email "ulisesdejesusk9999@gmail.com"
```

---

### 📍 3. Crear clave SSH (si no existe)

```
ssh-keygen -t ed25519 -C "ulisesdejesusk9999@gmail.com"
```

Presiona `Enter` para aceptar la ruta por defecto.

---

### 📍 4. Iniciar agente SSH y agregar clave

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

---

### 📍 5. Copiar clave pública

```
cat ~/.ssh/id_ed25519.pub
```

Copiar el contenido.  este contenido se pega en el paso 6

---

### 📍 6. Agregar la clave pública a GitHub

- Ir a: [https://github.com/settings/ssh/new](https://github.com/settings/ssh/new)
    
- Título: `manjaro-ulises` (o lo que quieras)
    
- Pegar la clave
    
- Click en "Add SSH Key"
    

---

### 📍 7. Probar conexión SSH

```
ssh -T git@github.com
```

luego ssh -T git@github.com
The authenticity of host 'github.com (140.82.114.3)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])?    yes
Debe mostrar:

```bash
Hi UlisesHdzOne! You've successfully authenticated, but GitHub does not provide shell access
```

---
estos pasos ya van cuando se crea el repositorio por primera vez como esto es un ejemplo como podemos ver los comando mas abajo son los que mencionamos:

![[Pasted image 20250630100049.png]]
### 📍 8. Cambiar el remoto a SSH 
esta es la rama en la cual vas a estar trabajando

```bash
git remote set-url origin git@github.com:UlisesHdzOne/back-gideon.git
```

---

### 📍 9. Primer push
subimos cambio en caso de ya tener un commit
```bash
git push -u origin main
```

