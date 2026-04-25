# CSS - Selectores Combinados: Descendiente

## Definición

El **selector descendiente** permite seleccionar todos los elementos que están **dentro de otro elemento**, sin importar cuántos niveles de profundidad haya.

**Sintaxis:**

```css
.padre elemento-hijo {
  /* estilos */
}
```

---

## Ejemplo en React (JSX + CSS)

**App.jsx**

```jsx
import "./App.css";

function App() {
  return (
    <div className="contenedor">
      <div className="card">
        <h2>Titulo</h2>
        <p>Parrafo 1</p>
        <p>Parrafo 2</p>
      </div>
      <div className="card">
        <h2>Titulo</h2>
        <p>Parrafo 1</p>
        <p>Parrafo 2</p>
      </div>
      <p>Parrafo fuera</p>
    </div>
  );
}

export default App;
```

**App.css**

```css
/* Selector descendiente: todos los p dentro de .card */
.card p {
  color: blue;
  font-style: italic;
}

/* Párrafo fuera de .card */
p {
  color: gray;
}

/* Selector descendiente: h2 dentro de .card */
.card h2 {
  color: red;
}
```

---

## Explicación del resultado

- Todos los `<p>` dentro de `.card` → azul y cursiva.
- Los `<p>` fuera de `.card` → gris normal.
- Los `<h2>` dentro de `.card` → rojo.
- El selector descendiente **no afecta** elementos fuera del contenedor especificado.

---

## Notas importantes

- Se usa un **espacio** entre el padre y el hijo (`.padre hijo`).
- Es **menos restrictivo** que el selector hijo directo (`>`).
- Muy útil cuando quieres aplicar estilos a todos los elementos dentro de un contenedor, sin importar cuántos niveles haya entre ellos.

---
