`useRef` es un hook de React que permite **almacenar valores mutables** que **no causan re-render** cuando cambian y también se utiliza para **referenciar elementos del DOM** directamente.

---

## 📦 ¿Qué hace `useRef`?

- Crea un **objeto persistente** entre renders.
- No provoca un re-render cuando su valor cambia.
- Tiene una única propiedad: `.current`.

---

## 🛠 Sintaxis

```tsx
const ref = useRef(valorInicial);
````

---

## 🧮 Usos comunes

### 1. Almacenar valores entre renders (sin re-renderizar)

```tsx
const contadorRef = useRef(0);
contadorRef.current += 1;
```

📌 Ideal para:

- Contadores internos.
    
- Referencias temporales.
    
- Controlar flags o temporizadores.
    

---

### 2. Acceder a elementos del DOM

```tsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus(); // Enfoca el input al montar el componente
}, []);
```

📌 Ideal para:

- Enfocar campos automáticamente.
    
- Leer valores de inputs sin `useState`.
    
- Controlar scroll, estilos o dimensiones.
    

---

## 🧰 Métodos comunes del DOM

### 🔤 Inputs

|Método / Propiedad|Descripción|
|---|---|
|`.value`|Obtener/modificar el valor.|
|`.focus()`|Poner el cursor en el input.|
|`.select()`|Seleccionar el texto.|
|`.disabled`|Habilitar/deshabilitar el campo.|

---

### 🧱 Divs / Spans / Elementos genéricos

|Método / Propiedad|Descripción|
|---|---|
|`.style`|Modificar estilos (`.style.color`).|
|`.classList.add()`|Añadir clases.|
|`.innerText` / `.textContent`|Leer/modificar contenido de texto.|
|`.getBoundingClientRect()`|Posición y tamaño en pantalla.|

---

### 📄 Otros útiles

|Método / Propiedad|¿Para qué sirve?|
|---|---|
|`.scrollIntoView()`|Hace scroll hasta el elemento.|
|`.clientHeight`|Altura visible del elemento.|
|`.offsetTop`|Posición vertical del elemento.|

---

## 🧠 Comparación con otras variables

|Tipo|Persiste entre renders|Provoca re-render|Visible en UI|
|---|---|---|---|
|`useState`|✅|✅|✅|
|`useRef`|✅|❌|❌|
|`let / const`|❌ (se reinician)|❌|❌|

---

## 📌 Cuándo usar `useRef`

✅ Úsalo cuando:

- Necesitas **guardar un valor interno** que no afecte la UI.
    
- Quieres acceder a un **elemento del DOM** directamente.
    
- No quieres que el componente **se re-renderice**.
    

❌ No lo uses si:

- El valor debe mostrarse en pantalla.
    
- Quieres que algo cambie en la UI cuando el valor cambie → usa `useState`.
    

---

## 📋 Ejemplo práctico

```tsx
function MiComponente() {
  const inputRef = useRef(null);
  const contador = useRef(0);

  const manejarClick = () => {
    contador.current += 1;
    console.log("Clicks:", contador.current);
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Escribe algo..." />
      <button onClick={manejarClick}>Contar y enfocar</button>
    </div>
  );
}
```

---

## 🧪 Tipos de datos permitidos

Puedes usar `useRef` con:

- Números
    
- Strings
    
- Objetos
    
- Arrays
    
- Elementos del DOM
    
- Funciones
    

---

## 🧠 Notas adicionales

- `useRef` mantiene su valor **durante todo el ciclo de vida del componente**.
    
- Es muy útil en lógica interna, timers, y animaciones.
    
- No es reactivo → cambiar `.current` no actualiza la vista.
    


Para resumir y complementar:

- **`useRef` es perfecto para guardar datos o estados “internos” que no necesitan disparar una actualización visual**, como un contador, el último valor de un temporizador, o el estado de una animación.
    
- **También es ideal para interactuar directamente con el DOM** y hacer cambios inmediatos (como enfocar un input, cambiar estilos, reproducir un video, manejar scroll, etc) sin necesidad de re-renderizar el componente.
    
- Por ejemplo, puedes cambiar el color de un elemento directamente con `ref.current.style.color = "red"` sin usar estado ni re-render.
    
