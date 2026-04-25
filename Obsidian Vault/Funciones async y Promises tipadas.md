# 🔹 Funciones async y Promises tipadas en TypeScript

En **JavaScript / TypeScript**, una **Promesa** (`Promise`) es un **contenedor de un valor futuro**, que representa una operación **asíncrona**: algo que **toma tiempo** y cuyo resultado no está disponible de inmediato, por ejemplo:

- Pedir datos a un servidor
- Leer archivos
- Esperar un temporizador
- Procesos que pueden fallar

---

## 📌 Estados de una Promesa

Una promesa puede estar en 3 estados:

- **pending** → en proceso, aún no tiene resultado.
- **fulfilled** → terminó con éxito → se ejecuta `resolve(valor)`.
- **rejected** → terminó con error → se ejecuta `reject(error)`.

---

## ✅ Crear una Promesa

```ts
const miPromesa = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    const exito = true;
    if (exito) {
      resolve("✅ Todo salió bien");
    } else {
      reject("❌ Algo falló");
    }
  }, 2000);
});
```

- `Promise<string>` → indica que **cuando termine**, devolverá un `string`.
- `resolve(valor)` → se ejecuta si todo sale bien.
- `reject(error)` → se ejecuta si ocurre un error.

💡 **Tip:** `setTimeout` se usa aquí para simular una operación asíncrona que tarda 2 segundos.

---

## 1️⃣ Consumir promesas con `.then` / `.catch`

Forma **clásica** (legacy), todavía usada en proyectos antiguos:

```ts
miPromesa
  .then((resultado) => {
    console.log("Éxito:", resultado);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

- `.then()` → recibe el resultado si la promesa se cumple.
- `.catch()` → recibe el error si la promesa falla.
- Problema: cuando hay muchas promesas encadenadas, el código puede quedar difícil de leer (_callback hell_).

---

## 2️⃣ Consumir promesas con `async/await`

Forma **moderna** y más legible:

```ts
const ejecutar = async (): Promise<void> => {
  try {
    const resultado = await miPromesa;
    console.log("Éxito:", resultado);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

- `async` → indica que la función devuelve automáticamente una promesa.
- `await` → "pausa" la ejecución hasta que la promesa termine.
- `try/catch` → captura errores de la promesa.

📌 Ventaja: el código se lee como si fuera **sincrónico**.

---

## ⚖️ Comparación rápida

|Estilo|Ventaja 🚀|Desventaja ⚠️|
|---|---|---|
|`.then/.catch`|Compatible con código viejo|Difícil de leer si hay muchas operaciones|
|`async/await`|Más limpio, legible y moderno|Necesitas `try/catch` para manejar errores|

---

## 📝 Mini resumen

- **Promesas** → para operaciones que tardan en completarse.
- `.then/.catch` → legacy, útil para código antiguo.
- `async/await` → estándar moderno, preferible en proyectos actuales.
- Ambas formas **producen el mismo resultado**, solo cambia la sintaxis y legibilidad.

---

## 🔹 Ejemplo práctico en React

```ts
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [mensajeThen, setMensajeThen] = useState<string>("");
  const [mensajeAsync, setMensajeAsync] = useState<string>("");

  // Función que devuelve una promesa
  const obtenerDatos = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = true;
        if (exito) {
          resolve("✅ Datos obtenidos correctamente");
        } else {
          reject("❌ Error al obtener datos");
        }
      }, 2000);
    });
  };

  // 1️⃣ Usando .then / .catch
  useEffect(() => {
    obtenerDatos()
      .then((resultado) => setMensajeThen(resultado))
      .catch((error) => setMensajeThen(error));
  }, []);

  // 2️⃣ Usando async/await
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultado = await obtenerDatos();
        setMensajeAsync(resultado);
      } catch (error) {
        setMensajeAsync(error as string);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>Ejemplo con .then / .catch</h2>
        <p>{mensajeThen}</p>

        <h2>Ejemplo con async/await</h2>
        <p>{mensajeAsync}</p>
      </div>
    </>
  );
}

export default App;
```

---

### 🔹 Qué hace este código

1. `obtenerDatos()` → devuelve una promesa (`Promise<string>`).
2. **Primer useEffect** → consume la promesa con `.then` / `.catch`.
3. **Segundo useEffect** → consume la promesa con `async/await`.
4. `mensajeThen` y `mensajeAsync` → muestran los resultados en pantalla tras 2 segundos.

---

💡 **Tip para memorizar:**

- Piensa en **promesas como un contenedor de un valor que llegará después**.
- `.then` = llamar cuando llega el valor.
- `await` = esperar el valor como si fuera sincrónico.

---
```jsx
import "./App.css";

function App() {

type Usuario = {
id: number;
nombre: string;
apellido: string;
edad: number;
genero: string;
};

  

const control = true;

const obtenerUsuario = new Promise<Usuario[]>((resolve, reject) => {
setTimeout(() => {
if (control) {
resolve([
{id: 1,nombre: "Jesus",apellido: "Garcia",edad: 22,genero: "Masculino",},
{id: 2,nombre: "Jesus",apellido: "Garcia",edad: 22,genero: "Masculino",},
{id: 3,nombre: "Jesus",apellido: "Garcia",edad: 22,genero: "Masculino",},
]);
} else {
reject("No se pudo obtener los datos");
}
}, 2000);
});

  

const mostrarUsuario = async () => {
try {
const usuario = await obtenerUsuario;
console.log("Promesa resuelta con await", usuario);
} catch (error) {
console.log("Promesa rechazada con await", error);
}
};
mostrarUsuario();
return (
<>
<h1>{}</h1>
</>
);
}
export default App;
```


---
```jsx
import "./App.css";

function App() {
  type Libro = {
    id: number;
    titulo: string;
    autor: string;
    anio: number;
  };

  const control = true;
  const obtenerLibros = new Promise<Libro[]>((resolve, reject) => {
    setTimeout(() => {
      if (control) {
        resolve([
          {
            id: 1,
            titulo: "Libro 1",
            autor: "Autor 1",
            anio: 2020,
          },
          {
            id: 2,
            titulo: "Libro 2",
            autor: "Autor 2",
            anio: 2021,
          },
        ]);
      } else {
        reject("❌ No se pudo obtener los libros");
      }
    }, 2000);
  });

  const mostrarLibros = async (): Promise<void> => {
    try {
      const libros = await obtenerLibros;
      console.log("📚 Promesa resuelta con await:", libros);
    } catch (error) {
      console.error("❌ Promesa rechazada con await:", error);
    }
  };

  mostrarLibros();

  return (
    <>
      <h1>Consulta de libros</h1>
    </>
  );
}

export default App;

```