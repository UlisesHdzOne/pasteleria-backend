## 🎨 Pseudo-clases CSS: `:hover`, `:focus`, `:active`

### 📌 ¿Qué son?

Son **estados especiales** de un elemento que cambian su estilo según la interacción del usuario.

---

### 🔹 `:hover`

Se aplica cuando el usuario **pasa el mouse** sobre un elemento.

```css
button:hover {
  background: orange;
}
```

---

### 🔹 `:active`

Se aplica **mientras haces clic** (mantienes presionado).

```css
button:active {
  background: red;
}
```

---

### 🔹 `:focus`

Se aplica cuando un elemento (ej. input) **recibe foco** (click o tabulación).

```css
input:focus {
  border: 2px solid blue;
  background: #eef;
}
```

---

### ✅ Ejemplo en React

```jsx
// App.jsx
import "./App.css";

function App() {
  return (
    <div className="ui">
      <button>Botón 1</button>
      <button>Botón 2</button>
      <input type="text" placeholder="Escribe aquí..." />
    </div>
  );
}

export default App;
```

```css
/* App.css */
button {
  background: lightgray;
  border: 1px solid gray;
  padding: 8px 12px;
  cursor: pointer;
}

button:hover {
  background: orange;
  color: white;
}

button:active {
  background: red;
  color: white;
}

input {
  margin: 10px;
  padding: 6px;
  border: 1px solid gray;
}

input:focus {
  border: 2px solid blue;
  outline: none;
  background: #eef;
}
```

---

