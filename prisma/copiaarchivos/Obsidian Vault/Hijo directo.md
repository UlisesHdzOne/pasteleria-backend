# CSS - Selector Hijo Directo (`>`)

## Definición

El **selector hijo directo** selecciona solo los **elementos que son hijos inmediatos** de un contenedor.

- Sintaxis:

```css
.padre > hijo {
  /* estilos */
}
```

- Afecta únicamente a los elementos **un nivel por debajo**, no a nietos ni elementos más profundos.

---

## Ejemplo en React (JSX + CSS)

**App.jsx**

```jsx
import "./App.css";

function App() {
  return (
    <div className="contenedor">
      <div className="card">
        <p>Hijo directo</p>
        <div>
          <p>Hijo nieto</p>
        </div>
      </div>
      <p>Hijo hermano</p>
    </div>
  );
}

export default App;
```

**App.css**

```css
/* Selector hijo directo */
.card > p {
  color: red;
  font-weight: bold;
}

/* Todos los p generales */
p {
  color: gray;
}
```

---

## Explicación del resultado

- `<p>` hijo directo de `.card` → rojo y negrita ✅
- `<p>` dentro del div (nieto) → gris, **no afectado** ✅
- `<p>` fuera de `.card` → gris ✅

---

## Notas importantes

- Se usa el símbolo `>` entre el **padre** y el **hijo**.
- Es más **restrictivo** que el selector descendiente (`espacio`), porque **no afecta a nietos**.
- Útil cuando quieres estilizar solo los elementos de **nivel superior** dentro de un contenedor.

---
