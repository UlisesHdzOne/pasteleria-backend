Primero, **`shift` y `unshift`**:

- `shift()` quita el **primer elemento** del array y lo retorna.
    
- `unshift(valor)` agrega un **nuevo elemento al inicio** del array.
    

Ejemplo rápido:

```ts
let numeros: number[] = [1, 2, 3, 4];

numeros.shift();    // quita el 1 → [2, 3, 4]
numeros.unshift(0); // agrega 0 al inicio → [0, 2, 3, 4]
```

---

💡 **Reto**:

1. Crea un array de números `[10, 20, 30, 40]`.
    
2. Usa `shift()` para eliminar el primer elemento.
    
3. Usa `unshift(5)` para agregar `5` al inicio.
    
4. Muestra el resultado final en un `<h1>` usando `join(",")`.
    

Hazlo y me pasas tu código para darte feedback.


```jsx
import "./App.css";

function App() {
  let numeroArrar: number[] = [10, 20, 30, 40, 50];

  // Eliminar el primer elemento
  let eliminado = numeroArrar.shift(); // elimina 10

  // Agregar un nuevo elemento al inicio
  numeroArrar.unshift(5); // agrega 5 al inicio

  return (
    <>
      <div>
        <h1>Array modificado: {numeroArrar.join(", ")}</h1>
        <h2>Elemento eliminado: {eliminado}</h2>
      </div>
    </>
  );
}

export default App;

```