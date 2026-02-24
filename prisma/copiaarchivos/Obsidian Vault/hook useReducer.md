## 🧠 `useReducer` en React

### ¿Qué es?

`useReducer` es un Hook que se usa como alternativa a `useState` cuando:

- El estado es complejo o tiene múltiples subvalores.
    
- Se necesita manejar muchas actualizaciones distintas de estado.
    
- Se quiere centralizar la lógica de actualización en un solo lugar (el reducer).
    

---

### 📦 Sintaxis básica

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- `reducer`: función que recibe el estado actual y una acción, y devuelve el nuevo estado.
    
- `initialState`: valor inicial del estado.
    

---

### ✅ Ventajas sobre `useState`

- Centraliza y organiza mejor la lógica.
    
- Escalable cuando el estado crece.
    
- Más fácil de testear.
    
- Ideal para formularios, carritos, autenticación, etc.
    

---

### 💡 Ejemplo: Formulario con `useReducer`

```tsx
import { useReducer } from "react";

type FormState = {
  nombre: string;
  email: string;
};

type Action =
  | { type: "CAMBIAR_NOMBRE"; payload: string }
  | { type: "CAMBIAR_EMAIL"; payload: string }
  | { type: "REINICIAR" };

const estadoInicial: FormState = {
  nombre: "",
  email: "",
};

function formularioReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "CAMBIAR_NOMBRE":
      return { ...state, nombre: action.payload };
    case "CAMBIAR_EMAIL":
      return { ...state, email: action.payload };
    case "REINICIAR":
      return estadoInicial;
    default:
      return state;
  }
}

export default function FormularioReducer() {
  const [state, dispatch] = useReducer(formularioReducer, estadoInicial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Nombre: ${state.nombre}, Email: ${state.email}`);
    dispatch({ type: "REINICIAR" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={state.nombre}
        onChange={(e) =>
          dispatch({ type: "CAMBIAR_NOMBRE", payload: e.target.value })
        }
      />
      <br />
      <input
        type="email"
        placeholder="Correo"
        value={state.email}
        onChange={(e) =>
          dispatch({ type: "CAMBIAR_EMAIL", payload: e.target.value })
        }
      />
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

---

### 📌 Casos de uso recomendados

- Formularios con muchos campos.
    
- Lógica de múltiples acciones (ej. carrito de compras).
    
- Manejadores de sesión o autenticación.
    
- Reducción de funciones `setState` sueltas.
    