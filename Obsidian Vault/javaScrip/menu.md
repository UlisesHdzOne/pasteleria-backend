practiquemos ya que no se me das un ejempo y lego el reto por ahora vamos a practicar y cuanddo me des un ejercicio lo realizo y no me ayudas en hacerlo y cuando lo termmine te lo paso y me das feedback para que yo pueda ir mejorando

### 🟢 Nivel 1 Base de TypeScript --> tipos y estructuras básicas

Antes de meterlo en React, necesitas lo mínimo de TS.

- [[Tipos básicos]] (`string`, `number`, `boolean`, `null`, `undefined`).
- [[const vs let]] → inferencia de tipos y _literal types_.
-  [[Literal types]]: valores exactos (`let carga: "pendiente" | "completo"`)
-  [[Const assertions]] (as const) → valores literales inmutables.   
- [[ Uniones y opcionales ]](`number | string`)
- [[Propiedades opcionales, Optional Chaining y Nullish Coalescing]]
- [[any y unknown]]
-  [[Arrays y tuplas]]  (metodos de array)
-  [[Objetos con type o interface]]  
-  [[Readonly]]: arrays u objetos que no se deben modificar
- [[spread operator para copiar y combinar arrays objetos]]
- [[Enums]]
- [[convenciones de nombres]] (camelCase, PascalCase)

- [[Void y never]] → para funciones simples y errores.

---

### 🟡 Nivel 2: Funciones → funciones y sus variaciones/avanzadas

#### 🔹 Tipar parámetros y retornos
- [[Básicos]]: `number`, `string`, `boolean`, `void`, uniones simples (`number | string`)
- [[Avanzados]]: arrays (`number[]`), objetos (`type` / `interface`), funciones como parámetros (callbacks), funciones que retornan otras funciones, tipos genéricos (`<T>`)
#### 🔹 [[Funciones flecha tipadas (incluye inline typing)]]
- Sintaxis flecha con parámetros y retorno tipado
- Ejemplos con `void` y valores
#### 🔹 [[Parámetros opcionales]]
- Uso de `?` para indicar que el parámetro puede no ser pasado
#### 🔹[[ Parámetros por defecto]]
- Valores asignados automáticamente si no se pasan al llamar la función
#### 🔹 [[Rest parameters]]
- Recibir un número indefinido de argumentos como un array
#### 🔹 [[Spread en llamadas y rest parameters]]
- Expandir arrays al llamar funciones, relacionado con rest parameters
#### 🔹 [[Funciones genéricas básicas]]
- Uso de `<T>` para trabajar con distintos tipos manteniendo seguridad de TS
#### 🔹 [[Callbacks tipadas]]
- Funciones que reciben otra función como parámetro con tipos claros
#### 🔹 [[Funciones que retornan otras funciones]]
- Higher-order functions, tipado de parámetros y retorno de ambas funciones
#### 🔹 [[Overloads de funciones]] (sobrecarga)
- Diferentes combinaciones de parámetros y tipos de retorno
#### 🔹 [[Funciones anónimas e inline typing]]
- Declaración inline con tipado directo de parámetros y retorno
#### 🔹 [[Funciones async y Promises tipadas]]
- Tipar funciones asíncronas y el valor devuelto por Promises
#### 🔹 [[Destructuring en TypeScript]]
- Tipar directamente los parámetros desestructurados de objetos y arrays
---

### 🔵 Nivel 3: React básico + TS
pnpm chacar?

- Tipar `props` en componentes.
    
- Tipar `children`.
    
- Tipar `useState`:
    
    ```tsx
    const [count, setCount] = useState<number>(0);
    ```
    

👉 Ejercicio: haz un componente `Counter` con un estado numérico.

---

### 🟣 Nivel 4: React avanzado

- Tipar eventos (`React.MouseEvent`, `React.ChangeEvent`).
    
- Tipar refs (`useRef<HTMLInputElement>`).
    
- Tipar `useReducer`.
    
- Tipar custom hooks.  
    👉 Ejercicio: un formulario con `useReducer` y tipos claros.
    

