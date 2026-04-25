```css
/*selectores universal*/
*{
margin: 0;
padding: 0;
}

  

/*selectores de etiqueta*/
body {
font-family: "Arial";
}

li{
color: slateblue;
font-size: 20px;
}

/*selectores de clase */
.peliculas{
color: crimson;
}

.series{
font-size: 40px;
}

.favoritas{
font-weight: bold;
color: rebeccapurple;
}

.espaciado {
letter-spacing: 10px;
}

  
/*selectores de id */
#spidermanNowayHome{
font-size: 25px;
color: tomato;
text-decoration: underline;
}

#temporada3{
font-size: 14px;
color: seagreen ;
}
```

```jsx
import "./App.css";

  

function App() {

return (

<>

<h2 className="peliculas ">spiderman</h2>

<ul>

<li className="pelicula">spiderman 1</li>

<li className="pelicula favoritas">spiderman 2</li>

<li className="pelicula espaciado" id="spidermanNowayHome">

spider verse

</li>

</ul>

  

<h2 className="series">series</h2>

<ul>

<li className="temporadas">spiderman 1</li>

<li className="temporadas">spiderman 2</li>

<li className="temporadas" id="temporada3">

temporada 3

</li>

</ul>

</>

);

}

  

export default App;
```