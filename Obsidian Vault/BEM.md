```jsx
import "./App.css";
import logo from "./assets/logo.png";

function App() {
return (
<>
	<nav className="nav">
	
		<img src={logo} alt="" className="nav__logo"/>
		
		<div className="nav__links">
			<a href="#" className="nav__link">Inicio</a>
			<a href="#" className="nav__link">Acerca de</a>
			<a href="#" className="nav__link nav__link--active">Contacto</a>
		</div>
	</nav>`
</>
);
}

export default App;
```

```css
*{
margin: 0;
padding: 0;
box-sizing: border-box;
}

body{
font-family: Arial;
}

.nav{
background-color: #264dE4;
padding: 0 100px;
color: white;
display: flex;
justify-content: space-between;
height: 70px;
}

.nav__logo{
height: 100%;
}

.nav__link{
color: inherit;
text-decoration: none;
margin-left: 20px;
}
```