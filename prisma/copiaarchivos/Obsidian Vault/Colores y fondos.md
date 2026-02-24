# 📝 Colores y fondos CSS (Texto y Fondos)

## Propiedades esenciales

|Tipo|Propiedad|Qué hace|Ejemplo|
|---|---|---|---|
|**Texto**|`color`|Cambia el color del texto|`color: red;`|
||`opacity`|Hace el texto semi-transparente|`opacity: 0.8;`|
||`text-shadow`|Agrega sombra al texto|`text-shadow: 2px 2px 5px gray;`|
|**Fondo**|`background-color`|Color de fondo sólido|`background-color: lightblue;`|
||`background-image`|Imagen de fondo|`background-image: url('fondo.jpg');`|
||`background-repeat`|Repetición de la imagen|`background-repeat: no-repeat;`|
||`background-size`|Tamaño de la imagen|`background-size: cover;`|
||`background-position`|Posición de la imagen|`background-position: center;`|
||`background-attachment`|Fijo o se mueve con scroll|`background-attachment: fixed;`|
||`opacity`|Transparencia del fondo|`opacity: 0.7;`|
|**Interacción rápida**|`hover`|Cambiar color o fondo al pasar el mouse|`div:hover { background-color: green; color: white; }`|
||`transition`|Animación suave al cambiar color/fondo|`transition: background-color 0.3s ease, color 0.3s ease;`|


---

## 🔹 Mini laboratorio en React

```jsx
import "./App.css";

function App() {
  return (
    <div className="lab">
      <h1 className="titulo">Mini laboratorio de Colores y Fondos</h1>

      <div className="bloque1">Texto blanco sobre fondo negro</div>
      <div className="bloque2">Texto negro sobre fondo amarillo</div>
      <div className="bloque3">Hover cambia color y fondo</div>
      <div className="bloque4">Degradado de fondo</div>
      <div className="bloque5">Texto con sombra</div>
    </div>
  );
}

export default App;
```

### CSS (`App.css`)

```css
.lab {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
}

.bloque1 {
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 8px;
}

.bloque2 {
  background-color: yellow;
  color: black;
  padding: 10px;
  border-radius: 8px;
}

.bloque3 {
  background-color: lightblue;
  color: black;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.bloque3:hover {
  background-color: darkblue;
  color: white;
}

.bloque4 {
  background: linear-gradient(to right, red, orange, yellow);
  color: white;
  padding: 10px;
  border-radius: 8px;
}

.bloque5 {
  background-color: black;
  color: white;
  text-shadow: 2px 2px 5px gray;
  padding: 10px;
  border-radius: 8px;
}
```

---
