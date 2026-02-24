# CSS - Selector de Hermanos Generales (`~`)

## Definición

El **selector de hermanos generales** selecciona **todos los elementos que son hermanos posteriores** de un elemento específico, **no solo el inmediato**.

**Sintaxis:**

```css
elemento1 ~ elemento2 {
  /* estilos */
}
```

- Afecta **todos los hermanos posteriores** del mismo nivel.
- Muy útil cuando quieres estilizar varios elementos que siguen a otro sin cambiar el primero.

---

## Ejemplo en React (JSX + CSS)

**App.jsx**

```jsx
import "./App.css";

function App() {
  return (
    <div className="contenedor">
      <p>Primer párrafo</p>
      <p>Segundo párrafo</p>
      <p>Tercer párrafo</p>
      <p>Cuarto párrafo</p>
    </div>
  );
}

export default App;
```

**App.css**

```css
/* Selector de hermanos generales: todos los p después del primero */
p:first-child ~ p {
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
- Segundo, tercer y cuarto `<p>` → rojo y cursiva ✅
- Todos los hermanos posteriores al primer `<p>` fueron afectados.

---

## Notas importantes

- Se usa el símbolo `~` entre el **elemento de referencia** y los **hermanos posteriores**.
- A diferencia del **selector adyacente (`+`)**, afecta **todos los hermanos posteriores**, no solo el inmediato.
- Útil para aplicar estilos de forma masiva a elementos que siguen a otro sin alterar el primero.

---
