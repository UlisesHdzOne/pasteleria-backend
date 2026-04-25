sintaxis

```tsx
{
condición 
? jsx_si_true 
: jsx_si_false
}
```

```tsx
{
  ver 
   ? <h1>Este es el nombre: {nombre}</h1> 
   : <h2>No hay nombre para mostrar</h2>
}
```


```tsx
import { useState } from "react";
import { ComponenteHijo2 } from "./componentsM/ComponenteHijo2";
function App() {
const [nombre,setNombre] = useState('');
const [ver,setVer] = useState(true);
const padre='jose';
const handleName = (nombre: string) => {
setNombre(nombre);
};
const handleVer =()=>{
setVer(!ver)
}
return(
<>
{
ver === true && <h1>este es el nombre : {nombre}</h1>
}
<ComponenteHijo2 onNameClick={handleName} nombre={padre}/>
<button
onClick={handleVer}
>{
ver===true
? 'ocultar'
: 'ver'
}</button>
</>
)
}
export default App;

```

aquí hay un ejemplo del ternario
[[Ejemplo usando .map() y desestructuración]]
