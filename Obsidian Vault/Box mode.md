# 📝 Box Model CSS (detallado por capas)

El **Box Model** describe cómo se construye visualmente cada elemento HTML.  
Se compone de 4 capas principales: **Content, Padding, Border, Margin**.  
Además incluye configuraciones extra como **dimensiones mínimas/máximas** y **box-sizing**.

---

## 1. 🟢 Content (Contenido)

- Es el área donde se dibuja el **texto, imágenes u otros elementos**.
    
- Su tamaño se define con:
    
    - `width` → ancho del contenido.
    - `height` → alto del contenido.

- Por defecto **NO incluye** padding ni border (salvo que uses `box-sizing: border-box`).
    

### Propiedades relacionadas

```css
width: 200px;
height: 150px;
min-width: 100px;   /* mínimo permitido */
max-width: 500px;   /* máximo permitido */
```

---

## 2. 🔵 Padding (Relleno)

- Espacio **interno** entre el contenido y el borde.
- Agranda la caja hacia dentro, sin separar el elemento de otros.

### Propiedades

```css
padding: 20px;                 /* todos los lados */
padding: 20px 10px;            /* vertical | horizontal */
padding: 20px 30px 10px 5px;   /* top | right | bottom | left */
```

👉 Si usas `box-sizing: content-box`, el padding **se suma al tamaño total**.  
👉 Con `box-sizing: border-box`, queda incluido dentro de `width/height`.

---

## 3. 🟡 Border (Borde)

- Rodea al padding y al contenido.
- Puede tener **grosor, color y estilo**.

### Propiedades

```css
border: 2px solid black;    /* grosor | estilo | color */
border-top: 5px dashed red;
border-right: 10px dotted blue;
border-radius: 15px;        /* bordes redondeados */
```

### Estilos comunes

- `solid` → línea sólida.
- `dashed` → guiones.
- `dotted` → punteado.
- `double` → doble línea.
- `none` → sin borde.

---

## 4. 🟠 Margin (Margen)

- Espacio **externo** entre el elemento y otros elementos.
- A diferencia de padding, **no pinta nada**, solo separa.

### Propiedades

```css
margin: 20px;                   /* todos los lados */
margin: 10px 30px;              /* vertical | horizontal */
margin: 10px 20px 30px 40px;    /* top | right | bottom | left */
margin: auto;                   /* centra horizontalmente */
```

⚠️ **Colapso de márgenes**:

- Si dos elementos bloque (ej. `h1` y `p`) se tocan verticalmente, sus márgenes se **combinan** en el mayor.

**Cómo evitarlo:**

- Agregar `padding` o `border` al contenedor.
- Usar `overflow: auto;` o `display: flex;`.

---

## 5. ⚙️ Box-sizing

- Controla si `width` y `height` incluyen padding y border.
    

```css
/* por defecto */
box-sizing: content-box;  /* width/height = solo contenido */

/* recomendado */
box-sizing: border-box;   /* width/height = contenido + padding + border */
```

👉 Muy usado para maquetar porque mantiene el tamaño total estable.

---

## 6. 🖼️ Visualización del Box Model

```
┌───────────────────────────┐
│         Margin            │  (espacio externo)
├───────────────────────────┤
│         Border            │  (línea visible)
├───────────────────────────┤
│         Padding           │  (espacio interno)
├───────────────────────────┤
│         Content           │  (texto, imagen, hijos)
└───────────────────────────┘
```


![[Pasted image 20250907123925.png]]

---

✅ **Resumen rápido para recordar**

- **Content** → lo que se ve (texto, imagen).
- **Padding** → espacio dentro.
- **Border** → contorno visible.
- **Margin** → espacio fuera.
- **Box-sizing** → define si los tamaños incluyen border/padding.


---
¡Muy buena! 👌  
En HTML/CSS los elementos se dividen principalmente en **dos tipos** (hay más matices, pero estos son los básicos):

---

## 1. 🟦 Elementos de **bloque** (`block`)

- Ocupan **todo el ancho disponible** (aunque su contenido sea pequeño).
    
- Siempre comienzan en una **nueva línea**.
    
- Se pueden aplicar propiedades del **Box Model** completas: `width`, `height`, `margin`, `padding`, `border`.
    
- Ejemplos:
    

```html
<div>Div</div>
<p>Párrafo</p>
<h1>Encabezado</h1>
<section>Sección</section>
<article>Artículo</article>
```

🔎 En CSS:

```css
display: block;
```

---

## 2. 🟨 Elementos **en línea** (`inline`)

