## Tema nuevo: **Literal types**

Un **literal type** permite que una variable solo tenga un **valor exacto**, en lugar de cualquier valor de un tipo.

### Ejemplo

```ts
let estado: "pendiente" | "completo" | "cargando";

estado = "pendiente"; // válido
estado = "completo";  // válido
// estado = "otro";   // ❌ Error: no permitido
```

- Muy útil para estados, props o variables que solo deben tener ciertos valores.
    
- Se puede combinar con **uniones** también.
    

```tsx
import "./App.css";

function App() {
  let carga: "pendiente" | "cargando" | "completo" = "pendiente";

  return (
    <>
      <div>
        <h1>Estado de carga: {carga}</h1>
      </div>
    </>
  );
}

export default App;
```

💡 Tip adicional: si intentas asignar cualquier otro valor fuera de `"bajo" | "medio" | "alto"`, TypeScript te dará un error, lo cual ayuda a evitar errores en tu código.
```jsx
import "./App.css";
function App() {
let nivel: "bajo" | "medio" | "alto" = "medio";
nivel = "alto";``
return (
	<>
		<div>
			<h1>El nivel del juego es: {nivel} </h1>
		</div>
	</>
);
}
export default App;
```
---

