```jsx
import { useState } from "react";

import "./App.css";

import Child from "./components/Child";

import HelloUser from "./components/HelloUser";

  

function App() {

const [displayName, setdisplayName] = useState("");

const [userName, setUserName] = useState("Ulises");

  

// Esta función se pasa al hijo para "recibir" el nombre

const handleLogin = (username) => {

setdisplayName(username);

};

  

return (

<div>

<h1>Ejemplo de Props padre </h1>

<h2>Hola {displayName || "invitado"}</h2>

  

<HelloUser userName={displayName} />

  

{/* Le pasamos la función al hijo */}

<Child onLogin={handleLogin} userName={displayName} />

</div>

);

}

  

export default App;
```


```jsx
import React from "react";

import "../App.css";

function HelloUser(props) {

const { userName } = props;

return <div className="hijo1">Hello User hermano {userName}</div>;

}

  

export default HelloUser;
```


```jsx
import { useState } from "react";

import "../App.css";

function Child(props) {

const handleClick = () => {

props.onLogin("Ulises");

};

  

return (

<div className="hijo2">

<h2>Soy un componente hijo</h2>

<p>Nombre de usuario: {props.userName}</p>

<button onClick={handleClick}>Login</button>

</div>

);

}

  

export default Child;
```