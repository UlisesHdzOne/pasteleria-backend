# CSS - Selector Adyacente (`+`)

## Definición

El **selector adyacente** selecciona un elemento que **está inmediatamente después** de otro elemento en el mismo nivel del DOM.

**Sintaxis:**

```css
elemento1 + elemento2 {
  /* estilos */
}
```

- Solo selecciona **el primer hermano inmediato**.
- Muy útil cuando quieres aplicar estilos a un elemento **solo si sigue a otro específico**.

---

## Ejemplo en React (JSX + CSS)

**App.jsx**

```jsx
import "./App.css";

function App() {
  return (
    <div className="contenedor">
      <p>Primer párrafo</p>
      <p>Segundo párrafo (adyacente)</p>
      <p>Tercer párrafo</p>
    </div>
  );
}

export default App;
```

**App.css**

```css
/* Selector adyacente: p inmediatamente después de otro p */
p + p {
  color: red;
  font-style: italic;
}

/* Todos los p por defecto */
p {
  color: gray;
}
```

---

## Explicación del resultado

- Primer `<p>` → gris ✅
- Segundo `<p>` (adyacente al primero) → rojo y cursiva ✅
- Tercer `<p>` → gris ✅

---

## Notas importantes

- Solo funciona con **hermanos inmediatos**.
- No afecta a elementos que no están justo después.
- Útil para resaltar un elemento que sigue a otro sin alterar todos los hermanos.

---
