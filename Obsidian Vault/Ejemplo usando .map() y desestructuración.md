ejemplo 1

```js
const resultados = usuarios.map(({ nombre, edad }) => {
  return `${nombre} es ${edad >= 18 ? 'mayor' : 'menor'} de edad`;
});

console.log(resultados);
```

ejemplo 2

```ts
const productos = [
    { nombre: "Laptop", precio: 1200 },
    { nombre: "Mouse", precio: 40 },
    { nombre: "Teclado", precio: 80 },
  ];

  const resultadosList = productos.map(({ nombre, precio }) => {
    return `el producto ${nombre} cuesta ${precio}`;
  });

  console.log(resultadosList);
```






