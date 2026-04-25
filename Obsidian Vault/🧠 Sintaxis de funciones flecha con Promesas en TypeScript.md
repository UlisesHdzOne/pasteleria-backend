### 📌 Ejemplo base

```ts
const esperar = (ms: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Esperé ${ms} milisegundos`), ms);
  });
};
```

---

### 🔍 Desglose de la sintaxis

|Parte|Significado|
|---|---|
|`const esperar =`|Declaración de una constante con una función flecha|
|`(ms: number)`|Parámetro que la función recibe (en este caso, un número)|
|`: Promise<string>`|Tipo de retorno: esta función devolverá una promesa que resuelve un string|
|`=> { ... }`|Cuerpo de la función flecha|
|`return new Promise(...)`|La función **realmente devuelve una promesa** creada manualmente|

---

### ❓ ¿El tipo `Promise<string>` es obligatorio?

No. TypeScript puede **inferir** el tipo automáticamente, pero:

✅ Es **buena práctica** declararlo porque:

- Hace el código más claro
    
- Ayuda al autocompletado y prevención de errores
    
- Es útil cuando se trabaja en equipo
    

---

### ⚙️ Equivalencia con función tradicional

```ts
function esperar(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Esperé ${ms} milisegundos`), ms);
  });
}
```

---

### 📘 Diferencias entre función flecha y función normal

|Función Flecha|Función Tradicional|
|---|---|
|Más concisa|Más detallada|
|No tiene su propio `this`|Tiene su propio `this`|
|Ideal para callbacks y promesas|Útil en métodos de clases/objetos|
|No se puede usar con `new`|Sí se puede usar con `new`|

---

> ✅ **Recomendación**: Usa funciones flecha cuando trabajes con promesas, callbacks, y funciones pequeñas.
