# CSS en React: Selector de ID

## 1️⃣ Qué es

- Aplica estilos **solo a un elemento único** que tenga un ID específico.
- Se escribe con `#` seguido del nombre del ID: `#miId { ... }`.
- En React: se asigna con `id="miId"` en JSX.

> Diferencia con clases: ID debe ser **único** en toda la página.

---

## 2️⃣ Sintaxis básica

### JSX

```jsx
<h1 id="titulo-principal">Hola mundo</h1>
```

### CSS

```css
#titulo-principal {
  color: aqua;
  font-size: 40px;
  text-align: center;
}
```

✅ Solo el elemento con ese ID recibe los estilos.

---

## 3️⃣ Combinar ID con etiqueta

```css
h1#titulo-principal {
  color: red;
  font-size: 50px;
}
```

- Aumenta la especificidad.
- Solo afecta al `<h1>` con ese ID.

---

## 4️⃣ Ejemplo completo

### JSX

```jsx
<h1 id="titulo-principal">Bienvenido</h1>
<p>Parrafo normal</p>
<p id="resaltado">Parrafo especial</p>
<button>Botón normal</button>
```

### CSS

```css
p {
  color: gray;
  font-size: 18px;
}

button {
  background-color: blue;
  color: white;
  padding: 0.5rem 1rem;
}

#titulo-principal {
  color: aqua;
  font-size: 40px;
  text-align: center;
}

#resaltado {
  color: red;
  font-weight: bold;
}
```

✅ Resultado:

- `<h1>` con ID `titulo-principal` sobrescribe estilos generales.
- `<p>` con ID `resaltado` sobrescribe `p` general.
- Otros elementos mantienen estilo base.

---

## 5️⃣ Conceptos clave

- `#id` → afecta un solo elemento único.
- Mayor especificidad que clases y selectores de etiqueta.
- Combinar con etiqueta para más precisión (`h1#miId`).
- Útil para estilos únicos, anclas o manipulación JS/React.

---

## 6️⃣ Buenas prácticas

- Cada ID debe ser único en la página.
- Para estilos repetidos, usar **clases** en lugar de ID.
- Mantener nombres descriptivos: `titulo-principal`, `resaltado`.
- Evitar mezclar ID y clases innecesariamente para no complicar la especificidad.

---