# CSS - Selector de atributo que empieza con `[href^="https"]`

## Definición

El selector `[atributo^="valor"]` selecciona **todos los elementos cuyo atributo empieza con un valor específico**.

**Sintaxis:**

```css
elemento[atributo^="inicio"] {
  /* estilos */
}
```

- `^=` significa **“empieza con”**.
- Muy útil para links que empiezan con `https://` o inputs con nombres que siguen un patrón.

---

## Ejemplo práctico en React

**App.jsx**

```jsx
import "./App.css";

function App() {
  return (
    <div className="links">
      <a href="https://google.com">Google</a>
      <a href="https://github.com">GitHub</a>
      <a href="https://youtube.com">YouTube</a>
      <a href="https://instagram.com">Instagram</a>
      <a href="http://example.com">Example 1</a>
      <a href="http://example.com">Example 2</a>
    </div>
  );
}

export default App;
```

**App.css**

```css
/* Todos los links que empiezan con https */
a[href^="https"] {
  font-weight: bold;
  background-color: yellow;
}

/* Estilo general para todos los links */
a {
  background-color: white;
  color: gray;
}
```

---

## Explicación del resultado

- Los links que **empiezan con `https`** → fondo amarillo y texto en negrita ✅  
    (`Google`, `GitHub`, `YouTube`, `Instagram`)
- Los links que **no empiezan con `https`** → fondo blanco y color gris ✅  
    (`Example 1`, `Example 2`)

---

## Notas importantes

- Siempre define primero el **estilo general** y después el más específico para que no se sobreescriba.
- Se puede combinar con **pseudo-clases** como `:hover` para mejorar la interacción visual.
- Útil para diferenciar links seguros (`https`) de otros o para patrones en atributos.

---

