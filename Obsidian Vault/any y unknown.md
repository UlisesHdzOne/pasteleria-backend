
## 5️⃣ Tipos básicos: `any` y `unknown`

### Ejemplo

```ts
let valorAny: any = "hola";
valorAny = 42; // ok
valorAny = true; // también ok

let valorUnknown: unknown = "hola";
valorUnknown = 42; // ok
// Para usar valorUnknown, primero hay que verificar su tipo
if (typeof valorUnknown === "string") {
  console.log(valorUnknown.toUpperCase());
}
```

- `any` es **casi como JavaScript puro**, permite cualquier tipo, pero pierde la seguridad de TypeScript.
    
- `unknown` también permite cualquier tipo, pero **obliga a chequear el tipo antes de usarlo**, lo que lo hace más seguro que `any`.
    

```jsx
import "./App.css";
function App() {
	let datoAny: any = "que onda bro";
	datoAny = "hola mundo";
	datoAny = 18;
	let datoUnknown: unknown = "que onda bro dos";
return (
	<>
		<div>
			<h1>{datoAny}</h1>
			<h1>{typeof datoUnknown === "string" ? datoUnknown : "No definido"}</h1>
		</div>
	</>
	);
}
export default App;
```
---

