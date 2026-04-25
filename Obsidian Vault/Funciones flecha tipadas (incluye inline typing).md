## 🔹 Funciones flecha tipadas (incluye inline typing)

En TypeScript puedes tipar parámetros y el valor de retorno también en **funciones flecha** (`=>`).  
Estas son funciones **anónimas** (no llevan la palabra `function`) y se usan mucho en **callbacks** de métodos de array.

---

### Ejemplo 1: función básica

```ts
const sumar = (a: number, b: number): number => {
  return a + b;
};
```

- `(a: number, b: number)` → parámetros tipados.
    
- `: number` → retorno tipado.
    

---

### Ejemplo 2: versión corta (1 sola expresión)

```ts
const multiplicar = (x: number, y: number): number => x * y;
```

Si la función retorna una sola expresión, no hace falta usar `return` ni llaves `{}`.

---

### Ejemplo 3: función flecha como callback (inline typing)

```ts
const numeros = [1, 2, 3, 4];
const cuadrados = numeros.map((n: number): number => n * n);

console.log(cuadrados); // [1, 4, 9, 16]
```

Aquí la función se escribe **inline** dentro del `.map()`.

[[Arrays y tuplas]] tema relacionado a metodos de array

---

### Ejemplo 4: función con retorno booleano

```ts
const esPar = (num: number): boolean => num % 2 === 0;
```

---

### Ejemplo 5: función con parámetro opcional

```ts
const saludo = (nombre?: string): string | undefined => {
  return nombre ? `Hola ${nombre}` : undefined;
};
```

---

📌 **Resumen**:

- Son funciones **anónimas** (no llevan `function`).
    
- Sintaxis más **corta y expresiva**.
    
- Se tipan igual que las funciones normales (`(param: tipo): retorno`).
    
- Muy útiles para **callbacks** (`map`, `filter`, `reduce`, etc.).
    

---

Ejemplo final en React:

```tsx
import "./App.css";

function App() {
  const elevar = (numero: number, potencia: number): number =>
    Math.pow(numero, potencia);

  const r1 = elevar(2, 3);
  const r2 = elevar(5, 2);

  return (
    <>
      <div>{r1}</div>
      <div>{r2}</div>
    </>
  );
}

export default App;
```

---

```jsx
import "./App.css";
function App() {

	let elevar = (numero: number,potencia:number): number => {
	return Math.pow(numero,potencia);
	}

	let r1 = elevar(2,3);
	let r2 = elevar(5,2);
	console.log(r1);
	console.log(r2);
return (
	<>
		<div>{r1}</div>
		<div>{r2}</div>
	</>
);
}
export default App;
```