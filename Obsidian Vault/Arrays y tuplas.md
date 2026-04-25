
## 6️ Tipo básico: `array`

### Ejemplo

```ts
let numeros: number[] = [1, 2, 3, 4];
let nombres: string[] = ["Ulises", "Ana", "Pedro"];
```

- Puedes declarar arrays de un solo tipo (`number[]`, `string[]`).
    
- También puedes usar **uniones** para varios tipos:
    

```ts
let mezclado: (string | number)[] = [1, "dos", 3];
```

```jsx
import "./App.css";
function App() {
	let misFrutas: string[] = ["manzana", "durazno", "pera"];
	let numerosFavoritos: number[] = [1, 2, 3];
return (
<>
	<div>
		<h1>Mis Frutas: {misFrutas.join(", ")}</h1>
		<p>Mis números favoritos: {numerosFavoritos.join(", ")}</p>
	</div>
</>
);
}
export default App;
```
---

¡Perfecto! Vamos con **tuplas** (`tuple`) en TypeScript.

---

## 7️ Tipo básico: `tuple`

### Ejemplo

```ts
let persona: [string, number] = ["Ulises", 28];
```

- Una tupla es un **array con tipos fijos en un orden fijo**.
    
- En el ejemplo, el primer elemento **siempre** es `string` y el segundo **siempre** es `number`.
    

También puedes tener más elementos o combinaciones:

```ts
let producto: [string, number, boolean] = ["Coca-Cola", 18, true];
```

```jsx
import "./App.css";
function App() {
	let miTupla: [string, number, boolean] = ["Ulises", 18, true];
return (
	<>
		<div>
			<h1>
			Nombre:
			{miTupla[0]}, Edad:
			{miTupla[1]}, Estudiante:
			{miTupla[2] ? "Sí" : "No"}
			</h1>
		</div>
	</>
);
}
export default App;
```
---

### Métodos importantes para practicar en Nivel 1

1. [[push y pop]]  → agregar o eliminar elementos al final.
    
2. [[shift y unshift]]→ agregar o eliminar elementos al inicio.
    
3. [[forEach]] → recorrer el array.
    
4. [[map]] → crear un nuevo array transformando cada elemento.
    
5. [[filter]] → filtrar elementos según condición.
    
6. [[reduce]] → reducir el array a un solo valor (suma, multiplicación, concatenación).
    
7. [[join]] → unir los elementos en un string (ya lo viste).
    
8. [[readonly arrays]] → para practicar inmutabilidad.
9. [[some y every ]]en TypeScript
10. [[includes]] → para checar si un elemento existe en un array.
11. [[indexOf y  lastIndexOf]] → para buscar posiciones de elementos.
12. [[concat]] → unir arrays sin modificar los originales.
13. [[slice  y  splice]] → copiar o modificar arrays (útil para prácticas de inmutabilidad).
14. [[readonly con tuplas]] → no solo arrays, también las tuplas pueden ser inmutables: