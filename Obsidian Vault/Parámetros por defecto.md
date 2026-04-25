## 🔹 **Parámetros por defecto**

Un **parámetro por defecto** significa que si el usuario **no envía un valor**, la función usará un valor predefinido.

### Ejemplo básico

```ts
function saludar(nombre: string = "invitado"): string {
  return `Hola ${nombre}`;
}

console.log(saludar());        // Hola invitado
console.log(saludar("Ulises")); // Hola Ulises
```

- `nombre: string = "invitado"` → si no mandas `nombre`, por defecto será `"invitado"`.
    
- Puedes combinarlos con otros parámetros, incluso opcionales.
    

### Ejemplo con números

```ts
function potencia(base: number, exponente: number = 2): number {
  return Math.pow(base, exponente);
}

console.log(potencia(5));     // 25 (usa exponente=2)
console.log(potencia(5, 3));  // 125
```

---

```jsx
import "./App.css";
function App() {

let calcularPrecio = (precio: number,iva:number = 0.16 ): number => {
return precio * (1 + iva);
}

let r1 = calcularPrecio(100);
let r2 = calcularPrecio(4,0.25);
return (

	<>
	<div>{r1}</div>
	<div>{r2}</div>
	</>

);

}

export default App;
```