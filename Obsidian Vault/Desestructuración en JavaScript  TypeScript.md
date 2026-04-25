
## ¿Qué es la desestructuración?

La desestructuración es una **forma sencilla y rápida de extraer valores de objetos o arreglos** y asignarlos a variables independientes.

---

## 1. Desestructuración de objetos

### Sintaxis básica:

```ts
const objeto = { prop1: valor1, prop2: valor2 };

const { prop1, prop2 } = objeto;
```

- Extrae `prop1` y `prop2` del objeto y crea variables con esos nombres.
    
- Puedes renombrar variables usando `:`
    

```ts
const { prop1: nuevoNombre } = objeto;
```

---

### Ejemplo:

```ts
const auto = {
  marca: 'Nissan',
  modelo: 'Sentra',
  año: 2020,
};

const { marca, modelo } = auto;
console.log(marca, modelo); // Nissan Sentra
```

---

## 2. Desestructuración de arreglos

### Sintaxis básica:

```ts
const arreglo = [valor1, valor2, valor3];

const [primero, segundo] = arreglo;
```

- Extrae el primer y segundo elemento del arreglo a variables.
    
- Puedes saltarte elementos usando comas:
    

```ts
const [ , segundo] = arreglo; // Ignora el primero
```

---

### Ejemplo:

```ts
const colores = ['rojo', 'verde', 'azul'];

const [primero, , tercero] = colores;
console.log(primero, tercero); // rojo azul
```

---

## 3. Desestructuración combinada (objeto con arreglo y viceversa)

### Ejemplo:

```ts
const libro = {
  titulo: 'El Principito',
  capitulos: ['Inicio', 'Encuentro', 'Despedida'],
};

const { titulo, capitulos } = libro;
const [primerCapitulo, segundoCapitulo] = capitulos;

console.log(titulo); // El Principito
console.log(primerCapitulo, segundoCapitulo); // Inicio Encuentro
```

---

## 4. Desestructuración anidada

### Objetos dentro de objetos:

```ts
const libro = {
  titulo: '1984',
  autor: {
    nombre: 'George Orwell',
    pais: 'Reino Unido',
  }
};

const { titulo, autor: { nombre: autorNombre, pais } } = libro;

console.log(titulo); // 1984
console.log(autorNombre, pais); // George Orwell Reino Unido
```

---

### Objetos dentro de arreglos:

```ts
const libros = [
  { titulo: '1984', autor: { nombre: 'George Orwell' } },
  { titulo: 'Fahrenheit 451', autor: { nombre: 'Ray Bradbury' } },
];

const { titulo, autor: { nombre } } = libros[0];
console.log(titulo, nombre); // 1984 George Orwell
```

---

## 5. Uso del operador rest (`...`)

- Permite capturar el resto de propiedades o elementos no desestructurados en un nuevo objeto o arreglo.
    

### Ejemplo con objeto:

```ts
const equipo = {
  nombre: 'Real Madrid',
  estadio: 'Bernabéu',
  fundacion: 1902,
  campeonatos: 34,
};

const { nombre, estadio, ...datosExtra } = equipo;
console.log(datosExtra); // { fundacion: 1902, campeonatos: 34 }
```

### Ejemplo con arreglo:

```ts
const numeros = [1, 2, 3, 4];

const [primero, ...resto] = numeros;
console.log(resto); // [2, 3, 4]
```

---

## 6. Renombrar variables

Se puede cambiar el nombre de la variable al desestructurar para mayor claridad:

```ts
const { nombre: nombreUsuario } = { nombre: 'Ana' };
console.log(nombreUsuario); // Ana
```

---

## Consejos:

- La desestructuración mejora la legibilidad y hace el código más limpio.
    
- No siempre es necesario hacer todo en una línea, especialmente con estructuras complejas.
    
- Combina desestructuración con operadores rest para mayor flexibilidad.
    
- Útil para extraer valores de objetos o respuestas JSON de APIs.

temas relacionados
[[Ejemplo usando .map() y desestructuración]]



```js
const colores = ['rojo','blanco','verde'];

  

const [primeroRojo,segundoBlanco] = colores;

  

console.log(primeroRojo,segundoBlanco)

  

//////////////

const personas = [

{ nombre: 'Ana', edad: 25 },

{ nombre: 'Luis', edad: 30 }

];

  

const {nombre,edad} = personas[1];

console.log(nombre,edad)

  

////////////////////

const libro = {

titulo: 'El Principito',

capitulos: ['Inicio', 'Encuentro', 'Despedida']

};

  

// const {titulo,capitulos} = libro;

// const [primerCapitulo,segundoCapitulo] = capitulos;

  

// console.log(titulo);

// console.log(primerCapitulo,segundoCapitulo)

  

////////////

const pintor = {

nombre1: 'Vincent van Gogh',

obras: ['La noche estrellada', 'Los girasoles', 'El dormitorio']

};

  

/* const {nombre1,obras} = pintor;

const [primeraObra,segundaObra]= obras;

console.log(nombre1);

console.log(primeraObra,segundaObra) */

////////////////////

  

const usuarios = [

{ nombree: 'Ana', edadd: 28 },

{ nombree: 'Carlos', edadd: 35 }

];

  

const usuario = usuarios[0]

const {nombree,edadd} = usuario;

console.log(nombree,edadd)

  

//////////////////

  

const productos = [

{ nombre: 'Laptop', precio: 1200 },

{ nombre: 'Mouse', precio: 40 }

];

  

const {nombre:nombreProducto,precio:precioProducto} = productos[0];

console.log(nombreProducto,precioProducto)

/////

const canciones = [

{ nombre: 'Yesterday', artista: 'The Beatles' },

{ nombre: 'Hey Jude', artista: 'The Beatles' }

];

  

const {nombre:nombre1,artista:artista1} = canciones[0];

const {nombre:nombre2,artista:artista2} = canciones[1];

console.log(nombre1,artista1)

console.log(nombre2,artista2)

///////

const cursos = [

{

nombre: 'JavaScript Básico',

estudiantes: ['Ana', 'Luis', 'Carlos']

},

{

nombre: 'TypeScript Avanzado',

estudiantes: ['Marta', 'José']

}

];

  
  

const {nombre:nombreCurso,estudiantes} = cursos[0];

const [estudiante1,estudiante2] = estudiantes;

  

console.log(nombreCurso);

console.log(estudiante1);

console.log(estudiante2);

///

  
  

const peliculas = [

{

titulo: 'El laberinto del fauno',

director: {

nombre: 'Guillermo del Toro',

nacionalidad: 'Mexicana'

}

},

{

titulo: 'Parasite',

director: {

nombre: 'Bong Joon-ho',

nacionalidad: 'Coreana'

}

}

];

  

const {titulo,director} = peliculas[0];

const {nombre:nombreDirector,nacionalidad} = director;

  

console.log(titulo)

console.log(nombreDirector)

console.log(nacionalidad)
```