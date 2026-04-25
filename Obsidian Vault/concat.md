## 🔹 `concat`

- Sirve para **unir dos o más arrays** en uno nuevo.
- **No modifica** los arrays originales.

### Ejemplo con TypeScript:

```ts
let numeros1: number[] = [1, 2, 3];
let numeros2: number[] = [4, 5, 6];

let todos: number[] = numeros1.concat(numeros2);

console.log(todos); // [1, 2, 3, 4, 5, 6]
console.log(numeros1); // [1, 2, 3] → original no cambia
console.log(numeros2); // [4, 5, 6] → original no cambia
```

### Con strings:

```ts
let frutas1: string[] = ["manzana", "pera"];
let frutas2: string[] = ["uva", "durazno"];

let todasLasFrutas: string[] = frutas1.concat(frutas2);

console.log(todasLasFrutas); // ["manzana", "pera", "uva", "durazno"]
```

---

⚡ **Tip:** También puedes concatenar **más de dos arrays** al mismo tiempo:

```ts
let arr1 = [1];
let arr2 = [2];
let arr3 = [3];

let combinado = arr1.concat(arr2, arr3); // [1,2,3]
```

---
