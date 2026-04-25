¡Perfecto! Vamos a empezar **de 0**, siguiendo tu orden: **tema → ejemplo → ejercicio → feedback → decidir si seguimos o avanzamos**.

---

## 1️⃣ Tipo básico: `string`

### Ejemplo

```ts
let saludo: string = "Hola mundo";
```

---

## 2️⃣ Tipo básico: `number`

### Ejemplo

```ts
let edad: number = 25;
let temperatura: number = 36.5;
```

- Puede ser un entero (`25`) o decimal (`36.5`).
¡Genial! Vamos con **`boolean`**.

---

## 3️⃣ Tipo básico: `boolean`

### Ejemplo

```ts
let estaActivo: boolean = true;
let tienePermiso: boolean = false;
```

- Solo puede ser `true` o `false`.
    

```jsx
import "./App.css";
function App() {
	let soyEstudiante: boolean = false;
return (
<>
<div>
	<h1>¿Soy estudiante? {soyEstudiante ? "Sí" : "No"}</h1>
</div>
</>
);
}
export default App;
```

```jsx
import "./App.css";
function App() {
 let estaEncendido: boolean = true;
 let tieneInternet: boolean = false;
return (
<>
	<div>
		<h1>
		Encendido:
		{estaEncendido ? "si" : "no"}|Internet :{tieneInternet ? "si" : "no"}
		</h1>
	</div>
</>
);
}
export default App;
```


---

## 4️⃣ Tipos básicos: `null` y `undefined`

### Ejemplo

```ts
let valorNulo: null = null;
let valorIndefinido: undefined = undefined;
```

- `null` significa “ausencia de valor”.
    
- `undefined` significa “valor no definido”.
    
- En TypeScript, puedes usar uniones para permitir que algo sea un tipo o `null`/`undefined`:
    

```ts
let edad: number | null = null;
```

```tsx
import "./App.css";
function App() {
	let valorNulo: null = null;
	let valorIndefinido: undefined = undefined;
return (
	<>
		<div>
			<h1>Valor nulo: {valorNulo ?? "No hay valor"}</h1>
			<h1>Valor indefinido: {valorIndefinido ?? "No definido"}</h1>
		</div>
	</>
	);
}
export default App;
```

---
