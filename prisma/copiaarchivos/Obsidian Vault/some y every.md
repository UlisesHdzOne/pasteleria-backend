### Tema: `some` y `every` en TypeScript

Estos métodos sirven para **evaluar condiciones sobre los elementos de un array**:

---

#### 1️⃣ `some`

- Devuelve `true` si **al menos un elemento cumple la condición**.
    
- Devuelve `false` si **ninguno cumple**.
    

```ts
let numeros: number[] = [2, 4, 6, 7];

let hayImpar: boolean = numeros.some((num) => num % 2 !== 0);
console.log(hayImpar); // true, porque 7 es impar
```

---

#### 2️⃣ `every`

- Devuelve `true` si **todos los elementos cumplen la condición**.
    
- Devuelve `false` si **al menos uno no cumple**.
    

```ts
let todosPares: boolean = numeros.every((num) => num % 2 === 0);
console.log(todosPares); // false, porque 7 no es par
```

---

💡 Tip: Se usan mucho para validaciones rápidas sobre arrays sin tener que hacer loops manuales.

---

```tsx
import "./App.css";
function App() {

let numeros: number[] = [5, 10, 15, 20];
let hayMayorQueDiez: boolean = numeros.some((numero) => numero > 10);
let todosMenoresQueVeinte: boolean = numeros.every((numero) => numero < 20);

console.log(hayMayorQueDiez);
console.log(todosMenoresQueVeinte);
return (
<>
	{numeros.map((num, i) => (
	<p key={i}>{num}</p>
	))}
			<p>
			{hayMayorQueDiez
			? "Sí hay un número mayor a 10"
			: "No hay números mayores a 10"}
			</p>
			<p>
			{todosMenoresQueVeinte
			? "Todos son menores que 20"
			: "Hay al menos un número que no es menor que 20"}
			</p>
	</>
	);
}
export default App;
```


