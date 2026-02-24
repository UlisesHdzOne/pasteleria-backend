### Tema nuevo: **Enums en TypeScript**

Un **enum** (enumeración) sirve para representar un conjunto de valores que están relacionados entre sí y tienen nombres más descriptivos.

Por ejemplo: en lugar de usar números sueltos para representar los días de la semana, usamos un `enum`.

---

### Ejemplo:

```tsx
import "./App.css";

enum DiaSemana {
  Lunes,
  Martes,
  Miercoles,
  Jueves,
  Viernes,
  Sabado,
  Domingo,
}

function App() {
  let hoy: DiaSemana = DiaSemana.Martes;

  return (
    <>
      <div>
        <h1>Hoy es: {DiaSemana[hoy]}</h1>
      </div>
    </>
  );
}

export default App;
```

👉 Aquí definimos el `enum DiaSemana`.  
👉 Después usamos `DiaSemana.Martes`.  
👉 Y al mostrarlo, usamos `DiaSemana[hoy]` para que salga el nombre como texto.

```jsx
import "./App.css";
enum Nivel {
Facil,
Medio,
Dificil,
}

function App() {
 let jugardor: Nivel = Nivel.Facil;
return (
<>
	<div>
	 <h1>El jugardor es de Nivel: {Nivel[jugardor]}</h1>
	</div>
</>
);
}
export default App;
```

mas personalizado
```jsx
import "./App.css";

enum Color {
  Rojo = "Rojo",
  Verde = "Verde",
  Azul = "Azul",
}

function App() {
  let colorFavorito: Color = Color.Azul;

  return (
    <>
      <div>
        <h1>Mi color favorito es: {colorFavorito}</h1>
      </div>
    </>
  );
}

export default App;

```
---
