
# 📌 Variables en JavaScript

### 🔹 Declaración de variables

|Palabra clave|¿Se puede reasignar?|¿Se puede redeclarar en el mismo scope?|Ejemplo|
|---|---|---|---|
|`let`|✅ Sí|❌ No|`let edad = 20; edad = 30;`|
|`const`|❌ No (no se puede reasignar)|❌ No|`const PI = 3.14; // fijo`|
|`var` ⚠️ (antiguo, no recomendado)|✅ Sí|✅ Sí|`var nombre = "ulises";`|

👉 **Regla práctica:**

- Usa `const` por defecto.
    
- Usa `let` solo cuando vayas a cambiar el valor.
    
- Evita `var`.
    

### 🔹 Convenciones de nombres

- Usar **camelCase** para variables normales → `miVariableImportante`.
    
- Usar **MAYÚSCULAS** para constantes globales → `API_URL`.

```js
const API_URL = "https://jsonplaceholder.typicode.com/users";
``` 

---

# 📌 Interpolación de strings

Permite insertar variables dentro de un string usando backticks `` ` ``.

```js
const name = "Ulises";
const mensaje = `Hola ${name}, ¿qué tal?`;
console.log(mensaje); // Hola Ulises, ¿qué tal?
```

---

# 📌 Tipos de datos

### 🔹 Primitivos

- `undefined` → valor no asignado.
    
- `null` → valor desconocido/intencionalmente vacío.
    
- `boolean` → `true` / `false`.
    
- `number` → `10`, `3.14`.
    
- `bigint` → números muy grandes (`12345678901234567890n`).
    
- `string` → `"texto"`.
    
- `symbol` → identificador único.
    

### 🔹 Por referencia

Se guardan en memoria como referencias:

- `object`
    
- `array`
    
- `function`
    

---

# 📌 Objetos

```js
let persona = {
  nombre: "Ulises",
  edad: 28,
  esEstudiante: false,
};
```

Acceso:

```js
console.log(persona.nombre);  // "Ulises"
console.log(persona["edad"]); // 28
```

---

# 📌 Operadores de comparación

|Operador|Significado|Ejemplo|Resultado|
|---|---|---|---|
|`==`|Igual valor (no compara tipo)|`5 == "5"`|✅ true|
|`===`|Estrictamente igual (valor y tipo)|`5 === "5"`|❌ false|
|`!=`|Diferente valor|`5 != 7`|✅ true|
|`!==`|Estrictamente diferente|`5 !== "5"`|✅ true|
|`>`|Mayor que|`10 > 3`|✅ true|
|`<`|Menor que|`2 < 5`|✅ true|
|`>=`|Mayor o igual|`5 >= 5`|✅ true|
|`<=`|Menor o igual|`3 <= 2`|❌ false|

---

# 📌 Operadores lógicos

| Operador | Nombre | Ejemplo              | Resultado | condicion                                      |
| -------- | ------ | -------------------- | --------- | ---------------------------------------------- |
| `&&`     | AND    | `(5 > 3) && (2 < 4)` | ✅ true    | solo da true si dos condiciones son verdaderas |
| \|\|     | OR     | (5 > 3 ) \|\|(10<5)  | true      | da true si almenos una es verdadera            |
| `!`      | NOT    | `!(5 > 3)`           | ❌ false   | esture pero el simbolo lo cambia a falce       |

---

# 📌 Spread operator (`...`)

Permite expandir arrays u objetos.

### Arrays

```js
const array1 = [1,2,3];
const array2 = [...array1, 4,5];
console.log(array2); // [1,2,3,4,5]
```

### Objetos

```js
const persona = {nombre: "Ulises", edad: 28};
const personaConPais = {...persona, pais: "México"};
```

---

# 📌 Rest operator (`...`)

Permite agrupar valores en un array u objeto.

### Funciones

```js
function sumar(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
console.log(sumar(1,2,3,4)); // 10
```

### Arrays

```js
let [primero, ...resto] = [10,20,30,40];
console.log(primero); // 10
console.log(resto);   // [20,30,40]
```

### Objetos

```js
let persona = {nombre:"Ulises", edad:28, pais:"México"};
let {nombre, ...otrosDatos} = persona;
console.log(nombre);      // Ulises
console.log(otrosDatos);  // {edad:28, pais:"México"}
```

---

# 📌 Ternario

```js
let edad = 17;
let mensaje = edad >= 18 ? "Eres mayor de edad" : "Aún eres menor de edad";
```

---

# 📌 Asincronismo

# 📌 Callbacks en JavaScript

Un **callback** es una **función que se pasa como argumento a otra función** y se ejecuta después de que ocurre cierta operación.  
Se usan mucho para **operaciones asíncronas** o para definir pasos que dependen de otros.

---

## 🔹 Ejemplo básico

```js
// Función que recibe un nombre y un callback
function saludar(nombre, callback) {
  console.log("Hola " + nombre); // Acción principal
  callback();                     // Llamada al callback
}

// Callback
function despedirse() {
  console.log("Adiós");
}

// Ejecutamos
saludar("Ulises", despedirse);
```

**Consola:**

```
Hola Ulises
Adiós
```

**Explicación paso a paso:**

1. `saludar("Ulises", despedirse)` → llamamos a `saludar` pasando el nombre y la función `despedirse` como callback.
    
2. Dentro de `saludar`:
    
    - Se imprime `"Hola Ulises"`.
        
    - Luego se ejecuta `callback()` → que en este caso es `despedirse()`.
        
3. Se imprime `"Adiós"`.
    

---

## 🔹 Ejemplo práctico con asincronismo

Simulando que **primero recibimos datos de un servidor** y luego procesamos:

```js
function obtenerDatos(callback) {
  console.log("Solicitando datos al servidor...");
  setTimeout(() => {
    console.log("Datos recibidos");
    callback();
  }, 2000); // simula retraso de 2 segundos
}

function procesarDatos() {
  console.log("Ahora puedo procesar los datos");
}

// Ejecutamos
obtenerDatos(procesarDatos);
```

**Consola después de 2 segundos:**

```
Solicitando datos al servidor...
Datos recibidos
Ahora puedo procesar los datos
```

**Explicación:**

- `setTimeout` simula una operación asíncrona (como un fetch a un servidor).
    
- `procesarDatos` se pasa como callback y solo se ejecuta **después** de recibir los datos.
    

---

# 📌 Promesas en JavaScript

Una **promesa (Promise)** es un objeto que representa la eventual finalización o falla de una operación asíncrona.

### 🔹 Estados de una promesa

|Estado|Descripción|
|---|---|
|`pending`|En espera (no se ha resuelto ni rechazado)|
|`fulfilled`|Resuelta con éxito (`resolve`)|
|`rejected`|Rechazada por algún error (`reject`)|

---

## 🔹 Ejemplo básico

```js
// Creamos la promesa
const promesa = new Promise((resolve, reject) => {
  const exito = true; // Simula si la operación fue exitosa

  if (exito) {
    resolve("Operación exitosa"); // Promesa cumplida
  } else {
    reject("Hubo un error");      // Promesa rechazada
  }
});

// Usamos .then y .catch para manejar la promesa
promesa
  .then((resultado) => {
    console.log(resultado); // Se ejecuta si la promesa se cumple
  })
  .catch((error) => {
    console.log("Error:", error); // Se ejecuta si la promesa se rechaza
  });
```

**Consola:**

```
Operación exitosa
```

---

## 🔹 Promesa con simulación de retraso (asincronismo)

```js
function obtenerDatosDelServidor() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.5; // 50% de probabilidad de éxito
      if (exito) {
        resolve({ nombre: "Ulises", edad: 28 });
      } else {
        reject("Error al obtener los datos");
      }
    }, 2000); // Simula 2 segundos de retraso
  });
}

