### 🔹 **Spread en llamadas y rest parameters**

Es muy parecido al que acabas de hacer, pero aplicado al momento de **llamar funciones** en lugar de definirlas.

Ejemplo sencillo:

```tsx
import "./App.css";

function App() {
  let sumar = (...numeros: number[]): number => {
    return numeros.reduce((a, b) => a + b, 0);
  };

  let lista = [1, 2, 3, 4, 5];

  // Usando spread al llamar la función
  let resultado = sumar(...lista);

  return (
    <>
      <div>{resultado}</div>
    </>
  );
}

export default App;
```

🔑 La idea:

- `rest parameters (...)` → para **recibir** parámetros infinitos en la función.
    
- `spread (...)` → para **expandir** un array o conjunto de valores al **llamar** la función.
    

```jsx
import "./App.css";
function App() {
  let multiplicarNumeros = (...base: number[]): number => {
    return base.reduce((acumulador, valorActual) => acumulador * valorActual, 1);
  };

  let arregloNumeros: number[] = [2, 3, 4, 5];
  let r1 = multiplicarNumeros(2, 3, 4);
  let r2 = multiplicarNumeros(...arregloNumeros);

  return (
    <>
      <div>{r1}</div>
      <div>{r2}</div>
    </>
  );
}
export default App;

```