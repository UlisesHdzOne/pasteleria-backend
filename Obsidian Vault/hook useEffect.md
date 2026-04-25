En React, **efectos secundarios (side effects)** son **acciones que ocurren fuera del ciclo normal de renderizado** del componente, como interacciones con APIs, manipulación del DOM, temporizadores, etc.

Aquí tienes una lista organizada de **efectos secundarios comunes** que normalmente se manejan con `useEffect`:

---

### ✅ **Lista de Efectos Secundarios Comunes en React**

#### 🔁 1. **Llamadas a APIs o servidores**

- Obtener datos (`fetch`, `axios`)
    
- Enviar datos (POST, PUT, DELETE)
    

```tsx
useEffect(() => {
  fetch("/api/usuarios")
    .then(res => res.json())
    .then(data => setUsuarios(data));
}, []);
```

---

#### 🕒 2. **Temporizadores**

- `setTimeout`, `setInterval`
    
- Contadores automáticos, loaders, delays
    

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setMostrar(true);
  }, 2000);
  return () => clearTimeout(timer);
}, []);
```

---

#### 🔌 3. **Suscripciones**

- WebSockets, Firebase, sockets, eventos personalizados
    

```tsx
useEffect(() => {
  const socket = new WebSocket("ws://servidor");

  socket.onmessage = (e) => {
    setMensaje(e.data);
  };

  return () => socket.close();
}, []);
```

---

#### 🧠 4. **Manipulación directa del DOM**

- Cambiar clases, scroll, foco, estilos, etc.
    

```tsx
useEffect(() => {
  document.title = `Hola, ${usuario}`;
}, [usuario]);
```

---

#### 💾 5. **Sincronización con almacenamiento local**

- `localStorage`, `sessionStorage`
    

```tsx
useEffect(() => {
  localStorage.setItem("modoOscuro", JSON.stringify(modoOscuro));
}, [modoOscuro]);
```

---

#### 🧪 6. **Validaciones en tiempo real**

- Validar formularios al escribir
    

```tsx
useEffect(() => {
  if (correo.includes("@")) {
    setValido(true);
  } else {
    setValido(false);
  }
}, [correo]);
```

---

#### 🔁 7. **Reacciones a cambios de estado**

- Cuando cambia un `state` o `prop`, tomar alguna acción
    

```tsx
useEffect(() => {
  if (!logueado) {
    navigate("/login");
  }
}, [logueado]);
```

---

#### 🎯 8. **Eventos del navegador o teclado**

- Escuchar eventos globales: `keydown`, `resize`, etc.
    

```tsx
useEffect(() => {
  const manejarResize = () => setAncho(window.innerWidth);
  window.addEventListener("resize", manejarResize);

  return () => window.removeEventListener("resize", manejarResize);
}, []);
```

---

### 📌 ¿Qué tienen en común todos estos?

Son cosas que **no puedes (o no debes) hacer directamente dentro del cuerpo del componente**, porque deben ejecutarse:

- Solo una vez (cuando se monta),
    
- o en respuesta a un cambio (dependencias),
    
- o cuando se desmonta (limpieza).
    

---

Si quieres, podemos hacer ejercicios específicos con algunos de estos efectos. ¿Cuál te gustaría practicar primero?


un ejemplo mas completo:
```tsx
import { useState, useEffect } from "react";

  

function FormularioEmail() {

const [email, setEmail] = useState("");

const [correoValido, setCorreoValido] = useState(false);

const [codigoPostal, setCodigoPostal] = useState("");

const [cpValido, setCpValido] = useState(false);

  

useEffect(() => {

const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

setCorreoValido(regexCorreo.test(email));

}, [email]);

  

useEffect(() => {

const regexCPMexico = /^[0-9]{5}$/;

const regexCPUSA = /^[0-9]{5}(-[0-9]{4})?$/;

setCpValido(

regexCPMexico.test(codigoPostal) || regexCPUSA.test(codigoPostal)

);

}, [codigoPostal]);

  

return (

<div style={{ padding: "1rem", maxWidth: "400px", margin: "auto" }}>

<h2>Formulario de Email</h2>

  

<div style={{ marginBottom: "1rem" }}>

<input

type="text"

placeholder="Escribe tu correo"

value={email}

onChange={(e) => setEmail(e.target.value)}

style={{ width: "100%", padding: "0.5rem" }}

/>

{email !== "" && (

<p>

Estado del correo:{" "}

{correoValido ? "✅ Correo válido" : "❌ Correo inválido"}

</p>

)}

</div>

  

<div style={{ marginBottom: "1rem" }}>

<input

type="text"

placeholder="Código Postal"

value={codigoPostal}

onChange={(e) => setCodigoPostal(e.target.value)}

style={{ width: "100%", padding: "0.5rem" }}

/>

{codigoPostal !== "" && (

<p>Código Postal: {cpValido ? "✅ Válido" : "❌ Inválido"}</p>

)}

</div>

  

<button disabled={!(correoValido && cpValido)}>Enviar</button>

</div>

);

}

  

export default FormularioEmail;
```