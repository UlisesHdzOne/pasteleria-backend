## 📝 Tema: `join()` en Arrays

El método **`join()`** se usa para **unir todos los elementos de un arreglo en una sola cadena de texto**.

### Sintaxis

```ts
array.join(separador?: string): string
```

- **`separador`** _(opcional)_: el carácter o cadena que se usará entre cada elemento.
    
- Si no se especifica, por defecto usa la **coma (`,`)**.
    

### Ejemplos

```ts
let frutas = ["manzana", "plátano", "uva"];

frutas.join();        // "manzana,plátano,uva"
frutas.join(" - ");   // "manzana - plátano - uva"
frutas.join("");      // "manzanaplatánouva"
```

### Ejemplo con números

```ts
let numeros = [1, 2, 3, 4];

numeros.join(" * ");  // "1 * 2 * 3 * 4"
```

### Uso común

- Mostrar listas en pantalla.
    
- Convertir arrays en texto legible.
    
- Preparar cadenas para guardarlas o enviarlas.
    

