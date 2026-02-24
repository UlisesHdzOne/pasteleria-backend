### 📌 `push` y `pop`

- **`push`** agrega uno o más elementos al **final** del array.
    
- **`pop`** elimina el **último elemento** del array y lo devuelve.
    

```tsx
import "./App.css";

function App() {
  let frutas: string[] = ["manzana", "pera", "naranja"];

  // Agregamos una fruta al final
  frutas.push("kiwi"); // ["manzana", "pera", "naranja", "kiwi"]

  // Eliminamos la última fruta
  let ultimaFruta = frutas.pop(); // ["manzana", "pera", "naranja"]

  return (
    <>
      <div>
        <h1>Frutas: {frutas.join(", ")}</h1>
        <h2>Última fruta eliminada: {ultimaFruta}</h2>
      </div>
    </>
  );
}

export default App;
```

---

💡 Observaciones:

- `frutas.push("kiwi")` **modifica** el array original.
    
- `frutas.pop()` devuelve la fruta que eliminó, así que podemos usarla si queremos.
    
- TypeScript te obliga a que los tipos coincidan (`string` en este caso).
    

---
```jsx
import "./App.css";
function App() {

let numeroArrar: number[] = [1, 2, 3, 4, 5, 6, 7];
numeroArrar.push(8);
console.log(numeroArrar.pop());
console.log(numeroArrar);
return (
<>
<h1>{numeroArrar.join(",")}</h1>
</>
);
}
export default App;
```