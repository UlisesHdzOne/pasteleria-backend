## 🟢 Tema nuevo: `slice()` y `splice()`

### `slice()`

- Crea un **nuevo array** copiando parte del array original.
- **No modifica** el array original.
- **Sintaxis:**


```ts
let arr = [1, 2, 3, 4, 5];
let nuevoArr = arr.slice(1, 4); // [2,3,4]
```

- Primer parámetro: índice inicial (incluido).
- Segundo parámetro: índice final (excluido).
- Se pueden usar números negativos para contar desde el final.

---

### `splice()`

- **Modifica el array original**, eliminando o agregando elementos.
- **Sintaxis:**

```ts
let arr = [1, 2, 3, 4, 5];
let eliminados = arr.splice(1, 2); // elimina 2 elementos desde el índice 1
console.log(arr); // [1,4,5]
console.log(eliminados); // [2,3]
```

- Primer parámetro: índice donde empezar.
- Segundo parámetro: cuántos elementos eliminar.
- Parámetros opcionales siguientes: elementos a agregar.

```ts
arr.splice(1, 2, 10, 20); // elimina 2 elementos y agrega 10,20
```

