### 🧱 ¿Qué es un objeto?

Un objeto es una colección de pares clave-valor. En TypeScript, además de la estructura, también definimos **tipos** para asegurar que cada propiedad sea del tipo correcto.

---

### 📝 Declaración básica

```ts
const persona = {
  nombre: 'Lucía',
  edad: 25,
  activa: true
};
```

---

### 📐 Tipado de objetos

```ts
type Persona = {
  nombre: string;
  edad: number;
  activa: boolean;
};

const usuario: Persona = {
  nombre: 'Carlos',
  edad: 30,
  activa: false
};
```

---

### 🧾 Tipado en línea (sin `type` o `interface`)

```ts
const producto: { nombre: string; precio: number } = {
  nombre: 'Laptop',
  precio: 1200
};
```

---

### 🧱 Objetos con arrays

```ts
type Curso = {
  titulo: string;
  estudiantes: string[];
};

const curso: Curso = {
  titulo: 'JavaScript',
  estudiantes: ['Ana', 'Luis']
};
```

---

### 🧩 Objetos anidados

```ts
type Pelicula = {
  titulo: string;
  director: {
    nombre: string;
    nacionalidad: string;
  };
};

const pelicula: Pelicula = {
  titulo: 'El laberinto del fauno',
  director: {
    nombre: 'Guillermo del Toro',
    nacionalidad: 'Mexicana'
  }
};
```

---

### 🔄 Desestructuración de objetos

```ts
const { nombre, edad } = usuario;
console.log(nombre, edad);
```

Con alias:

```ts
const { nombre: nombreUsuario } = usuario;
console.log(nombreUsuario);
```

---

### 🔁 Iterar sobre arrays de objetos

```ts
const usuarios: Persona[] = [
  { nombre: 'Lucía', edad: 22, activa: true },
  { nombre: 'Pedro', edad: 16, activa: false }
];

usuarios.forEach(({ nombre, edad }) => {
  console.log(`${nombre} tiene ${edad} años`);
});
```

---

### ✅ Ventajas en TypeScript

- Seguridad de tipos.
    
- Autocompletado en editores.
    
- Prevención de errores en tiempo de desarrollo.
    

---
