## 1. ¿Qué es destructuring?

Es una sintaxis de JavaScript (y también TypeScript) que permite **extraer valores** de objetos o arreglos de forma más sencilla y legible.

```ts
const persona = { nombre: "Ana", edad: 25 };

// Sin destructuring
const nombre1 = persona.nombre;
const edad1 = persona.edad;

// Con destructuring
const { nombre, edad } = persona;
```

---

## 2. Destructuring en arreglos

Se puede extraer por posición:

```ts
const numeros = [10, 20, 30];

// Sin destructuring
const primero = numeros[0];
const segundo = numeros[1];

// Con destructuring
const [a, b] = numeros; // a = 10, b = 20
```

También se pueden omitir elementos:

```ts
const [primero, , tercero] = numeros; 
// primero = 10, tercero = 30
```

---

## 3. Destructuring en objetos

Se extraen propiedades por nombre:

```ts
const libro = { titulo: "1984", autor: "Orwell", anio: 1949 };

// Con destructuring
const { titulo, autor } = libro;
console.log(titulo); // "1984"
console.log(autor);  // "Orwell"
```

Se pueden asignar **alias**:

```ts
const { titulo: t, autor: a } = libro;
console.log(t); // "1984"
console.log(a); // "Orwell"
```

---

## 4. Valores por defecto

Si una propiedad puede faltar, se le puede asignar un valor por defecto:

```ts
const config = { idioma: "es" };

const { idioma, darkMode = false } = config;
console.log(idioma);    // "es"
console.log(darkMode);  // false
```

---

## 5. Destructuring en funciones

Una función puede recibir un **objeto completo** y luego usar destructuring directamente en los parámetros.

### Sin destructuring:

```ts
type Usuario = {
  nombre: string;
  edad: number;
};

function saludar(usuario: Usuario) {
  console.log(`Hola ${usuario.nombre}, tienes ${usuario.edad} años`);
}
```

### Con destructuring:

```ts
type Usuario = {
  nombre: string;
  edad: number;
};

function saludar({ nombre, edad }: Usuario) {
  console.log(`Hola ${nombre}, tienes ${edad} años`);
}
```

---

## 6. Ventajas del destructuring en parámetros

- Código más corto y legible.
- Evita repetir `objeto.propiedad`.
- Permite usar valores por defecto en parámetros.

Ejemplo con valor por defecto:

```ts
type Config = {
  idioma: string;
  darkMode?: boolean;
};

function configurar({ idioma, darkMode = false }: Config) {
  console.log(`Idioma: ${idioma}, Modo oscuro: ${darkMode}`);
}
```

---

## 7. Destructuring en arreglos dentro de funciones

También funciona con arrays:

```ts
function mostrarPares([a, b]: [number, number]) {
  console.log(`Par: ${a}, ${b}`);
}

mostrarPares([10, 20]); // Par: 10, 20
```

---

## 8. Resumen rápido

- **Objetos**: extraen por nombre → `{ propiedad }`.
- **Arrays**: extraen por posición → `[pos0, pos1]`.
- **En funciones**: destructuring en parámetros evita escribir `objeto.propiedad`.
- **Valores por defecto**: permiten inicializar cuando falta una propiedad.
    

---