// Uso de la promesa
obtenerDatosDelServidor()
  .then((datos) => {
    console.log("Datos recibidos:", datos);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**Consola posible:**

```
Datos recibidos: { nombre: 'Ulises', edad: 28 }
```

o

```
Error: Error al obtener los datos
```

**Explicación:**

1. La función `obtenerDatosDelServidor` devuelve una promesa que se resolverá o rechazará después de 2 segundos.
    
2. `.then()` se ejecuta si la promesa se cumple (`resolve`).
    
3. `.catch()` se ejecuta si la promesa se rechaza (`reject`).
    

---

## 🔹 Comparación con callbacks

```js
// Callback tradicional
function obtenerDatos(callback) {
  setTimeout(() => {
    callback({ nombre: "Ulises", edad: 28 });
  }, 2000);
}

obtenerDatos((datos) => {
  console.log("Datos recibidos con callback:", datos);
});
```

✅ Las promesas permiten **encadenar varias operaciones asíncronas** de manera más legible y evitar el "callback hell".

---

# 📌 Async / Await en JavaScript

`async` y `await` son **azúcar sintáctico sobre promesas**, que permite escribir código asíncrono de forma **más clara y parecida a código síncrono**.

- `async` → declara que una función devuelve una **promesa**.
    
- `await` → pausa la ejecución de la función **hasta que la promesa se resuelva**.
    

---

## 🔹 Ejemplo básico

```js
// Función que devuelve una promesa simulando datos de un servidor
function obtenerDatos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = true; // Cambia a false para simular error
      if (exito) {
        resolve({ nombre: "Ulises", edad: 28 });
      } else {
        reject("Error al obtener los datos");
      }
    }, 2000);
  });
}

// Función asíncrona que usa await
async function main() {
  try {
    console.log("Esperando datos...");
    const datos = await obtenerDatos(); // Pausa hasta que la promesa se resuelva
    console.log("Datos recibidos:", datos);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
```

**Consola después de 2 segundos:**

```
Esperando datos...
Datos recibidos: { nombre: 'Ulises', edad: 28 }
```

---

## 🔹 Explicación paso a paso

1. `obtenerDatos()` devuelve una promesa que se resuelve o rechaza después de 2 segundos.
    
2. `main()` está declarada con `async`, por lo que puede usar `await`.
    
3. `await obtenerDatos()` pausa la ejecución hasta que la promesa se cumpla.
    
4. `try...catch` captura cualquier error si la promesa se rechaza.
    
5. La ejecución es **lineal y fácil de leer**, evitando `.then()` y `.catch()` encadenados.
    

---

## 🔹 Ejemplo con múltiples operaciones asíncronas

```js
function retraso(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function proceso() {
  console.log("Inicio del proceso");
  await retraso(1000);
  console.log("Paso 1 completado");
  await retraso(1000);
  console.log("Paso 2 completado");
  await retraso(1000);
  console.log("Proceso finalizado");
}

proceso();
```

**Consola:**

```
Inicio del proceso
Paso 1 completado
Paso 2 completado
Proceso finalizado
```

✅ Así se puede **secuenciar tareas asíncronas** de forma clara y ordenada.

---

# 📌 Arrays (mutables e inmutables)

| Método      | ¿Muta array? | Ejemplo                                                     |
| ----------- | ------------ | ----------------------------------------------------------- |
| **push**    | ✅ Sí         | Agrega un elemento al final                                 |
| **pop**     | ✅ Sí         | Elimina el último elemento                                  |
| **shift**   | ✅ Sí         | Elimina el primer elemento                                  |
| **unshift** | ✅ Sí         | Agrega un elemento al inicio                                |
| **map**     | ❌ No         | Crea un nuevo array transformado                            |
| **filter**  | ❌ No         | Crea un nuevo array con elementos que cumplen una condición |
| **find**    | ❌ No         | Encuentra el primer elemento que cumple una condición       |
| **some**    | ❌ No         | Devuelve `true` si al menos un elemento cumple la condición |
| **every**   | ❌ No         | Devuelve `true` si todos cumplen la condición               |
| **slice**   | ❌ No         | Extrae una porción sin modificar el original                |
| **splice**  | ✅ Sí         | Quita o reemplaza elementos del array                       |
| **indexOf** | ❌ No         | Devuelve la posición de un elemento                         |

---

## Ejemplos uno por uno 📌

### 1. `push()` → Agregar al final ✅

```js
let arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```

➡️ Muta el array original agregando `4` al final.

---

### 2. `pop()` → Eliminar el último ✅

```js
let arr = [1, 2, 3];
arr.pop();
console.log(arr); // [1, 2]
```

➡️ Elimina el último elemento (`3`).

---

### 3. `shift()` → Eliminar el primero ✅

```js
let arr = [1, 2, 3];
arr.shift();
console.log(arr); // [2, 3]
```

➡️ Elimina el primer elemento (`1`).

---

### 4. `unshift()` → Agregar al inicio ✅

```js
let arr = [1, 2, 3];
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3]
```

➡️ Agrega `0` al inicio.

---

### 5. `map()` → Transformar ❌

```js
let arr = [1, 2, 3];
let doble = arr.map(n => n * 2);
console.log(doble); // [2, 4, 6]
console.log(arr);   // [1, 2, 3]
```

➡️ Crea un nuevo array con cada número multiplicado por 2.

---

### 6. `filter()` → Filtrar ❌

```js
let arr = [1, 2, 3, 4, 5];
let mayores = arr.filter(n => n > 2);
console.log(mayores); // [3, 4, 5]
```

➡️ Nuevo array con elementos mayores a 2.

---

### 7. `find()` → Buscar ❌

```js
let arr = [1, 2, 3, 4];
let encontrado = arr.find(n => n === 3);
console.log(encontrado); // 3
```

➡️ Devuelve el primer elemento que cumple la condición.

---

### 8. `some()` → ¿Al menos uno cumple? ❌

```js
let arr = [1, 2, 3];
console.log(arr.some(n => n > 2)); // true
console.log(arr.some(n => n > 5)); // false
```

➡️ Retorna `true` si **al menos un elemento** cumple.

---

### 9. `every()` → ¿Todos cumplen? ❌

```js
let arr = [2, 4, 6];
console.log(arr.every(n => n % 2 === 0)); // true
console.log(arr.every(n => n > 2));       // false
```

➡️ Retorna `true` si **todos los elementos** cumplen.

---

### 10. `slice()` → Extraer ❌

```js
let arr = [10, 20, 30, 40];
let parte = arr.slice(1, 3);
console.log(parte); // [20, 30]
console.log(arr);   // [10, 20, 30, 40]
```

➡️ Devuelve una porción sin modificar el original.  
_(del índice 1 hasta el 3, sin incluirlo)._

---

### 11. `splice()` → Modificar ✅

```js
let arr = [10, 20, 30, 40];
arr.splice(1, 2); 
console.log(arr); // [10, 40]
```

➡️ A partir del índice `1`, elimina `2` elementos (`20` y `30`).

---

### 12. `indexOf()` → Buscar posición ❌

```js
let frutas = ["manzana", "pera", "uva"];
console.log(frutas.indexOf("pera")); // 1
console.log(frutas.indexOf("banana")); // -1
```

➡️ Devuelve el índice de `"pera"`, o `-1` si no existe.

---
Excelente 🚀, vamos a pulir tu resumen de **manipulación del DOM** con ejemplos claros y comentados paso a paso.

---

# 📌 Manipulación del DOM en JavaScript

El **DOM (Document Object Model)** es la representación de la página en forma de árbol. Con JS podemos **seleccionar, modificar, crear y reaccionar a eventos** de los elementos.

---

## 🔎 Selección de elementos

```html
<body>
  <h1 id="titulo">Hola</h1>
  <p class="parrafo">Soy un párrafo</p>
  <p class="parrafo">Otro párrafo</p>
  <button name="boton-enviar">Enviar</button>
</body>
```

```js
// Por ID
let titulo = document.getElementById("titulo");
console.log(titulo.textContent); // Hola

// Por name
let botones = document.getElementsByName("boton-enviar");
console.log(botones[0]); // <button name="boton-enviar">Enviar</button>

// Por etiqueta
let parrafos = document.getElementsByTagName("p");
console.log(parrafos.length); // 2

// Por clase
let parrafosClase = document.getElementsByClassName("parrafo");
console.log(parrafosClase[1].textContent); // Otro párrafo

// querySelector → primer match
let primerParrafo = document.querySelector(".parrafo");
console.log(primerParrafo.textContent); // Soy un párrafo

// querySelectorAll → todos los matches
let todos = document.querySelectorAll("p");
todos.forEach(p => console.log(p.textContent));
```

---

## 📝 Modificación de elementos

```js
// Cambiar texto
titulo.textContent = "Bienvenido al DOM"; 

// Agregar y quitar clases
titulo.classList.add("activo");
titulo.classList.remove("inactivo");

// Cambiar estilos
titulo.style.color = "red";
titulo.style.fontSize = "30px";
```

📌 Resultado:  
El `<h1>` cambia su texto, color y tamaño de fuente.

---

## 🏗️ Creación y adición de nodos

```js
// Crear un párrafo nuevo
let nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Soy un nuevo párrafo";

// Agregar al body
document.body.append(nuevoParrafo);

// Insertar antes del título
document.body.insertBefore(nuevoParrafo, titulo);
```

📌 Resultado:  
Un nuevo párrafo aparece en la página, primero al final y luego antes del título.

---

## 🎯 Manejo de eventos

```html
<button id="miBoton">Haz clic</button>
```

```js
let btn = document.getElementById("miBoton");

// Evento click
btn.addEventListener("click", () => {
  alert("¡Hiciste click!");
});

// Evento mouseover
btn.addEventListener("mouseover", () => {
  btn.style.backgroundColor = "yellow";
});

// Evento mouseout
btn.addEventListener("mouseout", () => {
  btn.style.backgroundColor = "";
});
```

📌 Resultado:

- Al hacer clic → aparece una alerta.
    
- Al pasar el mouse → cambia el color a amarillo.
    
- Al quitar el mouse → vuelve al color original.
    