- Solo ocupan el **ancho de su contenido**.
    
- **NO** comienzan en nueva línea, se colocan junto al texto o elementos vecinos.
    
- **NO** aceptan `width` ni `height` directamente (pero sí `margin` horizontal y `padding`).
    
- Ejemplos:
    

```html
<span>Texto resaltado</span>
<a href="#">Enlace</a>
<strong>Negrita</strong>
<em>Cursiva</em>
```

🔎 En CSS:

```css
display: inline;
```

---

## 3. 🟩 Mixtos: **inline-block**

- Se comportan como texto (están en la misma línea) **pero** permiten aplicar `width`, `height`, `margin`, `padding`.
    
- Muy usados para botones, inputs, etc.
    

Ejemplo:

```css
button {
  display: inline-block;
}
```

---

📌 Resumen rápido para tus apuntes:

- **Block** → ocupa toda la línea (ej. `<div>`, `<p>`).
    
- **Inline** → ocupa solo su contenido (ej. `<span>`, `<a>`).
    
- **Inline-block** → mezcla lo mejor de ambos.
    


---

# 🗂️ Card de Precios (HTML + CSS)

## 📦 Estructura General

```jsx
<article className="precios">
  <div className="textos">
    <h2 className="informacion">Agency</h2>

    <p className="precio">
      <span className="precio-grande">$199.99</span>
      per year
    </p>
    <p className="texto">
      Up to 15 social networks and 50 automations
    </p>
  </div>

  <div className="fondo">
    <a href="#" className="boton">Get Started</a>
  </div>
</article>
```

---

## 🔹 Explicación de etiquetas

### `<article class="precios">`

- Contenedor principal de la card.
    
- Se usa `article` porque representa un **bloque independiente de contenido**.
    
- Clase `precios` aplica:
    
    - Ancho fijo (`400px`).
        
    - Borde azul (`royalblue`).
        
    - Bordes redondeados (`border-radius: 10px`).
        
    - Centrado con `margin: auto`.
        

---

### `<div class="textos">`

- Agrupa la **parte superior de la card** (titulo, precio, descripción).
    
- Clase `textos` aplica `padding: 25px` para que el contenido no quede pegado al borde.
    

---

### `<h2 class="informacion">`

- Título de la card → nombre del plan.
    
- `class="informacion"`:
    
    - Texto en mayúsculas (`text-transform: uppercase`).
        
    - Color azul (`royalblue`).
        
    - Tamaño mediano (16px).
        

---

### `<p class="precio">`

- Contiene el **precio del plan**.
    
- Clase `precio`:
    
    - Márgenes arriba y abajo (`10px`).
        
    - Texto gris oscuro (`darkslategray`).
        

📍 Dentro está:

- `<span class="precio-grande">` → hace el precio más grande y en negritas:
    
    - `font-size: 50px`.
        
    - `font-weight: bold`.
        
    - `color: black`.
        

---

### `<p class="texto">`

- Párrafo con información extra (beneficios del plan).
    
- Clase `texto`: color gris (`darkslategray`).
    

---

### `<div class="fondo">`

- Parte inferior de la card.
    
- Clase `fondo` aplica:
    
    - Fondo distinto (`aliceblue`).
        
    - Bordes redondeados solo abajo (`border-radius: 0 0 8px 8px`).
        
    - `padding: 25px`.
        

---

### `<a class="boton">`

- Botón de acción (Call To Action).
    
- Se usa `<a>` porque normalmente lleva a otra página (ejemplo de compra).
    
- Clase `boton` aplica:
    
    - Fondo azul (`royalblue`).
        
    - Texto blanco.
        
    - Bordes redondeados (`20px`).
        
    - Se muestra como **bloque** (`display: block`) para que ocupe todo el ancho.
        
    - Texto centrado.
        

---

## 🔹 Jerarquía de la Card

```
Article (card precios)
│
├── Div textos
│   ├── H2 (título: Agency)
│   ├── P (precio con span)
│   └── P (descripción)
│
└── Div fondo
    └── A (botón "Get Started")
```

---

## 🔹 Visual por Capas (Box Model)

```
[Margin]
  [Border: azul]
    [Padding interno: 25px]
      [Contenido: titulo, precio, texto]
```

Y en la parte inferior:

```
[Margin]
  [Border: azul]
    [Fondo azul claro]
      [Botón azul redondeado]
```

---

✅ Con esto ya tienes la card documentada a detalle para tus notas de Obsidian.

¿Quieres que además te organice esta nota en un **mapa mental tipo índice** (como una lista con títulos → subtítulos → estilos aplicados)?