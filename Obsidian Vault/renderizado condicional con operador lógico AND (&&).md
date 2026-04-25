sintaxis
```
condición && <JSX />
```

ejemplo:

```tsx
{
ver === true && <h1>este es el nombre : {nombre}</h1>
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
>ocultar / ver </button>
</>
) 
}

  

export default App;
```