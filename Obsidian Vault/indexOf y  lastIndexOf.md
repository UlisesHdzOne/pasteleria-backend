## 🔹 `indexOf`

- Devuelve **el índice de la primera aparición** de un elemento en el array.
- Si no lo encuentra, devuelve `-1`.

```ts
let frutas: string[] = ["manzana", "pera", "uva", "pera"];

console.log(frutas.indexOf("pera")); // 1
console.log(frutas.indexOf("durazno")); // -1
```

---

## 🔹 `lastIndexOf`

- Devuelve **el índice de la última aparición** de un elemento en el array.
- Si no lo encuentra, devuelve `-1`.

```ts
console.log(frutas.lastIndexOf("pera")); // 3
console.log(frutas.lastIndexOf("durazno")); // -1
```

---

⚡ **Nota:**

- Ambos métodos funcionan con arrays de cualquier tipo (`string[]`, `number[]`, etc.).
- Son sensibles a mayúsculas/minúsculas para strings.

---
