```jsx
import { useState } from "react";

  

const validateField = (name, value) => {

return validators[name] ? validators[name](value) : "";

};

  

// 🔹 Validadores por campo en un objeto

const validators = {

username: (value) => {

if (!value.trim()) return "El usuario es obligatorio";

if (value.length < 3) return "El usuario debe tener al menos 3 caracteres";

return "";

},

password: (value) => {

if (!value.trim()) return "La contraseña es obligatoria";

if (value.length < 6)

return "La contraseña debe tener al menos 6 caracteres";

return "";

},

email: (value) => {

if (!value.trim()) return "El email es obligatorio";

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!regex.test(value)) return "El email no es válido";

return "";

},

};

  

function App() {

const [user, setUser] = useState({

username: "",

password: "",

email: "",

});

  

const [errors, setErrors] = useState({

username: "",

password: "",

email: "",

});

  

// 🔹 Estado para mostrar/ocultar contraseña

const [showPassword, setShowPassword] = useState(false);

  

const handleSubmit = (e) => {

e.preventDefault();

  

// Validar todos los campos

const newErrors = Object.fromEntries(

Object.entries(user).map(([key, value]) => [

key,

validateField(key, value),

])

);

  

setErrors(newErrors);

  

const isValid = Object.values(newErrors).every((error) => error === "");

if (isValid) {

console.log("Formulario válido:", user);

} else {

console.log("Formulario inválido");

}

};

  

const handleChange = (e) => {

const { name, value } = e.target;

setUser({

...user,

[name]: value,

});

  

// Validación en tiempo real

setErrors((prev) => ({

...prev,

[name]: validateField(name, value),

}));

};

  

return (

<div>

<h1>Formularios</h1>

  

<form onSubmit={handleSubmit}>

<fieldset>

<label htmlFor="username">Usuario</label>

<input

type="text"

name="username"

id="username"

onChange={handleChange}

value={user.username}

required

/>

{errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

</fieldset>

  

<fieldset>

<label htmlFor="password">Contraseña</label>

<div style={{ display: "flex", alignItems: "center" }}>

<input

type={showPassword ? "text" : "password"}

name="password"

id="password"

onChange={handleChange}

value={user.password}

required

/>

  

<button

type="button"

onClick={() => setShowPassword((prev) => !prev)}

style={{ marginLeft: "10px" }}

>

{showPassword ? "Ocultar" : "Mostrar"}

</button>

</div>

{errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

</fieldset>

  

<fieldset>

<label htmlFor="email">Email</label>

<input

type="email"

name="email"

id="email"

onChange={handleChange}

value={user.email}

required

/>

{errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

</fieldset>

  

<button type="submit">Enviar</button>

</form>

<button

onClick={() => {

setUser({ username: "", password: "", email: "" });

setErrors({ username: "", password: "", email: "" });

}}

>

Logout

</button>

</div>

);

}

  

export default App;
```