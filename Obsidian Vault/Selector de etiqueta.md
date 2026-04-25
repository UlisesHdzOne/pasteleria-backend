# CSS en React: Selector de etiqueta

## 1️⃣ Qué es

El **selector de etiqueta** (element selector) permite aplicar estilos **a todos los elementos de un tipo** (como `h1`, `p`, `button`) dentro de tu aplicación.

- En React, el CSS se importa normalmente en el componente:
    

```jsx
import "./App.css";
```

- Se aplica a todas las etiquetas del tipo en la página o dentro del scope donde cargas el CSS.
    

---

## 2️⃣ Sintaxis básica

```css
h1 {
  color: aqua;
  font-size: 40px;
}

p {
  color: gray;
  font-size: 20px;
}

button {
  color: blue;
  background-color: white;
  padding: 0.6rem 1rem;
}
```

- `h1`, `p`, `button` → todos los elementos de ese tipo reciben el estilo.
    
- Estilos globales, no se limitan a un contenedor.
    

---

## 3️⃣ Sobrescribiendo estilos con clases

Para cambiar solo algunos elementos, usamos **clases en contenedores**:

### JSX

```jsx
<section className="warning">
  <p>Este párrafo es especial</p>
  <button>Botón</button>
</section>

<div className="success">
  <p>Otro párrafo especial</p>
</div>
```

### CSS

```css
.warning p {
  color: red;
  font-size: 10px;
}

.warning button {
  color: white;
  background-color: red;
}

.success p {
  color: green;
  font-size: 24px;
}
```

✅ Resultado:

- El `<p>` dentro de `.warning` es rojo y pequeño.
- El `<button>` dentro de `.warning` cambia su color y fondo.
- El `<p>` dentro de `.success` es verde y más grande.
- Todo lo demás mantiene el estilo general.

---

## 4️⃣ Conceptos clave

- **Selector de etiqueta:** afecta a todos los elementos de ese tipo.
- **Clase + etiqueta:** sobrescribe estilos específicos dentro de un contenedor.
- **Especificidad:** reglas más específicas ganan sobre las generales.
- **React:** usar siempre `className` en JSX, no `class`.
- **Buenas prácticas HTML:**
    - Evitar poner `<p>` dentro de `<button>`.
    - Usar contenedores (`section`, `div`) para agrupar elementos que compartan estilos.

---

## 5️⃣ Tipos de sobrescritura

- `.clase { ... }` → afecta todo el contenedor y hereda a hijos si aplicable.
- `.clase etiqueta { ... }` → afecta solo a esa etiqueta dentro del contenedor.

---

## 6️⃣ Mini resumen visual

|Selector|Qué afecta|Ejemplo CSS|
|---|---|---|
|`p`|Todos los párrafos|`p { color: gray; }`|
|`.warning p`|Solo los `<p>` dentro de `.warning`|`.warning p { color: red; }`|
|`.success p`|Solo los `<p>` dentro de `.success`|`.success p { color: green; }`|
|`button`|Todos los botones|`button { background: blue; }`|
|`.warning button`|Botones dentro de `.warning`|`.warning button { background: red; }`|

---
