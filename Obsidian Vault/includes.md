## 🔹 Método `includes`

- **Propósito:** Revisar si un array **contiene un valor**.
    
- **Retorna:** `true` si el valor está, `false` si no.
    

```ts
let frutas: string[] = ["manzana", "pera", "uva"];

console.log(frutas.includes("pera")); // true
console.log(frutas.includes("durazno")); // false
```

- También funciona con arrays de números:
    

```ts
let numeros: number[] = [1, 2, 3, 4, 5];
console.log(numeros.includes(3)); // true
console.log(numeros.includes(10)); // false
```

- Es **case-sensitive** (distingue mayúsculas de minúsculas):
    

```ts
console.log(frutas.includes("Pera")); // false
```
