 **Callbacks tipadas**, es decir, funciones que **reciben otra función como parámetro** y queremos asegurarnos de tipar tanto los parámetros como el retorno del callback.

Por ejemplo, imagina que quieres procesar un número con cualquier operación que tú decidas:

```ts
function procesarNumero(num: number, callback: (valor: number) => number): number {
  return callback(num);
}

// Uso
const resultado = procesarNumero(5, (x) => x * 2); // 10
console.log(resultado);
```

- `num: number` → número a procesar
    
- `callback: (valor: number) => number` → función que recibe un número y devuelve un número
    
- Retorno de `procesarNumero` → número
    
---
Esto es justamente lo que hace un **callback**: la función que pasas como parámetro es **otra función** que se ejecuta dentro de tu función principal.

Para desglosarlo:

```ts
function procesarNumero(num: number, callback: (valor: number) => number): number {
  return callback(num);
}
```

1. `num: number` → es un número normal que le pasas.
2. `callback: (valor: number) => number` → aquí **tipas la función que le vas a pasar**:
    - `(valor: number)` → la función que pasas recibirá un número
    - `=> number` → esa función debe retornar un número
3. `return callback(num)` → la función que pasaste se ejecuta usando `num` y su resultado es el que retorna `procesarNumero`.

---
```jsx
import "./App.css";

function App() {

const aplicarOperacion = (
numero: number,
callback: (valor: number) => number
): number => {
return callback(numero);
};

let r1 = aplicarOperacion(5, (valor) => valor * 2);
console.log(r1);

return (
	<>
		<div>{r1}</div>
	</>
);
}
export default App;
```