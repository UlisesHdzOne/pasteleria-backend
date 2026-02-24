# 🔹 Optional chaining (`?.`) y Nullish coalescing (`??`)

Estos son operadores modernos que **hacen más segura y legible la lectura de objetos y valores que podrían ser `null` o `undefined`**.

---

## 1️⃣ Optional chaining `?.`

Sirve para **acceder a propiedades de un objeto que podrían no existir** sin lanzar un error.

```ts
type Persona = {
  nombre: string;
  direccion?: {
    ciudad?: string;
  };
};

const persona: Persona = { nombre: "Ulises" };

console.log(persona.direccion?.ciudad); 
// undefined en vez de error
```

- Si `direccion` no existe, **no rompe el código** y devuelve `undefined`.
    
- Puedes usarlo también en **arrays y llamadas a funciones**:
    

```ts
const personas: Persona[] = [];
console.log(personas[0]?.nombre); // undefined

const saludo = persona.direccion?.saludar?.();
// undefined si no existe la función
```

---

## 2️⃣ Nullish coalescing `??`

Sirve para **dar un valor por defecto** solo si la variable es `null` o `undefined`.

```ts
let valor = null;
console.log(valor ?? "valor por defecto"); // "valor por defecto"

let edad = 0;
console.log(edad ?? 18); // 0 (porque 0 NO es null ni undefined)
```

- Diferencia con `||`:
    
    - `||` devuelve el valor por defecto si es _falsy_ (`0`, `""`, `false`, `null`, `undefined`)
        
    - `??` solo si es `null` o `undefined`
        

```ts
let numero = 0;
console.log(numero || 100); // 100
console.log(numero ?? 100); // 0
```

---

## 3️⃣ Ejemplo práctico con TS y React

```tsx
const App = () => {
  const usuario = { nombre: "Ulises", direccion: undefined };

  return (
    <>
      <h1>Ciudad: {usuario.direccion?.ciudad ?? "No especificada"}</h1>
    </>
  );
};
```

- `?.` evita errores al leer `direccion` que no existe.
    
- `??` da un valor por defecto `"No especificada"`.
    

---

✅ **Regla práctica:**

- Usa `?.` para acceder a propiedades opcionales de objetos o arrays.
    
- Usa `??` para valores que podrían ser `null` o `undefined` y necesitas un valor por defecto.
    

---

Si quieres, podemos hacer un **mini ejercicio práctico de Optional chaining + Nullish coalescing** para que lo pruebes tú mismo. ¿Quieres que lo haga?