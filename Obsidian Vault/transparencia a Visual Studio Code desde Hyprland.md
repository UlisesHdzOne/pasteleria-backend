nano ~/.config/hypr/custom/general.conf

decoration {
  blur {
    enabled = true
    size = 1         # Desenfoque moderado para que se note el fondo pero no pierdas claridad
    passes = 1       # 2 pasadas para buen suavizado sin consumir mucho GPU
  }
  active_opacity = 0.90   # Casi opaco al trabajar para buena lectura
  inactive_opacity = 0.90 # Más transparente cuando no está en foco
}


 GNU nano 8.6                            /home/jesus/.config/hypr/custom/general.conf                                       
# Put general config stuff here
# Here's a list of every variable: https://wiki.hyprland.org/Configuring/Variables/

decoration {
  blur {
    enabled = true
    size = 2
    passes = 2
  }
  active_opacity = 0.95
  inactive_opacity = 0.95
}



---
Ok, te dejo los pasos claros para que funcione la **transparencia en Hyprland**:

1. **Editar tu config**  
    Abre el archivo:
    
    ```bash
    nano ~/.config/hypr/custom/general.conf
    ```
    
    Y asegúrate de tener algo así:
    
    ```ini
    decoration {
      active_opacity = 0.9
      inactive_opacity = 0.85
      blur {
        enabled = true
        size = 2
        passes = 2
      }
    }
    ```
    
2. **Guardar cambios en nano**
    
    - `Ctrl + O` → Enter (guardar).
        
    - `Ctrl + X` → salir.
        
3. **Recargar Hyprland** (sin cerrar sesión):
    
    ```bash
    hyprctl reload
    ```
    
4. **Comprobar que aplica**  
    Abre una ventana (ej. terminal) y muévela sobre el fondo.
    
    - Si ves el fondo detrás → transparencia funcionando.
        
    - Si no, revisa que tu **fondo no sea sólido** (usa un wallpaper).
        

👉 Nota: La transparencia depende de tener **un compositor interno activo**, Hyprland ya lo trae, no necesitas `picom` ni nada extra.

¿Quieres que te arme un bloque de config mínimo solo para transparencia (sin blur, sin sombras) para probar si funciona primero?




```



```


device {
    name = compx-2.4g-wireless-receiver
    kb_layout = es
}

device {
    name = compx-2.4g-wireless-receiver-keyboard
    kb_layout = es
}







``


Sí — aquí tienes **un ejemplo exacto y correcto de reglas de transparencia usando la sintaxis oficial actual de Hyprland** (basado en la documentación vigente). Estas reglas solo aplican **opacidad (transparencia)** a las apps que tú quieres, sin afectar todo el sistema. ([Hyprland Wiki](https://wiki.hypr.land/0.49.0/Configuring/Window-Rules?utm_source=chatgpt.com "Window Rules – Hyprland Wiki"))

### 📄 Reglas para poner en

**`~/.config/hypr/custom/rules.conf`** (o en tu dotfile `general.conf` si lo usas allí)

```ini
windowrule = opacity 0.80 override 0.80 override, match:class obsidian
windowrule = opacity 0.80 override 0.80 override, match:class windsurf
windowrule = opacity 0.80 override 0.80 override, match:class org.kde.dolphin
```

✔️ Esto **deja cada app con 80 % de opacidad** (activo e inactivo)  
✔️ `override` hace que no se multiplique con la opacidad global (sino que se _reemplaza_) ([Hyprland Wiki](https://wiki.hypr.land/hyprland-wiki/pages/Configuring/Window-Rules/?utm_source=chatgpt.com "Window Rules | Hyprland Wiki"))  
✔️ Se aplica únicamente a las **clases específicas** que coincidiste con `hyprctl clients` ([Hyprland Wiki](https://wiki.hypr.land/0.49.0/Configuring/Window-Rules?utm_source=chatgpt.com "Window Rules – Hyprland Wiki"))

---

### 🧠 Explicación breve de la sintaxis (oficial)

📌 `windowrule = <efecto>, <condición>`

- `<efecto>` = `opacity 0.80 override 0.80 override` (activa/inactiva)
    
- `<condición>` = `match:class nombreClase` (aplica solo a esa app) ([Hyprland Wiki](https://wiki.hypr.land/hyprland-wiki/pages/Configuring/Window-Rules/?utm_source=chatgpt.com "Window Rules | Hyprland Wiki"))
    

Hyprland procesa las reglas de arriba a abajo y aplica la primera que coincida con la ventana actual. ([Hyprland Wiki](https://wiki.hypr.land/hyprland-wiki/pages/Configuring/Window-Rules/?utm_source=chatgpt.com "Window Rules | Hyprland Wiki"))

---

### 🧩 Detalles importantes

🔹 **Debe haber al menos una condición `match:`** (por ejemplo `match:class`) para que la regla tenga efecto. ([Hyprland Wiki](https://wiki.hypr.land/Configuring/Window-Rules/?utm_source=chatgpt.com "Window Rules – Hyprland Wiki"))  
🔹 El blur solo se verá si hay opacidad < 1 (transparencia real). ([Hyprland Wiki](https://wiki.hypr.land/hyprland-wiki/pages/Configuring/Window-Rules/?utm_source=chatgpt.com "Window Rules | Hyprland Wiki"))  
🔹 Si todo está opaco globalmente (`active_opacity = 1.0`), estas reglas con `override` funcionarán correctamente para las apps listadas. ([Hyprland Wiki](https://wiki.hypr.land/hyprland-wiki/pages/Configuring/Window-Rules/?utm_source=chatgpt.com "Window Rules | Hyprland Wiki"))

---

### ✅ Con esto lograrás:

✔ Transparencia solo en **Obsidian, Windsurf y Dolphin**  
✔ El resto del sistema **no se transparenta**  
✔ Puedes ajustar `0.80` a otro valor menor o mayor según te guste

---

Si quieres, puedo darte una **versión con blur visible solo para esas ventanas también**, usando `blur_ignore_opacity` y mostrando cómo conectarlo con estas reglas. ¿Quieres esa versión?

nueva

nano ~/.config/hypr/conf/windowrules/default.conf
