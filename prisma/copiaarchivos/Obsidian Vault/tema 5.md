# 📝 Pseudo-elementos en CSS: `::before`

## ¿Qué es?

- Un **pseudo-elemento** que permite insertar contenido **antes** del contenido real de un elemento.
- Siempre necesita la propiedad `content` (aunque sea `""`).

---

## Sintaxis

```css
selector::before {
  content: "";
  /* estilos */
}
```

---

## Usos comunes

- Agregar iconos, símbolos o adornos.
- Insertar imágenes o formas decorativas (cuadrados, círculos).
- Mejorar la accesibilidad visual (ej. marcadores de lista personalizados).

---

## Ejemplos

### 1. Texto antes del contenido

```css
.titulo::before {
  content: "👉 ";
  color: red;
}
```

Resultado: 👉 Hola Mundo

---

### 2. Figura cuadrada

```css
.nota::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: red;
  margin-right: 8px;
}
```

---

### 3. Círculo

```css
.nota::before {
  content: "";
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: red;
  border-radius: 50%; /* círculo perfecto */
  margin-right: 8px;
}
```

---

## Tips

- Usa `display: inline-block` para que el `::before` tenga forma visible.
- `border-radius: 50%` convierte un cuadrado en círculo.
- Se puede usar en casi cualquier elemento (párrafos, títulos, listas, etc.).

---
