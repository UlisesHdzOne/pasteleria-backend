# CSS - Selector de Atributo `[type="…"]`

## Definición

Los **selectores de atributo** permiten aplicar estilos a elementos HTML según **el valor de un atributo**.

**Sintaxis básica:**

```css
elemento[atributo="valor"] {
  /* estilos */
}
```

---

## Ejemplo práctico en React

**App.jsx**

```jsx
import "./App.css";

function App() {
  return (
    <div className="formulario">
      <input type="text" placeholder="Nombre" />
      <input type="password" placeholder="Contraseña" />
      <input type="email" placeholder="Correo" />
      <input type="submit" value="Enviar" />
    </div>
  );
}

export default App;
```

**App.css**

```css
/* Estilo general para todos los input */
input {
  margin: 5px;
  padding: 6px;
}

/* Solo input tipo texto */
input[type="text"] {
  border: 2px solid green;
  background-color: yellow;
  font-weight: bold;
}

/* Solo input tipo password */
input[type="password"] {
  border: 2px solid blue;
  background-color: aqua;
  font-style: italic;
}

/* Solo input tipo email */
input[type="email"] {
  border: 2px solid orange;
  background-color: pink;
}

/* Solo input tipo submit */
input[type="submit"] {
  border: 2px solid gray;
  background-color: black;
  color: white;
  border-radius: 5px;
}
```

---

## Explicación del resultado

- `[type="text"]` → aplica estilos solo al input de texto.
- `[type="password"]` → aplica estilos solo al input de contraseña.
- `[type="email"]` → aplica estilos solo al input de correo.
- `[type="submit"]` → aplica estilos solo al botón de enviar.
- Los demás inputs mantienen los estilos generales.

---

## Notas importantes

- Muy útil para **formularios** y elementos dinámicos.
- Permite diferenciar estilos **sin usar clases extra**.
- Puedes combinar con otras propiedades y pseudo-clases (`:focus`, `:hover`) para efectos interactivos.

---
