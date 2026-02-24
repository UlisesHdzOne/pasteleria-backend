## 🔹 Tipar parámetros y retornos (Básicos)

En TypeScript puedes definir **el tipo de cada parámetro** que recibe una función y **el tipo de valor que devuelve**. Esto permite que el compilador detecte errores antes de que ejecutes tu código.

### 1️⃣ Números

```ts
function sumar(a: number, b: number): number {
  return a + b;
}

const resultado = sumar(5, 3); // 8
```

- `a: number` → el parámetro `a` es de tipo número
    
- `b: number` → el parámetro `b` también es un número
    
- `: number` después de los paréntesis → indica que la función devuelve un número
    

---

### 2️⃣ Strings

```ts
function concatenar(a: string, b: string): string {
  return a + " " + b;
}

const saludo = concatenar("Hola", "Mundo"); // "Hola Mundo"
```

- Tipado de parámetros como `string`
    
- Tipado de retorno como `string`
    

---

### 3️⃣ Booleanos

```ts
function esMayorQue10(valor: number): boolean {
  return valor > 10;
}

const check = esMayorQue10(15); // true
```

- El parámetro es un `number`
    
- La función devuelve un `boolean`
    

---

### 4️⃣ Void (funciones que no retornan nada)

```ts
function mostrarMensaje(mensaje: string): void {
  console.log(mensaje);
}

mostrarMensaje("Hola mundo");
```

- `: void` → indica que la función no devuelve ningún valor
    
- Muy usado para **logs, alertas o efectos secundarios**
    

---

### 5️⃣ Null y Undefined

```ts
function saludarOpcional(nombre?: string): string | undefined {
  if (nombre) return `Hola ${nombre}`;
  return undefined;
}

const hola1 = saludarOpcional("Ulises"); // "Hola Ulises"
const hola2 = saludarOpcional();         // undefined
```

- `nombre?: string` → parámetro opcional (`string` o `undefined`)
    
- Retorno puede ser `string` o `undefined`
    

---

### 6️⃣ Uniones básicas

```ts
function imprimirId(id: number | string): void {
  console.log(`ID: ${id}`);
}

imprimirId(123);    // ✅ "ID: 123"
imprimirId("ABC");  // ✅ "ID: ABC"
```

- `number | string` → el parámetro puede ser **un número o un string**
    
- Útil cuando un dato puede venir en más de un formato
    

---

### 7️⃣ Any y Unknown (solo si es necesario)

```ts
function mostrarValor(valor: any): void {
  console.log(valor);
}

function procesarValor(valor: unknown): void {
  if (typeof valor === "string") {
    console.log(valor.toUpperCase());
  }
}
```

- `any` → desactiva el tipado, no recomendado
    
- `unknown` → más seguro que `any`, debes validar antes de usar
    

---
```jsx
import "./App.css";

function App() {
  function restar(num1: number, num2: number): number {
    return num1 - num2;
  }

  function saludo(nombre?: string): string | undefined {
    return nombre ? `Hola ${nombre}` : undefined;
  }

  function esPositivo(num1: number): boolean {
    return num1 > 0;
  }

  let re = restar(1, 2);
  let salu = saludo("hola");
  let numeroPositivo = esPositivo(10);

  return (
    <>
      <div>
        <h1>{re}</h1>
        <h1>{salu}</h1>
        <h1>{numeroPositivo ? "Es positivo" : "No es positivo"}</h1>
      </div>
    </>
  );
}

export default App;

```