## Tema nuevo: **Readonly**

`readonly` permite que **una variable, array u objeto no pueda modificarse** después de ser creado.

### Ejemplo 1: Array readonly

```ts
let numeros: readonly number[] = [1, 2, 3];

numeros.push(4); // ❌ Error: no se puede modificar
numeros[0] = 10; // ❌ Error
```

- Útil cuando quieres asegurarte de que un array **no se cambie por accidente**.
    

### Ejemplo 2: Objeto readonly

```ts
type Persona = {
  readonly nombre: string;
  edad: number;
};

let persona: Persona = { nombre: "Ulises", edad: 28 };

persona.nombre = "Ana"; // ❌ Error: readonly
persona.edad = 30;      // ✅ permitido
```

💡 Con esto ya entendemos cómo **`readonly` protege arrays u objetos** de modificaciones accidentales.

```jsx
import "./App.css";
function App() {
let frutasArray: readonly string[] = ["pera", "manzana", "naranja"];
//let lafruta = frutasArray.push("coco"); // no se puede hacer esto
return (
	<>
		<div>
			{/* <h1>{lafruta.join(", ")}</h1> */}
			<h1>{frutasArray.join(", ")}</h1>
		</div>
	</>
);
}
export default App;
```
---

