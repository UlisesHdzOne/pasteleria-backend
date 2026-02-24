## 🔹 Void y Never

En TypeScript, estas palabras clave se usan para describir el tipo de retorno de funciones, pero tienen **significados distintos**.

---

### 1️⃣ `void` → funciones que **no retornan nada**

- Se usa cuando una función **no devuelve un valor**.
    
- Equivale a “retorno vacío”.
    

```ts
function saludar(nombre: string): void {
  console.log(`Hola, ${nombre}`);
}

saludar("Ulises"); // imprime: Hola, Ulises
```

- También se puede usar con funciones flecha:
    

```ts
const despedir = (nombre: string): void => {
  console.log(`Adiós, ${nombre}`);
};
```

**Puntos clave:**

- No retorna nada, pero sí puede ejecutar código (como `console.log`).
    
- No confundir con `undefined` o `null`.
    

---

### 2️⃣ `never` → funciones que **nunca retornan**

- Se usa para funciones que **nunca terminan normalmente**:
    
    - Lanzan un error.
        
    - Entran en un bucle infinito.
        

```ts
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}
```

- También ejemplos con bucles infinitos:
    

```ts
function bucleInfinito(): never {
  while (true) {
    console.log("Esto nunca termina");
  }
}
```

**Puntos clave:**

- `never` indica que la función **nunca llega a un retorno exitoso**.
    
- Útil para errores críticos o funciones que terminan el programa.
    

---

### 🔹 Resumen rápido

|Tipo|Retorno de la función|
|---|---|
|`void`|No retorna nada, ejecución normal.|
|`never`|Nunca retorna, lanza error o bucle infinito.|

---

Si quieres, puedo hacerte la **versión final consolidada de Nivel 1** con todos los temas, ejemplos y bonus, lista para Obsidian, incluyendo **Void y Never**.

¿Quieres que haga eso?