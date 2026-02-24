### 📦 ¿Qué es una Promesa?

Una **promesa** representa el resultado futuro de una operación asincrónica. Tiene tres estados:

- 🟡 **Pending (pendiente):** la operación sigue en proceso.
    
- 🟢 **Fulfilled (cumplida):** la operación fue exitosa.
    
- 🔴 **Rejected (rechazada):** la operación falló.
    

---

### 🧪 Crear una promesa

```ts
const promesa = new Promise((resolve, reject) => {
  const exito = true;

  setTimeout(() => {
    exito ? resolve("✅ Todo bien") : reject("❌ Algo falló");
  }, 2000);
});
```

---

### ✅ Consumir una promesa con `.then()` y `.catch()`

```ts
promesa
  .then((resultado) => {
    console.log("Resultado:", resultado);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

---

## 🚀 `async` / `await`: Forma moderna y clara

### 🤔 ¿Qué es `async`?

- Una función `async` **siempre devuelve una promesa**.
    
- Puedes usar `await` dentro de una función `async`.
    

```ts
async function ejemplo() {
  const resultado = await promesa;
  console.log(resultado);
}
```

---

### 🧱 Ejemplo práctico: Esperar con `await`

```ts
const esperar = (ms: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Esperé ${ms} ms`), ms);
  });
};

async function ejecutar() {
  console.log("Inicio");
  const resultado = await esperar(2000);
  console.log(resultado);
  console.log("Fin");
}

ejecutar();
```

---

## 👤 Buscar usuario simulado con promesas

```ts
const usuarios = [
  { id: 1, nombre: "Ulises" },
  { id: 2, nombre: "Marta" },
  { id: 3, nombre: "Luis" },
  { id: 4, nombre: "Ana" },
];
```

---

### 🔍 Función que retorna una promesa

```ts
const esperaBuscaUsuario = (
  id: number
): Promise<{ id: number; nombre: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuario = usuarios.find((u) => u.id === id);
      usuario
        ? resolve(usuario)
        : reject(`❌ Usuario con id ${id} no encontrado`);
    }, 2000);
  });
};
```

---

### 🧪 Consumir con `async/await` y manejar errores

```ts
const cargarUsuario = async () => {
  console.log("Inicio");

  try {
    const usuario = await esperaBuscaUsuario(1);
    console.log("✅ Usuario encontrado:", usuario);
  } catch (error) {
    console.error(error);
  }

  console.log("Fin");
};

cargarUsuario();
```

---

## 🔁 Varias promesas con `Promise.allSettled`

```ts
const cargarUsuarios = async () => {
  console.log("Inicio");

  const buscarU = [1, 2, 5];
  const promesas = buscarU.map((id) => esperaBuscaUsuario(id));

  const resultados = await Promise.allSettled(promesas);

  resultados.forEach((resultado, index) => {
    if (resultado.status === "fulfilled") {
      console.log(`✅ Usuario ${buscarU[index]}:`, resultado.value);
    } else {
      console.log(`❌ Usuario ${buscarU[index]}:`, resultado.reason);
    }
  });

  console.log("Fin");
};

cargarUsuarios();
```

---

## 🔁 Otra forma: usar bucle `for` con `await` (procesamiento secuencial)

```ts
const cargarSecuencial = async () => {
  console.log("Inicio");

  const buscarU = [1, 2, 5];

  for (const id of buscarU) {
    try {
      const usuario = await esperaBuscaUsuario(id);
      console.log(`✅ Usuario ${id}:`, usuario);
    } catch (error) {
      console.error(`❌ Usuario ${id}:`, error);
    }
  }

  console.log("Fin");
};

cargarSecuencial();
```

---

## ✍️ Sintaxis: Funciones flecha vs funciones tradicionales

|Tipo de función|Sintaxis|Contexto `this`|
|---|---|---|
|**Función flecha**|`const f = () => {}`|No propio|
|**Función normal**|`function f() {}`|Tiene `this`|

### 📌 Recomendación:

- Usa **funciones flecha** cuando quieras **funciones cortas**, especialmente **funciones anónimas** o **callbacks**.
    
- Usa **funciones tradicionales** si necesitas el contexto de `this` o para declarar funciones **globales**.
    

---

## 📦 Conclusión

- Las **promesas** te permiten trabajar con tareas asincrónicas de forma segura.
    
- `async/await` simplifica el manejo de promesas.
    
- Puedes combinar `Promise.allSettled` con `map()` o usar `for` para secuencial.
    
- Las **funciones flecha** son modernas, pero usa la que te resulte más **legible** y **mantenible**.
    

[[🧠 Sintaxis de funciones flecha con Promesas en TypeScript]]
