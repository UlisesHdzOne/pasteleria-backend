## 🔹 Propiedades opcionales, Optional Chaining y Nullish Coalescing

### 1️⃣ Propiedades opcionales (`?`)

- Permite que una propiedad de un objeto **no siempre esté presente**.

```ts
type Persona = {
  nombre: string;
  edad?: number;  // opcional
};

let persona1: Persona = { nombre: "Ulises" };       // ok
let persona2: Persona = { nombre: "Ana", edad: 25 }; // ok
```

**Tip:** Útil para datos que no siempre se conocen, como descuentos, notas o fechas de entrega.

---

### 2️⃣ Optional chaining (`?.`)

- Permite acceder a propiedades **de manera segura** sin provocar errores si la propiedad no existe.
    

```ts
type Persona = {
  nombre: string;
  direccion?: { calle: string; numero: number };
};

let persona: Persona = { nombre: "Ulises" };

console.log(persona.direccion?.calle); // undefined, sin error
```

---

### 3️⃣ Nullish coalescing (`??`)

- Asigna un valor **por defecto** solo si la variable es `null` o `undefined`.
    

```ts
type Producto = {
  nombre: string;
  precio: number;
  descuento?: number;
};

let producto1: Producto = { nombre: "Coca-Cola", precio: 10, descuento: 0.5 };
let producto2: Producto = { nombre: "Agua", precio: 5 };

console.log(producto1.descuento ?? 0); // 0.5
console.log(producto2.descuento ?? 0); // 0
```

---

### 4️⃣ Ejemplo en React

```tsx
function App() {
  type Producto = { nombre: string; precio: number; descuento?: number };

  let producto1: Producto = { nombre: "Coca-Cola", precio: 10, descuento: 0.5 };
  let producto2: Producto = { nombre: "Agua", precio: 5 };

  return (
    <>
      <div>
        <h1>
          Producto: {producto1.nombre} | Precio: {producto1.precio} | Descuento:{" "}
          {producto1.descuento ?? "sin descuento"}
        </h1>
        <h1>
          Producto: {producto2.nombre} | Precio: {producto2.precio} | Descuento:{" "}
          {producto2.descuento ?? "sin descuento"}
        </h1>
      </div>
    </>
  );
}
```

**Explicación:** combina propiedades opcionales (`?`), acceso seguro (`?.`) y valores por defecto (`??`) en un solo ejemplo práctico.

---

### ✅ Bonus

- Propiedades opcionales **no son lo mismo que `undefined` explícito**: pueden estar ausentes completamente.
    
- Muy útiles para **formularios, APIs y datos dinámicos**.
    
- Se pueden combinar con **readonly** o **literal types** para mayor seguridad.
    

---