---

### 🔥 Nivel 5: Patrones y pro

- Tipos genéricos (`<T>`).
    
- Tipos utilitarios (`Pick`, `Partial`, `Omit`, `Record`).
    
- Context API con TS.
    
- Props condicionales y discriminated unions.  
    👉 Ejercicio: un `Modal` que recibe props distintas según el tipo (`"alert"` o `"confirm"`).
    

---


---

# 📘 Temario HTML & CSS Básico

## 1. Estructura básica de un documento HTML

- `<!DOCTYPE html>` → Define el tipo de documento.
- `<html>` → Raíz del documento.
- `<head>` → Información de la página (no visible).
    - `<title>` → Título de la página.
    - `<link>` → Vincula hojas de estilo externas.
    - `<meta>` → Metadatos.
- `<body>` → Contenido visible de la página.
    - `<header>` → Encabezado del sitio.
    - `<section>` → Sección de contenido.
    - `<footer>` → Pie de página.
---

## 2. Texto y contenido

- Encabezados: `<h1>` a `<h6>`.
- Párrafo: `<p>`.
- Negritas: `<strong>` o `<b>`.
- Cursiva / énfasis: `<em>` o `<i>`.
- Enlaces: `<a href="...">`.
- Imágenes: `<img src="..." alt="...">`.
- Contenedor genérico: `<div>`.
- Agrupación semántica: `<span>` (texto en línea).

---

## 3. Listas

- Lista desordenada: `<ul>` → `<li>`.
- Lista ordenada: `<ol>` → `<li>`.
- Lista de definición: `<dl>` → `<dt>` (término) y `<dd>` (definición).

---

## 4. Tablas

- `<table>` → Contenedor de tabla.
- `<thead>` → Cabecera.
- `<tbody>` → Cuerpo.
- `<tfoot>` → Pie de tabla.
- `<tr>` → Fila.
- `<th>` → Celda de encabezado.
- `<td>` → Celda de datos.

---

## 5. Formularios

- `<form>` → Contenedor del formulario.
- `<label>` → Etiqueta para un campo.
- `<input>` → Campo de entrada.
- `<textarea>` → Texto multilínea.
- `<select>` → Lista desplegable.
- `<option>` → Opción del select.
- `<button>` → Botón.

---

# 🎨 CSS Básico

## 1. Selectores

- Por elemento: `p { color: red; }`.
- Por clase: `.titulo { font-size: 20px; }`.
- Por id: `#menu { background: black; }`.
- Universal: `* { margin: 0; }`.
- Descendiente: `div p { ... }`.

---

## 2. Colores y fondos

- `color` → color del texto.
- `background-color` → color de fondo.
- `background-image` → imagen de fondo.

---

## 3. Box model

- `margin` → espacio exterior.
- `padding` → espacio interior.
- `border` → borde.

---

## 4. Display y posición

- **Display**:
- `block`, `inline`, `flex`, `grid`, `none`.
- **Posición**:
- `static`, `relative`, `absolute`, `fixed`, `sticky`.

---

## 5. Flexbox (para layouts en fila/columna)

- `display: flex`.
- `flex-direction`.
- `justify-content`.
- `align-items`.
- `align-self`.
- `flex-grow`, `flex-shrink`, `flex-basis`.

---

## 6. Grid (para layouts en dos dimensiones)

- `display: grid`.
- `grid-template-columns`.
- `grid-template-rows`.
- `column-gap`, `row-gap`.
- `grid-column`, `grid-row`.
- `grid-area`.

---



----
- [[Selectores]] → Cómo decirle a CSS _qué_ elemento quieres modificar.
    
- [[Colores y fondos]] → Jugar con texto y fondos para ver cambios rápidos.
    
- **[[Box mode]]l** → Margen, padding, border (clave para maquetar).
    
- **Display y posición** → Cómo se comportan los elementos (bloques, en línea, flotando, fijos, etc.).
    
- **Flexbox** → Layout en filas y columnas.
    
- **Grid** → Layout en dos dimensiones.


