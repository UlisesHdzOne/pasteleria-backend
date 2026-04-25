
En TypeScript, cada variable puede tener un **tipo**. Esto ayuda a que tu código sea más seguro y fácil de mantener. Aquí están los principales tipos básicos:

1. **String** – texto
    

```ts
let nombre: string = "Ulises";
```

2. **Number** – números (enteros o decimales)
    

```ts
let edad: number = 25;
```

3. **Boolean** – verdadero o falso
    

```ts
let esEstudiante: boolean = true;
```

4. **Array** – listas de elementos de un mismo tipo
    

```ts
let numeros: number[] = [1, 2, 3];
let nombres: string[] = ["Ana", "Luis"];
```

También se puede usar:

```ts
let nombres: Array<string> = ["Ana", "Luis"];
```

5. **Object** – objetos con propiedades
    

```ts
let persona: { nombre: string; edad: number } = {
  nombre: "Ulises",
  edad: 25
};
```

6. **Any** – cualquier tipo (no recomendado, evita errores de tipado)
    

```ts
let variable: any = 5;
variable = "hola"; // OK
```

7. **Unknown** – cualquier tipo, pero necesitas validar antes de usarlo
    

```ts
let valor: unknown = "hola";
if (typeof valor === "string") {
  console.log(valor.toUpperCase());
}
```

---
```jsx

let titulo: string = "Bienvenido";
let contador: number = 10;
let estaActivo: boolean = true;
let listaUsuarios: string[] = ["Ana", "Luis", "Pedro"];

return (
  <div className="central">
    <h1>{titulo}</h1>
    <p>Contador: {contador}</p>
    <p>Activo: {estaActivo ? "Sí" : "No"}</p>
    <ul>
      {listaUsuarios.map((usuario, index) => (
        <li key={index}>{usuario}</li>
      ))}
    </ul>
  </div>
);

```


---

### 1. **Uniones de tipos** (union types)

A veces una variable puede ser de **más de un tipo**:

```ts
let id: string | number;
id = 123;      // válido
id = "abc123"; // válido
```

Esto lo usarás mucho cuando recibes datos de formularios o de una API que no siempre manda lo mismo.

---

### 2. **Tipos literales**

Puedes restringir que una variable solo acepte **valores específicos**:

```ts
let estado: "pendiente" | "enviado" | "entregado";
estado = "pendiente";  // ✅ válido
estado = "cancelado";  // ❌ error, no está permitido
```

Esto es muy útil en React, por ejemplo, para manejar estados de botones o menús.

```jsx
import "./App.css";

function App() {
  let id: number | string = 101;
  let rol: "admin" | "user" | "guest" = "user";
  let puntos: number | null = null;

  return (
    <div className="central">
      <p>ID: {id}</p>
      <p>Rol: {rol}</p>
      <p>Puntos: {puntos !== null ? puntos : "Sin puntos"}</p>
    </div>
  );
}

export default App;

```
---

