## Tema: **Objetos tipados**

En TypeScript podemos definir un **tipo para un objeto** usando `type` o `interface`. Esto asegura que los objetos tengan las propiedades correctas y tipos correctos.

---

### Ejemplo 1: usando `type`

```ts
import "./App.css";

type Persona = {
  nombre: string;
  edad: number;
  esEstudiante: boolean;
};

function App() {
  let persona: Persona = {
    nombre: "Ulises",
    edad: 28,
    esEstudiante: true,
  };

  return (
    <>
      <div>
        <h1>
          Nombre: {persona.nombre}, Edad: {persona.edad}, Estudiante:{" "}
          {persona.esEstudiante ? "Sí" : "No"}
        </h1>
      </div>
    </>
  );
}

export default App;
```

```jsx
import "./App.css";

type Producto = {
nombre: string;
precio: number;
disponible: boolean;
};

function App() {
let miProducto: Producto = {
nombre: "ulises",
precio: 21,
disponible: true,
};
return (
	<>
		<div>
			<h1>
			Producto: {miProducto.nombre} |
			Precio: {miProducto.precio} |
			Disponible: {miProducto.disponible ? "Sí" : "No"}
			</h1>
		</div>
	</>
);
}
export default App;
```
---
## Tema: **Interfaces**

Las **interfaces** son muy parecidas a los `type` para objetos, pero son más flexibles y se pueden extender.

---

### Ejemplo

```ts
import "./App.css";

interface Persona {
  nombre: string;
  edad: number;
  esEstudiante: boolean;
}

function App() {
  let persona: Persona = {
    nombre: "cocacola",
    edad: 28,
    esEstudiante: true,
  };

  return (
    <>
      <div>
        <h1>
          Nombre: {persona.nombre}, Edad: {persona.edad}, Estudiante:{" "}
          {persona.esEstudiante ? "Sí" : "No"}
        </h1>
      </div>
    </>
  );
}

export default App;
```

```jsx
import "./App.css";
interface Producto {
nombre: string;
precio: number;
disponible: boolean;
};

function App() {
let miProducto: Producto = {
nombre: "cocacola",
precio: 21,
disponible: true,
};

return (
	<>
		<div>
			<h1>
			Producto: {miProducto.nombre} |
			Precio: {miProducto.precio} |
			Disponible: {miProducto.disponible ? "Sí" : "No"}
			</h1>
		</div>
	</>
);
}
export default App;
```


💡 Tip adicional: en proyectos grandes, usar **interfaces** permite extenderlas fácilmente:

```ts
interface ProductoConDescuento extends Producto {
  descuento: number;
}
```

---
### 3. **Extender interfaces**

Ya lo mencionaste, pero podemos resumirlo:
```jsx
interface Producto {
  nombre: string;
  precio: number;
}

interface ProductoConDescuento extends Producto {
  descuento: number;
}

let prod: ProductoConDescuento = {
  nombre: "Coca-Cola",
  precio: 20,
  descuento: 5,
};

```

Permite crear tipos más específicos a partir de otros.

### 5. **Nested objects**

Objetos dentro de objetos:

```jsx
type Orden = {
  id: number;
  cliente: {
    nombre: string;
    correo: string;
  };
};

let orden: Orden = {
  id: 1,
  cliente: { nombre: "Ulises", correo: "ulises@mail.com" },
};

```

Permite definir estructuras complejas con seguridad de tipos.