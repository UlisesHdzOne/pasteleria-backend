## ¿Qué son las funciones flecha?

Son una **sintaxis más corta** para definir funciones en JavaScript, introducidas en ES6. Además, manejan el contexto de `this` de forma diferente a las funciones tradicionales.

---

## Sintaxis básica

```js
// Función tradicional
function suma(a, b) {
  return a + b;
}

// Función flecha equivalente
const suma = (a, b) => {
  return a + b;
};
```

---

## Sintaxis simplificada

Si la función solo retorna una expresión, puedes omitir las llaves `{}` y el `return`:

```js
const suma = (a, b) => a + b;
```

---

## Casos especiales

### 1. Función flecha sin parámetros

```js
const saludar = () => console.log('Hola');
saludar(); // Hola
```

### 2. Función flecha con un solo parámetro (puedes omitir paréntesis)

```js
const cuadrado = x => x * x;
console.log(cuadrado(4)); // 16
```

---

## Diferencias con funciones tradicionales

- **No tienen su propio `this`**: heredan el `this` del contexto donde fueron definidas.
    
- No pueden usarse como constructores (`new`).
    
- No tienen `arguments`.
    

---

## Ejemplos

### Función tradicional

```js
function multiplicar(a, b) {
  return a * b;
}
```

### Función flecha equivalente

```js
const multiplicar = (a, b) => a * b;
```

---

### Función con cuerpo de varias líneas

```js
const saludar = nombre => {
  const saludo = `Hola, ${nombre}!`;
  return saludo;
};

console.log(saludar('Ana')); // Hola, Ana!
```

---

## Uso común con métodos de arrays

```js
const numeros = [1, 2, 3, 4, 5];

const cuadrados = numeros.map(n => n * n);
console.log(cuadrados); // [1, 4, 9, 16, 25]
```

---

## Resumen rápido

|Caso|Ejemplo|Explicación|
|---|---|---|
|Sin parámetros|`() => 42`|Retorna 42|
|Un parámetro|`x => x * 2`|Retorna el doble|
|Varios parámetros|`(x, y) => x + y`|Suma dos números|
|Cuerpo con varias líneas|`(x, y) => { ... }`|Usa `{}` y `return` explícito|

---

[[metodos map]]
