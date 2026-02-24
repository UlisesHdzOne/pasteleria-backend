
📌 Ahora, un tip importante:  
En React y proyectos modernos, **las clases (`className`) se usan casi siempre**.  
Los IDs solo se usan cuando quieres algo **único e irrepetible** en la página (ej: un ancla o un único bloque especial).


---

# CSS Selectores – Apuntes

## 1️⃣ Selector por etiqueta (tag)

- Selecciona **todos los elementos de un tipo**.
    
- Sintaxis: `etiqueta { propiedades }`
    

**Ejemplo en React:**

```tsx
<p>Hola</p>
<p>Mundo</p>
```

```css
p {
  color: orange;
}
```

✅ Resultado: Todos los `<p>` → naranja.

---

## 2️⃣ Selector por clase (`.`)

- Se aplica solo a los elementos con una **clase específica**.
    
- Sintaxis: `.nombreClase { propiedades }`
    

**Ejemplo en React:**

```tsx
<p className="resaltado">Texto azul</p>
<p>Otro texto</p>
```

```css
.resaltado {
  color: blue;
  font-weight: bold;
}
```

✅ Solo el `<p>` con `className="resaltado"` → azul y en negrita.

---

## 3️⃣ Selector por ID (`#`)

- Se aplica a **un solo elemento único**.
    
- Sintaxis: `#id { propiedades }`
    

**Ejemplo en React:**

```tsx
<h1 id="especial">Título único</h1>
```

```css
#especial {
  color: green;
}
```

✅ Solo ese `<h1>` → verde.

---

## 4️⃣ Varias clases juntas

- Puedes aplicar **varias clases a un mismo elemento** separadas por espacio.
    
- Cada clase puede definir propiedades distintas.
    
- Orden en CSS importa cuando varias clases afectan la misma propiedad.
    

**Ejemplo en React:**

```tsx
<p className="resaltado aviso advertencia">Prueba</p>
```

```css
.resaltado { color: blue; font-weight: bold; }
.aviso { color: green; }
.advertencia { color: black; background-color: yellow; }
```

✅ Resultado: color negro, negrita, fondo amarillo (última clase que define `color` gana).

---

## 5️⃣ Selector descendiente

- Selecciona **elementos dentro de otro elemento**, sin importar el nivel.
    
- Sintaxis: `contenedor etiqueta { propiedades }`
    

**Ejemplo en React:**

```tsx
<div className="contenedor">
  <p>Dentro del div</p>
</div>
<p>Fuera del div</p>
```

```css
.contenedor p {
  color: red;
}
```

✅ Solo los `<p>` dentro del div → rojo.

---

## 6️⃣ Pseudo-clases básicas

- Son estilos que dependen del **estado o posición** del elemento.
    
- Algunos ejemplos esenciales:
    

```css
li:first-child { color: red; }     /* primer hijo */
li:last-child { color: blue; }     /* último hijo */
button:hover { background-color: yellow; } /* cuando pasas el cursor */
li:not(.importante) { color: green; } /* todos menos los de clase importante */
```

---

Estos son los **selectores más usados en CSS moderno**, especialmente útiles en React.

Si quieres, podemos hacer **otro apunte visual con todos los combinadores y pseudo-clases juntos**, así los tendrás todos en un solo lugar para Obsidian.

¿Quieres que haga ese resumen completo también?


---

# CSS Combinadores – Apuntes

## 1️⃣ Descendiente (espacio)

- Selecciona **todos los elementos dentro de otro**, sin importar cuántos niveles haya.
    
- Sintaxis: `contenedor etiqueta`
    

**Ejemplo en React:**

```tsx
<div className="contenedor">
  <p>Primer párrafo</p>
  <p>Segundo párrafo</p>
</div>
<p>Fuera del div</p>
```

```css
.contenedor p {
  color: red;
}
```

✅ Resultado: Solo los `<p>` dentro del div → rojo.

---

## 2️⃣ Hijo directo (`>`)

- Selecciona **solo los hijos inmediatos** de un elemento.
    
- Sintaxis: `contenedor > etiqueta`
    

**Ejemplo en React:**

```tsx
<div className="contenedor">
  <p>Hijo directo</p>
  <div>
    <p>Nieto, no se afecta</p>
  </div>
</div>
```

```css
.contenedor > p {
  color: blue;
}
```

✅ Resultado: Solo el `<p>` hijo directo → azul.

---

