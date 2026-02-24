selectores
https://excalidraw.com/#json=CtT48-kL30NwWH57Iv6kB,dKhZPubpImiwJFFvir3ujg


![[Pasted image 20250908142113.png]]

![[Pasted image 20250908142210.png]]


![[Pasted image 20250908142239.png]]


![[Pasted image 20250908142317.png]]
---
```jsx
import "./App.css";

  

function App() {

return (

<>

{/* <h2 className="titulo">Todo list</h2>

<ul className="todo listas">

<li className="lista">Programar</li>

<ul className="sublista">

<li className="lista">Javascrip</li>

<li className="lista">PHP</li>

</ul>

<li className="lista">Correr</li>

<li className="lista">Susciberme</li>

</ul>

  

<h2 className="titulo">Dia de la semana</h2>

<ul className="dias listas">

<li className="lista">Lunes</li>

<li className="lista">Martes</li>

<li className="lista">Miercoles</li>

</ul> */}

<article>

<h2 className="subtitulo">¿Qué es un registro de abitos?</h2>

<p className="parrafo">

Un registro de abitos es un documento que contiene la lista de todos

los abitos que se han comprado en una tienda.

</p>

  

<p className="parrafo">

Un registro de abitos es un documento que contiene la lista de todos

los abitos que se han comprado en una tienda.

</p>

  

<p className="parrafo">

Un registro de abitos es un documento que contiene la lista de todos

los abitos que se han comprado en una tienda.

</p>

</article>

</>

);

}

  

export default App;
```

```css
  

.listas .lista {

text-decoration: underline;

}

  

.todo .lista {

list-style: decimal;

}

  

.dias .lista {

list-style: none;

  

}

  

.listas > .lista{

list-style: upper-roman;

}

  

.dias > .lista{

color: orangered;

font-weight: bold;

font-size: 20px;

}

/*

.subtitulo + .parrafo{

background-color: yellow;

height: 0;

overflow: hidden;

transition: 1s;

}

  

.parrafo{

background-color: red;

}

  

.subtitulo:hover + .parrafo{

opacity: 1;

height: 50px;

} */

  
  

.subtitulo ~ .parrafo{

background-color: tomato;

}
```

[[selectores de atributo]]


---
**Cascada**
![[Pasted image 20250908171839.png]]
### Paso a paso:

1. El navegador lee **de arriba hacia abajo**.
2. La primera regla: `color: royalblue; font-family: Arial;` → se aplica inicialmente.
3. La segunda regla: `color: crimson; font-family: cursive;` → **sobrescribe** el color y la fuente anterior.
4. La tercera regla: `color: green;` → **sobrescribe solo el color**, la fuente queda `cursive` de la regla anterior.

✅ Resultado final:
- `color` → **green**
- `font-family` → **cursive**
---

💡 Resumen de cascada:
- **El último estilo leído gana** si los selectores tienen la misma especificidad.
- La cascada respeta **orden + especificidad + herencia**.

![[Pasted image 20250908172336.png]]

aplicas especificidad
![[Pasted image 20250908172716.png]]  
cascada ya que la especifidad son iguales de 100 segun la tabla ya que usan id
![[Pasted image 20250908173030.png]]

---
herencia
aqui estamos  seleccionando body y como body encierra a todo hasta el h1  y p estos hederan el tipo de letra y el color en ocasiones otros atributos no la pueden hederar y en el input solo hedera la fuente y el color no lo tomo
![[Pasted image 20250908173525.png]]---
[[BEM]]
[[BOX MODEL]]
