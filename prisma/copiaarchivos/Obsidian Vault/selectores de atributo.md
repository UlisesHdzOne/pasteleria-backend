
## 📌 ¿Qué son los selectores de atributo?

Son reglas de CSS que permiten **seleccionar elementos HTML basados en sus atributos** (como `class`, `id`, `type`, `href`, etc.).  
Se escriben entre corchetes `[]`.

Ejemplo básico:

```css
[type="text"] {
  border: 2px solid blue;
}
```

👉 Eso selecciona solo los elementos que tengan `type="text"` (normalmente inputs).

---

## 📚 Tipos de selectores de atributo

1. **Presencia de atributo**
    

```css
[class] {
  background-color: yellow;
}
```

👉 Selecciona cualquier elemento que tenga `class`, sin importar el valor.

---

2. **Valor exacto**
    

```css
input[type="password"] {
  background-color: pink;
}
```

👉 Selecciona solo los `<input>` cuyo atributo `type` sea exactamente `"password"`.

---

3. **Valor que empieza con (`^=`)**
    

```css
a[href^="https"] {
  color: green;
}
```

👉 Selecciona enlaces cuyo `href` **empiece por** `"https"`.

---

4. **Valor que termina con (`$=`)**
    

```css
img[src$=".png"] {
  border: 3px solid red;
}
```

👉 Selecciona imágenes cuyo `src` **termine en** `.png`.

---

5. **Valor que contiene (`*=`)**
    

```css
div[class*="card"] {
  padding: 10px;
}
```

👉 Selecciona cualquier `<div>` cuyo `class` contenga la palabra `"card"`.

---

## 🚨 Nota importante si usas React

En React escribimos `className` en JSX, pero cuando el código se convierte a HTML, el navegador recibe `class`.  
👉 Por eso, en CSS siempre usas `[class]`, nunca `[className]`.

Ejemplo en React:

```jsx
<div className="caja">Hola</div>
```

Se traduce en el navegador a:

```html
<div class="caja">Hola</div>
```

---

### 🎯 Mini ejercicio para ti:

Con este HTML:

```html
<form>
  <input type="text" placeholder="Nombre">
  <input type="password" placeholder="Contraseña">
  <input type="email" placeholder="Correo">
</form>
```

Si escribo este CSS:

```css
input[type="email"] {
  color: red;
}
```

👉 ¿Cuál campo se pondrá rojo?