# 📝 Pseudo-elementos en CSS: `::after`

## ¿Qué es?

* Un **pseudo-elemento** que inserta contenido **después** del contenido real de un elemento.
* Igual que `::before`, necesita la propiedad `content`.
* Muy útil para añadir adornos, íconos o marcas sin modificar el HTML.

---

## Sintaxis

```css
selector::after {
  content: "";
  /* estilos */
}
```

---

## Usos comunes

* Agregar íconos o símbolos al final de un texto.
* Poner marcas de alerta, advertencia o notas.
* Crear decoraciones visuales (líneas, flechas, etc.).

---

## Ejemplos

### 1. Texto después del contenido

```css
.importante::after {
  content: " !!";
  color: red;
}
```

Resultado: **revisar con urgencia !!**

---

### 2. Línea decorativa

```css
.titulo::after {
  content: "";
  display: block;
  width: 50px;
  height: 3px;
  background-color: blue;
  margin-top: 5px;
}
```

Resultado: Aparece una barrita azul debajo del título.

---

## Tips

* Usa `content: ""` si no quieres texto, solo figuras.
* `display: block` ayuda a crear formas que ocupan toda la línea.
* Se puede combinar con `position: absolute` para ubicar decoraciones más precisas.

---

