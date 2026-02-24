Perfecto 🚀  
En tu `hyprland.conf` no se meten directamente los binds, porque ya tienes organizado por _includes_ (usa `source` para cargar archivos separados).

Fíjate en esta parte:

```ini
# Custom
source=custom/keybinds.conf
```

Eso significa que tus **atajos personalizados** van en  
`~/.config/hypr/custom/keybinds.conf`.

---

### 🔧 Pasos:

1. Abre el archivo de keybinds custom:
    
    ```bash
    nano ~/.config/hypr/custom/keybinds.conf
    ```
    
2. Agrega estas líneas al final:
    
    ```ini
    # Subir volumen
    bind=CTRL,UP,exec,amixer set Master 5%+
    
    # Bajar volumen
    bind=CTRL,DOWN,exec,amixer set Master 5%-
    
    # Silenciar / activar sonido
    bind=CTRL,RIGHT,exec,amixer set Master toggle
    ```
    
3. Guarda y recarga Hyprland:
    
    ```bash
    hyprctl reload
    ```
    

---

Con eso ya deberías tener `Ctrl + Flechas` controlando el volumen 🎶.

¿Quieres que además configuremos que te muestre una notificación visual cada vez que cambie el volumen (para confirmarlo en pantalla)?