## 3️⃣ Adyacente (`+`)

- Selecciona **el siguiente hermano inmediato** de un elemento.
    
- Sintaxis: `elemento + hermano`
    

**Ejemplo en React:**

```tsx
<h1>Título</h1>
<p>Párrafo inmediato</p>
<p>Otro párrafo</p>
```

```css
h1 + p {
  color: green;
}
```

✅ Resultado: Solo el primer `<p>` después del `<h1>` → verde.

---

## 4️⃣ Hermano general (`~`)

- Selecciona **todos los hermanos que vienen después** de un elemento.
    
- Sintaxis: `elemento ~ hermano`
    

**Ejemplo en React:**

```tsx
<h1>Título</h1>
<p>Párrafo 1</p>
<p>Párrafo 2</p>
<p>Párrafo 3</p>
```

```css
h1 ~ p {
  color: purple;
}
```

✅ Resultado: Todos los `<p>` que vienen después del `<h1>` → púrpura.

---

¡Claro, Ulises! ✍️ Aquí tienes los **apuntes resumidos de pseudo-clases y pseudo-elementos** con ejemplos en React, listos para Obsidian:

---

# CSS Pseudo-clases y Pseudo-elementos – Apuntes

## 1️⃣ Pseudo-clases básicas

### a) `:first-child`

- Selecciona **el primer hijo** de un contenedor.
    

```tsx
<ul>
  <li>Elemento 1</li>
  <li>Elemento 2</li>
</ul>
```

```css
li:first-child {
  color: red;
  font-weight: bold;
}
```

✅ Solo el primer `<li>` → rojo y negrita.

---

### b) `:last-child`

- Selecciona **el último hijo** de un contenedor.
    

```tsx
<ul>
  <li>Elemento A</li>
  <li>Elemento B</li>
  <li>Elemento C</li>
</ul>
```

```css
li:last-child {
  color: blue;
  font-style: italic;
}
```

✅ Solo el último `<li>` → azul y cursiva.

---

### c) `:hover`

- Aplica estilo cuando el **cursor pasa sobre un elemento**.
    

```tsx
<button>Hazme hover</button>
```

```css
button:hover {
  background-color: yellow;
  color: black;
  font-weight: bold;
}
```

✅ Resultado: fondo amarillo, texto negro y negrita al pasar el cursor.

---

### d) `:not()`

- Selecciona **todos los elementos que no cumplan cierta condición**.
    

```tsx
<ul>
  <li className="importante">Elemento importante</li>
  <li>Elemento normal 1</li>
  <li>Elemento normal 2</li>
</ul>
```

```css
li:not(.importante) {
  color: green;
  font-style: italic;
}
```

✅ Solo los `<li>` que **no tengan la clase `importante`** → verde y cursiva.

---

## 2️⃣ Pseudo-elementos

### a) `::before`

- Agrega contenido **antes del elemento**.
    

```tsx
<p>Aprendiendo React</p>
```

```css
p::before {
  content: "💡 ";
}
```

✅ Resultado: 💡 Aprendiendo React

---

### b) `::after`

- Agrega contenido **después del elemento**.
    

```tsx
<p>Aprendiendo React</p>
```

```css
p::after {
  content: " ✔";
}
```

✅ Resultado: Aprendiendo React ✔

---

### c) Combinando `::before` y `::after`

```css
p::before {
  content: "💡 ";
}
p::after {
  content: " ✔";
}
```

✅ Resultado: 💡 Aprendiendo React ✔

---

### d) Combinando pseudo-clase `:hover` con pseudo-elementos

```tsx
<p className="decorado">Aprendiendo React</p>
```

```css
.decorado {
  color: black;
  padding: 5px;
  border: 1px solid gray;
  display: inline-block;
}
.decorado::before {
  content: "💡 ";
}
.decorado::after {
  content: " ✔";
}
.decorado:hover {
  background-color: yellow;
  color: blue;
  font-weight: bold;
}
```

✅ Resultado:

- Normal: 💡 Aprendiendo React ✔
    
- Al pasar el cursor: fondo amarillo, texto azul y negrita
    

---
¡Claro, Ulises! 🔹 Te hago un **apunte detallado para Obsidian** con las propiedades CSS más útiles organizadas por tipo de elemento y propósito, para que lo tengas como referencia rápida mientras trabajas en React.

---

# CSS – Lista de propiedades útiles por tipo de elemento

## 1️⃣ Texto y tipografía

