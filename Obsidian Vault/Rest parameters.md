**Rest Parameters (`...param`)**.

### 🔹 ¿Qué son?

Sirven para que una función pueda recibir un **número variable de argumentos** como si fueran un array.  
Se escriben con `...` antes del nombre del parámetro.

---

### ✅ Ejemplo básico: sumar muchos números

```ts
function sumar(...numeros: number[]): number {
  return numeros.reduce((acc, n) => acc + n, 0);
}

console.log(sumar(1, 2, 3));        // 6
console.log(sumar(10, 20, 30, 40)); // 100
```

👉 Aquí `numeros: number[]` es un array creado automáticamente con todos los argumentos.

---

### ✅ Ejemplo con strings

```ts
function concatenar(...palabras: string[]): string {
  return palabras.join(" ");
}

console.log(concatenar("Hola", "mundo")); 
// "Hola mundo"
```

---

### ✅ Ejemplo mezclado

Los rest parameters pueden convivir con parámetros normales, pero **siempre van al final**:

```ts
function presentarUsuario(nombre: string, ...habilidades: string[]): string {
  return `${nombre} sabe: ${habilidades.join(", ")}`;
}

console.log(presentarUsuario("Ulises", "TS", "React", "Node"));
// "Ulises sabe: TS, React, Node"
```

---
