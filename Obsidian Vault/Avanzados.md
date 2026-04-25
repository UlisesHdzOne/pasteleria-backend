**Tipar parámetros y retornos avanzados**.

En esta sección veremos cómo pasar **tipos más complejos** como **arrays, objetos, funciones, genéricos**, y cómo tipar correctamente **retornos distintos**.

Podemos estructurarlo así:

---

## 🔹 Tipar parámetros y retornos avanzados

### 1️⃣ Funciones con arrays

```ts
function sumarTodos(numeros: number[]): number {
  return numeros.reduce((acum, n) => acum + n, 0);
}

const resultado = sumarTodos([1, 2, 3, 4]); // 10
```

- `numeros: number[]` indica que el parámetro es un array de números.
    
- Retorno: `: number`
    

---

### 2️⃣ Funciones con objetos

```ts
type Persona = {
  nombre: string;
  edad: number;
};

function saludarPersona(persona: Persona): string {
  return `Hola ${persona.nombre}, tienes ${persona.edad} años`;
}

const saludo = saludarPersona({ nombre: "Ana", edad: 25 });
```

- Se puede usar `type` o `interface` para tipar objetos.
    

---

### 3️⃣ Funciones que reciben funciones (callbacks)

```ts
function procesarNumero(num: number, callback: (valor: number) => number): number {
  return callback(num);
}

const resultadoCallback = procesarNumero(5, (x) => x * 2); // 10
```

- `callback: (valor: number) => number` → indica que el parámetro es otra función que recibe un número y devuelve un número.
    

---

### 4️⃣ Funciones que retornan funciones (Higher-order functions)

```ts
function crearMultiplicador(factor: number): (num: number) => number {
  return (num: number) => num * factor;
}

const duplicar = crearMultiplicador(2);
console.log(duplicar(5)); // 10
```

- Retorno: `(num: number) => number` → es otra función.
    

---

### 5️⃣ Funciones genéricas

```ts
function devolverValor<T>(valor: T): T {
  return valor;
}

const numero = devolverValor(42);      // 42
const texto = devolverValor("Hola");   // "Hola"
```

- `<T>` indica un **tipo genérico**, se reemplaza al llamar la función.
    

---
```jsx
import "./App.css";

function App() {
  function sumarTodos(numeros: number[]): number {
    return numeros.reduce((a, b) => a + b, 0);
  }

  let numerosOne: number[] = [1, 2, 3, 4, 5];
  let numerosTwo: number[] = [1, 2, 3, 4, 5];

  let sumaTotalOne = sumarTodos(numerosOne);
  let sumaTotalTwo = sumarTodos(numerosTwo);

  console.log(sumaTotalOne);
  console.log(sumaTotalTwo);

  return (
    <>
      <div>{sumaTotalOne}</div>
      <div>{sumaTotalTwo}</div>
    </>
  );
}

export default App;

```