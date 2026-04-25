## 🟢 Tema nuevo: `readonly` con tuplas

- Puedes hacer que una **tupla sea inmutable** usando `readonly`.
    
- Esto **impide modificar** sus elementos después de la creación.
    

### Ejemplo:

```ts
let persona: readonly [string, number] = ["Ulises", 28];

// persona[0] = "Ana"; // ❌ Error: no se puede modificar
// persona.push(30);   // ❌ Error: no se pueden agregar elementos
```

- Funciona igual que `readonly` en arrays normales, pero aplicado a tuplas.
    
- Es útil para garantizar que ciertos datos **no se cambien accidentalmente**.
    

### Ejemplo en React:

```tsx
import "./App.css";

function App() {
  const miTupla: readonly [string, number] = ["Ulises", 28];

  return (
    <>
      <h1>Nombre: {miTupla[0]}</h1>
      <h1>Edad: {miTupla[1]}</h1>
    </>
  );
}

export default App;
```

- `miTupla` no se puede modificar: ni cambiar elementos ni agregar nuevos.
    

---
