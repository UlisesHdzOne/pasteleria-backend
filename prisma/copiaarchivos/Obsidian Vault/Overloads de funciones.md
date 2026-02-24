### 🔹 Overloads de funciones (sobrecarga)

La idea es que **una función pueda aceptar diferentes combinaciones de parámetros y retornar distintos tipos**, pero **con una única implementación interna**.

Te explico con un ejemplo clásico:

```ts
// 🔹 Declaraciones de sobrecarga
function obtenerInfo(x: string): number;
function obtenerInfo(x: number): number;

// 🔹 Implementación única
function obtenerInfo(x: string | number): number {
  if (typeof x === "string") {
    return x.length; // si es string, devuelve longitud
  } else {
    return x * x;    // si es número, devuelve cuadrado
  }
}

// 🔹 Uso
let longitud = obtenerInfo("hola"); // 4
let cuadrado = obtenerInfo(5);      // 25
```

- Primero declaras **todas las posibles combinaciones** de parámetros y sus tipos de retorno.
    
- Luego escribes **una única implementación** usando tipos combinados (`x: string | number`).
    
- TypeScript ya sabe qué devuelve la función según el tipo de entrada.
    

---
Genial 😄, aquí va un ejemplo un poquito más avanzado, combinando **arrays y strings**:

```ts
// Sobrecargas
function concatenar(a: string, b: string): string;
function concatenar(a: string[]): string;

// Implementación única
function concatenar(a: string | string[], b?: string): string {
  if (Array.isArray(a)) {
    return a.join(" "); // si es array de strings, los concatenamos con espacio
  }
  return a + " " + b; // si son dos strings, los unimos con espacio
}

// Uso
let res1 = concatenar("Hola", "Mundo");           // "Hola Mundo"
let res2 = concatenar(["Hola", "TypeScript"]);   // "Hola TypeScript"
```

🔹 **Claves**:

1. Declaras todas las firmas posibles **antes** de la implementación.
    
2. La implementación usa **tipos combinados** (`string | string[]`) y parámetros opcionales (`b?`).
    
3. TypeScript entiende correctamente **qué tipo retorna según cómo llames la función**.
    

---

```jsx
import "./App.css";

function App() {
  function procesar(numero: number): number;
  function procesar(numero: number[]): number;

  function procesar(numero: number | number[]): number {
    if (Array.isArray(numero)) {
      return numero.reduce((acumulador, valor) => acumulador + valor, 0);
    }
    return numero * 2;
  }

  let arreglo: number[] = [1, 2, 3, 4, 5];

  let r1 = procesar(5);       // 10
  let r2 = procesar(arreglo); // 15

  return (
    <>
      <h1>{r1}</h1>
      <h1>{r2}</h1>
    </>
  );
}

export default App;

```