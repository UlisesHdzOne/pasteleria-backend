componente padre

```tsx
import { useState } from "react";
import { ComponenteHijo } from "./components/ComponenteHijo";

function App() {
  const [mensaje, setMensaje] = useState("");

  const handleSaludo = (mensaje: string) => {
    setMensaje(mensaje);
  };

  return (
    <div>
      <h1>Ejemplo de props de todos los tipos</h1>
      <p>Mensaje recibido del hijo: {mensaje}</p>

      <ComponenteHijo
        nombre="Ulises"
        edad={25}
        activo={true}
        hobbies={["Leer", "Programar", "Correr"]}
        direccion={{ calle: "Av. Principal", ciudad: "Ciudad de México" }}
        saludar={handleSaludo}
      >
        <p>Esto es un children enviado desde el padre.</p>
        <button>Otro botón dentro del hijo</button>
      </ComponenteHijo>
    </div>
  );
}

export default App;

```

componente hijo

```tsx
interface ComponenteHijoProps {
  nombre: string;
  edad: number;
  activo: boolean;
  hobbies: string[];
  direccion: {
    calle: string;
    ciudad: string;
  };
  saludar: (mensaje: string) => void;
  children?: React.ReactNode;
}

export const ComponenteHijo = ({
  nombre,
  edad,
  activo,
  hobbies,
  direccion,
  saludar,
  children,
}: ComponenteHijoProps) => {
  return (
    <div style={{ border: "2px solid gray", padding: "1rem", marginTop: "1rem" }}>
      <h3>Nombre: {nombre}</h3>
      <p>Edad: {edad}</p>
      <p>Estado: {activo ? "Activo" : "Inactivo"}</p>
      <p>Hobbies:</p>
      <ul>
        {hobbies.map((hobbie, index) => (
          <li key={index}>{hobbie}</li>
        ))}
      </ul>
      <p>
        Dirección: {direccion.calle}, {direccion.ciudad}
      </p>
      <button onClick={() => saludar(`Hola ${nombre}`)}>Saludar</button>

      <div style={{ marginTop: "1rem" }}>
        <strong>Children:</strong>
        <div>{children}</div>
      </div>
    </div>
  );
};

```

----

otro ejemplo de cuando se envía una función como prop
```tsx
import { useState } from "react";
import { ComponenteHijo2 } from "./componentsM/ComponenteHijo2";
function App() {
const [nombre,setNombre] = useState('');
const handleName = (nombre: string) => {
setNombre(nombre);
};
return(
<>
<h1>este es el nombre : {nombre}</h1>
<ComponenteHijo2 onNameClick={handleName}/>
</>
)
}
```

```tsx
interface ComponenteHijo2Props {
onNameClick: (nombreCompleto: string) => void;
}
export const ComponenteHijo2 = ({ onNameClick }: ComponenteHijo2Props) => {
const nombre = "ulises";
const regresarNombre = () => {
onNameClick(nombre);
};
return (
<div>
<button onClick={regresarNombre}>Regresar datos</button>
</div>
);
};
```

también podemos pesarle un nombre desde el hijo y pasarla en la función y se saetea el nombre