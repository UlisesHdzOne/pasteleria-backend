**Funciones genéricas básicas** en TypeScript.  
Este tema es clave porque te permite escribir funciones **reutilizables y seguras** para cualquier tipo de dato, sin perder tipado.

---

## 🔹 ¿Qué es un genérico `<T>`?

Un **genérico** es como un "placeholder" de tipo.  
Cuando no sabemos de antemano qué tipo de dato se va a usar, ponemos `<T>` y TypeScript lo resuelve al usar la función.

📌 Sintaxis básica:

```ts
function identidad<T>(valor: T): T {
  return valor;
}
```

- `T` puede ser **cualquier tipo**: `number`, `string`, `boolean`, `object`, `array`, etc.
    
- Al llamar la función, TypeScript **deduce** el tipo automáticamente:
    

```ts
let num = identidad(10);       // T es number
let texto = identidad("Hola"); // T es string
```

---

## 🔹 Ejemplo práctico: devolver el primer elemento de un array

```ts
function obtenerPrimero<T>(elementos: T[]): T | undefined {
  return elementos.length > 0 ? elementos[0] : undefined;
}

let numeros = obtenerPrimero([1, 2, 3]);   // T es number
let nombres = obtenerPrimero(["Ana", "Luis"]); // T es string
```

- Para `[1,2,3]` retorna un `number`.
    
- Para `["Ana", "Luis"]` retorna un `string`.
    
- Todo **seguro y tipado**.
    

---

## 🔹 Ventaja frente a `any`

Si usaras `any`, perderías seguridad:

```ts
function identidadAny(valor: any): any {
  return valor; // ⚠️ pierde el tipo
}
let res = identidadAny("hola");
res.toFixed(2); // error en runtime porque "hola" no es número
```

Con `<T>`, TypeScript sabe qué tipo es y previene errores. ✅

---
```jsx
import "./App.css";

function App() {
// function identidad<T>(valor: T): T {
// return valor;
// }
const identidad = <T,>(valor: T): T => {
return valor;
};
let arregloNumeros: number[] = [2, 3, 4, 5];
let r1 = identidad(42);
let r2 = identidad("Hola");
let r3 = identidad(arregloNumeros);

return (
	<>
		<div>{r1}</div>
		<div>{r2}</div>
		<div>{r3.join(",")}</div>
	</>
);
}

export default App;
```