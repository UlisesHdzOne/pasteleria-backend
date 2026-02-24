**Funciones que retornan otras funciones**.

En TypeScript puedes crear **higher-order functions**, es decir, funciones que **devuelven otra función**. Esto permite crear funciones más dinámicas y reutilizables.

---

### 🔹 Ejemplo básico

```ts
function crearMultiplicador(factor: number): (num: number) => number {
  return (num: number) => num * factor;
}

const duplicar = crearMultiplicador(2);
console.log(duplicar(5)); // 10

const triplicar = crearMultiplicador(3);
console.log(triplicar(5)); // 15
```

**Explicación:**

- `crearMultiplicador` recibe un `factor` (número).
    
- Retorna **una nueva función**: `(num: number) => num * factor`.
    
- La función retornada toma otro número y lo multiplica por el `factor`.
    
- Esto permite crear funciones específicas como `duplicar` o `triplicar` sin repetir código.
    

---

### 🔹 Ejemplo con función flecha

```ts
const crearSaludo = (saludo: string): ((nombre: string) => string) => {
  return (nombre: string) => `${saludo} ${nombre}`;
};

const saludoHola = crearSaludo("Hola");
console.log(saludoHola("Ulises")); // Hola Ulises
```

- El tipo de retorno `((nombre: string) => string)` indica que **la función retornada recibe un string y devuelve un string**.
    

---

💡 **Tip:** Este patrón se usa mucho para **configuraciones**, **event handlers**, y cuando quieres crear **funciones especializadas** a partir de una función genérica.

---
```jsx

import "./App.css";
function App() {
const crearPotenciador = (exponente: number):
((num: number) => number) => {
return (num: number) => Math.pow(num, exponente);
};

let r1 = crearPotenciador(5);
let resultado = r1(2);
console.log(resultado);
console.log(r1(5));

return (
	<>
		<h1>{resultado}</h1>
	</>
);
}

export default App;
```