## 🔹 Método `reduce` en TypeScript

`reduce` es un método de los arrays que **toma todos los elementos y los “reduce” a un solo valor**. Se usa mucho para **sumas, multiplicaciones, concatenaciones** o cualquier operación que combine elementos.

---

### Sintaxis básica

```ts
array.reduce((acumulador, valorActual) => {
  // retorna el nuevo valor del acumulador
}, valorInicial);
```

- **`acumulador`** → guarda el resultado parcial de la operación.
    
- **`valorActual`** → el elemento del array que se está procesando.
    
- **`valorInicial`** → el valor inicial del acumulador (muy importante).
    

---

### Ejemplo 1: Sumar números

```ts
let numeros: number[] = [1, 2, 3, 4];
let suma = numeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
console.log(suma); // 10
```

**Qué pasa aquí:**

1. Empieza con `acumulador = 0`.
    
2. Suma el primer número: `0 + 1 = 1`.
    
3. Suma el segundo número: `1 + 2 = 3`.
    
valorActual4. Continúa hasta el final → resultado: `10`.
    

---

### Ejemplo 2: Multiplicar todos los elementos

```ts
let numeros = [2, 3, 4];
let producto = numeros.reduce((acumulador, valorActual) => acumulador * valorActual, 1);
console.log(producto); // 24
```

- Aquí el `valorInicial` es `1`, porque si fuera `0`, todo resultado sería 0.
    

---

### Ejemplo 3: Concatenar strings

```ts
let palabras = ["Hola", "Mundo"];
let frase = palabras.reduce((acumulador, palabra) => acumulador + " " + palabra, "");
console.log(frase); // " Hola Mundo"
```

---

```jsx
import "./App.css";
function App() {
	let numeros: number[] = [5, 10, 15, 20];
	let suma: number = numeros.reduce(
	(numero, numeroadd) => numero + numeroadd,0);
	console.log(suma);
return (
	<>
		<div>
			{numeros.map((num, i) => (
			<p key={i}>{num}</p>
			))}
			la suma total es {suma}
		</div>
	</>
);
}
export default App;
```