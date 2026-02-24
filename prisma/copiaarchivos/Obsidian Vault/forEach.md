## 📝 Tema: `forEach` en Arrays

El método **`forEach`** permite **recorrer un array** y ejecutar una función por cada elemento.

- No devuelve un nuevo array (no transforma los datos).
- Se usa principalmente para **efectos secundarios**, como imprimir en consola o modificar variables externas.


### Sintaxis

```ts
array.forEach((elemento, indice?, arrayCompleto?) => {
  // Código a ejecutar
});
```

- `elemento`: el valor actual del array.

- `indice` (opcional): posición del elemento.

- `arrayCompleto` (opcional): el array original.


### Ejemplo básico

```ts
let numeros: number[] = [1, 2, 3];

numeros.forEach((num) => {
  console.log(num * 2);
});
```

**Salida:**

```
2
4
6
```

### Ejemplo con índice

```ts
let frutas: string[] = ["manzana", "plátano", "uva"];

frutas.forEach((fruta, i) => {
  console.log(`${i + 1}: ${fruta}`);
});
```

**Salida:**

```
1: manzana
2: plátano
3: uva
```

### Diferencias con `map`

- `forEach` **no devuelve nada**, solo ejecuta la función por cada elemento.
- `map` **devuelve un nuevo array** transformado.

