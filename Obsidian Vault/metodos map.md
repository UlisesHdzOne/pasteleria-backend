```js
const numeros = [2, 4, 6, 8];
const numerosDobles = numeros.map((numero)=>numero*2);
console.log(numerosDobles)
```

```js
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

```js
const estudiantes = [

{ nombre: 'Ana', calificacion: 85 },

{ nombre: 'Luis', calificacion: 72 },

{ nombre: 'Sofía', calificacion: 95 }

];

  

const alumnosList = estudiantes.map(({nombre, calificacion})=>{

return `${nombre} ${calificacion>=70 ?'aprobo' : 'reprobo' } con ${calificacion}`

});

  

console.log(alumnosList);
```

```js
const usuarios = [

{ nombre: 'Lucía', edad: 22 },

{ nombre: 'Pedro', edad: 16 },

{ nombre: 'María', edad: 30 },

{ nombre: 'Juan', edad: 15 }

];

  

const usuariosEdad = usuarios.map(({nombre,edad})=>{

return `${nombre} ${edad>=18 ? 'mayor de edad':'menor de edad'}`

});

  

console.log(usuariosEdad)
```