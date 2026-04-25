# 🔹 const vs let en TypeScript

En TypeScript (igual que en JavaScript) usamos `let` y `const` para declarar variables, pero **en TS tienen un detalle extra muy importante: los tipos literales**.

---

## 1. Diferencia básica

- **`let`** → Variable que puede cambiar su valor.
    
- **`const`** → No se puede reasignar, el valor es fijo.
    

```ts
let edad = 20;
edad = 21; // ✅ permitido

const nombre = "Ulises";
nombre = "Carlos"; // ❌ error: no se puede reasignar
```

---

## 2. Inferencia de tipos

- Con **`let`**, TypeScript infiere un **tipo más amplio** (ejemplo: `string`).
    
- Con **`const`**, TypeScript infiere un **tipo literal** (ejemplo: `"Ulises"`).
    

```ts
let ciudad = "México";
// ciudad: string (puede cambiar a cualquier string)

const pais = "México";
// pais: "México" (literal, no puede ser otro valor)
```

Esto es lo que hace que `const` sea tan especial en TS 👉 se vuelve un **literal type** automáticamente.

---

## 3. Ejemplo con arrays y objetos

- Con `const` no puedes **reasignar** el array/objeto,  
    pero sí puedes **modificar su contenido** (a menos que uses `readonly`).
    

```ts
const numeros = [1, 2, 3];
numeros.push(4); // ✅ permitido
// numeros = [5,6]; ❌ error: no se puede reasignar todo el array
```

Si quieres que realmente sea inmutable, combinas con `readonly`:

```ts
const letras: readonly string[] = ["a", "b", "c"];
// letras.push("d"); ❌ error: no se puede modificar
```

---

## 4. Ejemplo práctico en React/TS

En React solemos usar **`const`** casi siempre, porque evita cambios accidentales:

```tsx
const App = () => {
  const nombre = "Ulises";
  let contador = 0;

  contador++; // ✅ permitido, cambia porque es let

  return <h1>Hola {nombre}, llevas {contador} clics</h1>;
};
```

---

