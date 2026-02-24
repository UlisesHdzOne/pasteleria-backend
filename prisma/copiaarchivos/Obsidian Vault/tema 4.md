Perfecto 💡, vamos con el tema de **pseudo-clases estructurales**:

---

## 🎯 Pseudo-clases: `:first-child`, `:last-child`, `:nth-child()`

### 📌 ¿Qué son?

Se usan para **seleccionar elementos según su posición dentro de su contenedor (padre)**.

---

### 🔹 `:first-child`

Selecciona **el primer hijo** de un padre.

```css
p:first-child {
  color: green;
}
```

---

### 🔹 `:last-child`

Selecciona **el último hijo** de un padre.

```css
p:last-child {
  color: red;
}
```

---

### 🔹 `:nth-child(n)`

Selecciona el hijo en la posición **n** (1 = primero, 2 = segundo, etc.).

```css
p:nth-child(2) {
  color: blue;
}
```

También acepta fórmulas:

- `nth-child(odd)` → hijos impares
    
- `nth-child(even)` → hijos pares
    

---

### ✅ Ejemplo en React

```jsx
// App.jsx
import "./App.css";

function App() {
  return (
    <div className="lista">
      <p>Elemento 1</p>
      <p>Elemento 2</p>
      <p>Elemento 3</p>
      <p>Elemento 4</p>
    </div>
  );
}

export default App;
```

```css
/* App.css */
p:first-child {
  color: green;
  font-weight: bold;
}

p:last-child {
  color: red;
  font-style: italic;
}

p:nth-child(2) {
  color: blue;
  text-decoration: underline;
}

p:nth-child(even) {
  background: #f0f0f0;
}
```

---

