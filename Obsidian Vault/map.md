### Tema: `map` en TypeScript

`map` nos permite **recorrer un array y transformar sus elementos**.

#### Ejemplo:

```ts
let numeros: number[] = [1, 2, 3, 4];
let multiplicados = numeros.map((num) => num * 2);
console.log(multiplicados); // [2, 4, 6, 8]
```

En React podríamos mostrarlo así:

```tsx
import "./App.css";

function App() {
  let numeros: number[] = [1, 2, 3, 4];
  let multiplicados = numeros.map((num) => num * 2);

  return (
    <>
      <h1>Números originales: {numeros.join(", ")}</h1>
      <h1>Números multiplicados: {multiplicados.join(", ")}</h1>
    </>
  );
}

export default App;
```

---

```jsx
import "./App.css";
function App() {
let frutasArrar: string[] = ["manzana", "platano", "uva"];
let frutasMayusculas: string[] = frutasArrar.map((fruta) =>
fruta.toUpperCase()
);
return (
	<>
		<div>
			{frutasMayusculas.map((fruta, i) => (
			<p key={i}>{fruta}</p>
			))}
		</div>
	</>
);
}

  

export default App;
```