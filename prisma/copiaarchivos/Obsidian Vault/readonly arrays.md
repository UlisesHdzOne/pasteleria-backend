## 📝 Tema: `readonly` en Arrays

El modificador **`readonly`** en TypeScript se usa para **proteger un array** y evitar que sus elementos sean modificados después de la creación.

### Sintaxis

```ts
let miArray: readonly Tipo[] = [elementos...];
```

- **`readonly`** impide usar métodos que **modifiquen el array**, como:
    
    - `push()`
        
    - `pop()`
        
    - `shift()`
        
    - `unshift()`
        
    - `splice()`
        
    - `sort()`
        
- Solo puedes **leer** o **iterar** sobre los elementos.
    

### Ejemplos

```ts
let numeros: readonly number[] = [1, 2, 3];

numeros.push(4); // ❌ Error: no se puede modificar
numeros[0] = 10; // ❌ Error: no se puede modificar

console.log(numeros[0]); // 1 ✅
```

```ts
let frutas: readonly string[] = ["manzana", "plátano", "uva"];

// Solo lectura
frutas.forEach((fruta) => console.log(fruta));
```

### Uso común

- Proteger datos que **no deben cambiar** después de inicializarse.
    
- Garantizar que funciones **no modifiquen los arrays recibidos**.
    

---
