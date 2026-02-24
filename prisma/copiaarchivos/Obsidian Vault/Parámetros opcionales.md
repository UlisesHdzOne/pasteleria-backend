## 🔹 Parámetros opcionales en TypeScript

En TypeScript, puedes definir que un parámetro **no siempre se tenga que enviar**.  
Esto se hace con un `?` después del nombre del parámetro.

### Ejemplo básico

```ts
function saludar(nombre?: string): string {
  if (nombre) {
    return `Hola, ${nombre}`;
  }
  return "Hola, invitado";
}

console.log(saludar("Ulises")); // Hola, Ulises
console.log(saludar());         // Hola, invitado
```

✅ Puntos importantes:

- `nombre?: string` → significa que **puede ser `string` o `undefined`**.
    
- Si el parámetro no se pasa, TypeScript lo marca como `undefined`.
    
- Debes manejar el caso de que no venga.
    

---

### Ejemplo con más de un opcional

```ts
function mostrarProducto(nombre: string, precio?: number): string {
  if (precio) {
    return `${nombre} cuesta $${precio}`;
  }
  return `${nombre} no tiene precio definido`;
}

console.log(mostrarProducto("Laptop", 1200)); // Laptop cuesta $1200
console.log(mostrarProducto("Mouse"));        // Mouse no tiene precio definido
```

---

### 💡 Diferencia con parámetros normales

- Parámetro normal → **obligatorio**: `function sumar(a: number, b: number)`.
    
- Parámetro opcional → **puede omitirse**: `function sumar(a: number, b?: number)`.
    

---

```jsx
import "./App.css";
function App() {

	let presentarUsuario = (nombre: string,edad?:number): string => {
	return edad ? `Mi nombre es ${nombre} y tengo ${edad} años`:`Mi nombre es ${nombre}`
	}
	
	let r1 = presentarUsuario("Ulises",25);
	let r2 = presentarUsuario("ulises");
return (
	<>
		<div>{r1}</div>
		<div>{r2}</div>
	</>
);
}

export default App;
```