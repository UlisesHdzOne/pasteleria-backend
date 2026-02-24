Perfecto. Vamos a practicar **`filter`** en TypeScript.

### Ejemplo

```ts
let numeros: number[] = [1, 2, 3, 4, 5, 6];
let numerosPares: number[] = numeros.filter(num => num % 2 === 0);

console.log(numerosPares); // [2, 4, 6]
```

- `filter` recibe una función que retorna `true` o `false`.
    
- Solo los elementos que cumplen la condición (`true`) se incluyen en el nuevo array.
    

---
```jsx
import "./App.css";
function App() {

let frutasArrar: string[] = ["manzana", "platano", "uva", "durazcon"];
let frutasLargas: string[] = frutasArrar.filter((fruta) => fruta.length > 5);

return (
	<>
		<div>
			{frutasLargas.map((fruta, i) => (
			<p key={i}>{fruta}</p>
			))}
		</div>
	</>
);
}
export default App;
```