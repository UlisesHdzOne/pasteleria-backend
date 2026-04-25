## 🧠 ¿Qué es el Spread Operator?

El **spread operator (`...`)** te permite **expandir** elementos de un array u objeto. Es útil para **copiar**, **combinar**, **actualizar** o **agregar datos** de forma sencilla.

---

## 🧩 Casos comunes de uso

### 1. **Copiar Arrays**

```ts
const numeros = [1, 2, 3];
const copia = [...numeros];

console.log(copia); // [1, 2, 3]
```

---

### 2. **Combinar Arrays**

```ts
const parte1 = [1, 2];
const parte2 = [3, 4];

const combinado = [...parte1, ...parte2];
console.log(combinado); // [1, 2, 3, 4]
```

---

### 3. **Agregar elementos a un Array**

```ts
const base = [2, 3];
const nuevo = [1, ...base, 4];

console.log(nuevo); // [1, 2, 3, 4]
```

---

### 4. **Copiar Objetos**

```ts
const persona = { nombre: "Lucía", edad: 25 };
const copiaPersona = { ...persona };

console.log(copiaPersona); // { nombre: 'Lucía', edad: 25 }
```

---

### 5. **Actualizar o agregar propiedades en un objeto**

```ts
const persona = { nombre: "Lucía", edad: 25 };
const actualizada = { ...persona, edad: 26, ciudad: "CDMX" };

console.log(actualizada); // { nombre: 'Lucía', edad: 26, ciudad: 'CDMX' }
```

---

### 6. **Combinar objetos**

```ts
const base = { nombre: "Lucía" };
const extra = { edad: 25, ciudad: "CDMX" };

const combinada = { ...base, ...extra };
console.log(combinada); // { nombre: 'Lucía', edad: 25, ciudad: 'CDMX' }
```

---

un ejemplo extra con desestructuración
```ts
const numeros = [1, 2, 3];
const [uno,...resto] = numeros;

console.log(uno)
console.log(resto)
```
