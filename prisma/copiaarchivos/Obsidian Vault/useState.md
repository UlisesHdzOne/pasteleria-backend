## 1️⃣ Qué es `useState`

Sirve para **guardar estado** y **re-renderizar** el componente cuando cambia.

👉 sin estado = React es HTML  
👉 con estado = React es React

---

## 2️⃣ Forma básica (con TypeScript)

```tsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
};

export default Counter;
```

---

## 3️⃣ Qué significa cada parte

- `useState(0)`  
    → valor inicial
    
- `count`  
    → valor actual
    
- `setCount`  
    → función para **cambiar el estado**
    

👉 **Nunca modificas `count` directo**

---

## 4️⃣ Regla mental CLAVE

> Cambias estado → React vuelve a renderizar

Si no usas `setX`, **no pasa nada**.

---
### 👉 Siguiente concepto clave: **Componentes + props + estado aislado**

Ahora haremos esto:

- `App` solo organiza
    
- `Counter` maneja su propio estado
    

### 1️⃣ Crea el componente `Counter`

`src/components/Counter.tsx`

```tsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
};

export default Counter;
```

### 2️⃣ Úsalo en `App.tsx`

```tsx
import "./App.css";
import Header from "./components/Header";
import Counter from "./components/Counter";

function App() {
  return (
    <>
      <Header title="Hola React + TypeScript" />
      <p>Mi primera app</p>
      <Counter />
    </>
  );
}

export default App;
```

### 🧠 Qué acabas de aprender (importante)

- Cada componente **tiene su propio estado**
    
- `App` **no sabe** cómo funciona `Counter`
    
- Esto es **pensar en React correctamente**
    

---
### 👉 Ahora prueba esto (sin copiar a ciegas)

1️⃣ Duplica el contador  
Pon **dos `<Counter />`** en `App`.

2️⃣ Observa:

- Cada uno cuenta **independiente**
    
- Confirma que entiendes **estado aislado**
    

```tsx
<Counter />
<Counter />
```

---
Vamos 👍

👉 **Objetivo:** un solo estado en el padre, compartido por varios componentes.

**Idea clave**

- El estado vive en `App`
    
- Los hijos **reciben datos y funciones por props**
    
- Los hijos **no manejan su propio estado**
    

**App.tsx**

```tsx
import { useState } from "react";
import Counter from "./components/Counter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Counter value={count} onIncrement={() => setCount(count + 1)} />
      <Counter value={count} onIncrement={() => setCount(count + 1)} />
    </>
  );
}

export default App;
```

**Counter.tsx**

```tsx
type CounterProps = {
  value: number;
  onIncrement: () => void;
};

const Counter = ({ value, onIncrement }: CounterProps) => {
  return (
    <>
      <p>{value}</p>
      <button onClick={onIncrement}>+</button>
    </>
  );
};

export default Counter;
```

👉 Ahora **ambos contadores cambian juntos**  
👉 Ya entendiste uno de los conceptos más importantes de React 💥

---
