## Uniones (`union types`)

### Ejemplo

```ts
let id: number | string;

id = 101;    // válido
id = "abc";  // también válido
```

- `|` significa “o”, así que la variable puede tener **más de un tipo**.
    

```jsx
import "./App.css";
function App() {
let valor:string | number = 10;
let valor2:string | number = "es un string";
return (
	<> 
    	<div>
			<h1>
			esto es: {valor} |
			esto es: {valor2}
			</h1>
    	</div>
	</>
);
}
export default App;
```
---