|Propiedad|Descripción|Elementos comunes|
|---|---|---|
|`color`|Color del texto|`p`, `h1-h6`, `li`, `button`, `span`|
|`font-size`|Tamaño de la fuente|Todos los textos|
|`font-weight`|Grosor de la fuente (`normal`, `bold`, `100-900`)|Todos los textos|
|`font-style`|Estilo de la fuente (`normal`, `italic`)|Todos los textos|
|`text-transform`|Cambia mayúsculas/minúsculas (`uppercase`, `lowercase`, `capitalize`)|Todos los textos|
|`text-decoration`|Subrayado, tachado, etc. (`none`, `underline`, `line-through`)|`a`, `p`, `h1-h6`|
|`text-align`|Alineación horizontal (`left`, `center`, `right`)|`p`, `h1-h6`, `div`|
|`line-height`|Altura de línea (espaciado vertical entre líneas)|Todos los textos|
|`letter-spacing`|Espacio entre letras|Todos los textos|

---

## 2️⃣ Fondos y bordes

|Propiedad|Descripción|Elementos comunes|
|---|---|---|
|`background-color`|Color de fondo|`div`, `p`, `button`, `li`|
|`background-image`|Imagen de fondo|`div`, `section`|
|`border`|Borde completo (`width style color`)|`div`, `button`, `p`|
|`border-radius`|Esquinas redondeadas|`div`, `button`, `img`|
|`box-shadow`|Sombra de caja|`div`, `button`, `p`|

---

## 3️⃣ Dimensiones y espaciado

| Propiedad                 | Descripción                               | Elementos comunes                    |
| ------------------------- | ----------------------------------------- | ------------------------------------ |
| `width` / `height`        | Ancho y alto                              | Todos los elementos bloque y botones |
| `max-width` / `min-width` | Tamaño máximo/mínimo                      | `div`, `img`, `button`               |
| `padding`                 | Espacio interno (contenido → borde)       | Todos los elementos                  |
| `margin`                  | Espacio externo (borde → otros elementos) | Todos los elementos                  |

---

## 4️⃣ Display y posicionamiento

|Propiedad|Descripción|Elementos comunes|
|---|---|---|
|`display`|Tipo de caja (`block`, `inline`, `inline-block`, `flex`, `grid`)|Todos los elementos|
|`position`|Posición (`static`, `relative`, `absolute`, `fixed`)|Todos los elementos|
|`top`, `left`, `right`, `bottom`|Coordenadas cuando `position` ≠ `static`|Todos los elementos|
|`z-index`|Orden de apilamiento|Todos los elementos con posición|

---

## 5️⃣ Interacción y efectos

|Propiedad|Descripción|Elementos comunes|
|---|---|---|
|`cursor`|Tipo de cursor (`pointer`, `default`)|`button`, `a`, `div`|
|`opacity`|Transparencia (`0` a `1`)|Todos los elementos|
|`transition`|Animaciones suaves de propiedades|Todos los elementos|
|`:hover`|Cambiar estilos al pasar cursor|`button`, `p`, `div`|
|`:first-child`, `:last-child`, `:not()`|Selección condicional|Todos los elementos|
|`::before`, `::after`|Contenido decorativo|Todos los elementos con `content`|

---

## 6️⃣ Listas y elementos especiales

|Propiedad|Descripción|Elementos comunes|
|---|---|---|
|`list-style-type`|Tipo de marcador (`disc`, `circle`, `decimal`)|`ul`, `ol`|
|`list-style-position`|Posición del marcador (`inside`, `outside`)|`ul`, `ol`|
|`list-style-image`|Imagen como marcador|`ul`, `ol`|

---

💡 **Tips de uso en React:**

- Para botones y `div`, combina `background-color`, `padding`, `border-radius` y `cursor:pointer` para hacerlos interactivos.
    
- Para párrafos y títulos, usa `color`, `font-weight`, `font-size`, `::before` y `::after` para decorar sin tocar HTML.
    
- Siempre que uses combinadores o pseudo-clases, revisa **si son hijos directos (`>`) o descendientes ( )**.
    

---

Si quieres, puedo hacer **una versión visual de esta tabla**, donde te muestre **qué propiedades aplican mejor a cada tipo de elemento** (`p`, `h1`, `ul/li`, `button`, `div`) para tenerlo como **cheat sheet rápida** en Obsidian.

¿Quieres que haga esa versión visual?