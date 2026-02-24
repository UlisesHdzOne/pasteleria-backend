# 🧠 CSS CHEAT SHEET — Mental, práctica y comportamiento

---

## 1️⃣ DISPLAY (cómo vive el elemento)

Define **cómo ocupa espacio y se relaciona con otros**

- `display: block`  
    → ocupa **toda la fila**  
    → acepta `width`, `height`, `margin`, `padding`
    
- `display: inline`  
    → ocupa **solo su contenido**  
    → **NO** acepta `width` ni `height`  
    → fluye dentro del texto
    
- `display: inline-block`  
    → ocupa solo su contenido  
    → **SÍ** acepta `width` y `height`
    
- `display: flex`  
    → convierte al elemento en **contenedor flexible**  
    → los hijos se alinean en **fila por defecto**
    

---

## 🔓 FLEX — qué se desbloquea y cómo se comporta

_(solo cuando el padre tiene `display: flex`)_

- `flex-direction`  
    → define **fila(row) o columna(column)**
    
- `justify-content`  
    → distribuye espacio en el **eje principal**
    
- `align-items`  
    → alinea hijos en el **eje secundario**
    
- `gap`  
    → crea **espacio automático** entre hijos
    
- `flex`  
    → controla **cuánto espacio ocupa** cada hijo
    
- `order`  
    → cambia el **orden visual**, no el HTML
    
- `align-self`  
    → un hijo se alinea distinto al resto
    

---

## 2️⃣ BOX MODEL (cómo respira el elemento)

Controla **espacio y tamaño real**

- `margin`  
    → espacio **externo**  
    → separa elementos entre sí
    
- `padding`  
    → espacio **interno**  
    → separa contenido del borde
    
- `border`  
    → rodea al elemento  
    → **sí suma tamaño**
    
- `box-sizing: border-box`  
    → padding y border **NO rompen el tamaño**
    

---

## 3️⃣ TAMAÑOS (qué tan grande es)

- `width`  
    → ancho del elemento
    
- `height`  
    → alto del elemento
    
- `max-width`  
    → límite máximo de ancho
    
- `min-height`  
    → alto mínimo garantizado
    

---

## 4️⃣ TEXTO (solo contenido)

Afecta **únicamente al texto**

- `color`  
    → color del texto
    
- `font-family`  
    → tipo de letra
    
- `font-size`  
    → tamaño del texto
    
- `font-weight`  
    → grosor (normal / bold)
    
- `font-style`  
    → estilo (italic)
    
- `text-align`  
    → alineación horizontal
    
- `text-decoration`  
    → subrayado, tachado, none
    

---

## 5️⃣ IMÁGENES (cómo se muestran)

- `width / height`  
    → tamaño visible
    
- `object-fit: cover`  
    → llena el espacio  
    → **no se deforma**, recorta
    
- `border-radius`  
    → esquinas redondeadas
    

---

## 6️⃣ VISUAL / INTERACCIÓN

Controla **percepción y feedback**

- `background-color`  
    → color de fondo
    
- `border-radius`  
    → suaviza esquinas
    
- `box-shadow`  
    → profundidad visual
    
- `transition`  
    → suaviza cambios
    
- `:hover`  
    → reacción al mouse
    
- `cursor: pointer`  
    → indica interacción
    

---

## 🧩 VALORES POR DEFECTO (clave mental)

- `div`, `section` → `display: block` → **ocupan toda la fila**
    
- `img` → `display: inline` → se comporta como texto
    
- `a` → `display: inline`
    
- `flex` → **fila por defecto**
    

👉 **Nada empieza en columna si no lo cambias**

---

## 🧠 REGLA FINAL

> **Primero cómo vive → luego cómo se acomoda → luego cómo se ve**

Si algo no se mueve:

- no es `flex`
    
- el padre manda
    
- o es `inline`
    


---


Significa **pensar el HTML/CSS en niveles**, no como cosas sueltas.

👉 **Padre → Hijo → Contenido** = **capas**

Breve y directo:

- **Padre**  
    Controla **layout y posición**  
    (display, flex, gap, align, direction)
    
- **Hijo**  
    Se acomoda según el padre  
    (flex, width, crecer, orden)
    
- **Contenido**  
    Solo apariencia  
    (texto, imagen, color, padding)
    

Ejemplo mental (sin código):

- `section` → decide si es fila o columna
    
- `div` dentro → ocupa espacio que el padre permite
    
- `p / img` → solo se ven, no mandan
    

👉 Si algo no se mueve: **mira al padre**, no al hijo.