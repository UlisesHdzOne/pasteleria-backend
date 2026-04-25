Aquí tienes tu **apunte totalmente reescrito, ordenado, simple y mucho más fácil de leer**.  
No invento nada, solo organizo y mejoro lo que ya tienes.

---

# 🌐 **ETIQUETAS SEMÁNTICAS (HTML)**

## **header**

👉 Parte superior: logo, menú, título.  
👉 Va al inicio de la página o de un componente.

## **nav**

👉 Zona de navegación: enlaces, menú.  
👉 Normalmente dentro de **header**.

## **main**

👉 Contenido principal de la página.  
👉 Solo debe haber **uno** por pantalla.

## **section**

👉 Bloques de contenido que tienen relación entre sí.  
👉 Ejemplo: Productos, Usuarios, Testimonios.

## **footer**

👉 Parte final: información, derechos, enlaces secundarios.

---

# 🧠 **Regla de oro**

- Si el bloque **tiene propósito** → usa etiqueta semántica.
    
- Si solo sirve para **acomodar** → usa `<div>`.
    

Ejemplo mental:

```
<section>  ← bloque con significado
  <div>     ← acomodo interno
    [input] [select] [botón]
  </div>
</section>
```

---

# 🧩 **MOCKUP VISUAL (tipo dibujo)**

```
<header>
  ├── Título
  └── Menú (nav)
</header>

<main>
  <section>
    ├── Título: Filtros
    └── Controles (input, select, botón)
  </section>

  <section>
    ├── Título: Lista de usuarios
    └── <ul>
          ├── <li> <article> Tarjeta usuario </article>
          ├── <li> <article> Tarjeta usuario </article>
          └── ...
        </ul>
  </section>
</main>

<footer>
  └── Texto final / derechos
</footer>
```

---

# ✍️ **TEXTOS (Tailwind)**

## Tamaños

- `text-sm` → pequeño
    
- `text-base` → normal
    
- `text-lg` → grande
    
- `text-xl` → más grande
    
- `text-2xl` → muy grande
    

## Estilos

- `font-bold` → negritas
    
- `text-gray-600` → color gris suave


## 📏 **Anchuras (Tailwind)**

- `w-full` → 100%
    
- `w-1/2` → mitad
    
- `w-96` → **24rem = 384px** (ancho fijo)

---

# 📦 **BOX MODEL**

## Margen (m)

- `mt-2` → espacio arriba
    
- `mb-4` → espacio abajo (1rem)
    
- `m-4` → margen en todo el elemento
    

Ejemplo visual:

```
Título
(espacio)
Párrafo
```

## Padding (p)

- `px-3` → padding horizontal
    
- `py-1` → padding vertical
    
- `p-4` → padding en todas las direcciones
    

## Borde

- `border` → activa borde
    
- `border-pink-300` → color del borde
    

## Bordes redondeados

- `rounded`
    
- `rounded-md`
    
- `rounded-lg`
    
- `rounded-full`
    

---

# 🌗 **SOMBRA (shadow)**

- `shadow` → sombra pequeña
    
- `shadow-md` → mediana
    
- `shadow-lg` → grande
    

👉 La sombra va **por fuera del borde**.

---

# ✨ **PSEUDO-CLASES**

## Hover

- `hover:bg-blue-600` → cambia fondo al pasar el mouse
    
- `hover:shadow-lg` → más sombra al pasar el mouse
    

## Transiciones

- `transition` → animación suave entre estados
    

Ejemplo:

```html
<button class="bg-blue-500 hover:bg-blue-600 transition">
```

---

# 📐 **FLEXBOX (Tailwind)**

## `flex`

👉 Activa modo fila (horizontal) por defecto.

Sin flex:

```
A
B
C
```

Con flex:

```
A   B   C  → en fila
```

## `justify-between`

👉 Empuja elementos a los extremos.

```
A                             B
```

## `items-center`

👉 Alinea verticalmente al centro.

```
[icono]  Texto
   |       |
   ↓       ↓
   centrados
```

## `gap-*`

👉 Espacio entre los elementos.

---

# 🔢 **SPACE-Y (NO ES BOX MODEL)**

`space-y-4` → agrega **margin-top automático** solo entre hijos.

Mockup:

```
Elemento 1
(espacio)
Elemento 2
(espacio)
Elemento 3
```

No modifica padding, border ni content.

---

Sí, ya dominas **componentes**, **props**, **interfaces**, **listas**, **map**, **tailwind básico**, **flex**, **card UI**, y **estructura semántica**.  
Buen avance.

Ahora te dejo **3 temas recomendados** (simples, útiles y naturales para seguir tu nivel).  
Tú eliges cuál hacemos.

---

# ✅ **1. [[Lifting State Up]] (mover estados a un padre)**

👉 Para manejar un estado desde el padre y pasarlo a los hijos.  
Ejemplo: seleccionar un usuario y mostrar su perfil.

```
App
 ├── UserList
 └── UserDetails
```

Esto es clave para apps reales.

---

# ✅ **2. Props Drilling (y cómo evitarlo)**

Ya viste cómo pasar funciones y datos hacia abajo, pero cuando tienes muchos niveles se vuelve molesto.

Ejemplo del problema:

```
App → A → B → C → D → ComponenteQueLoNecesita
```

Ahí aparece el famoso **props drilling**.

El siguiente paso es aprender **cómo evitar ese problema**.

---

# 🧠 Tres soluciones modernas:

### **1. React Context (para evitar props drilling)**

Permite compartir estado sin pasarlo por cada componente intermedio.

→ Fácil y perfecto para apps medianas.

---

### **2. Custom Hooks (extraer lógica y reutilizar)**

Te enseña a organizar mejor tu código.

→ Muy importante para trabajar como profesional.

---

### **3. useReducer (estado más complejo)**

Es como un mini Redux dentro de un componente.

→ Ideal para manejar lógica más seria.

---

## 📌 Orden en que te recomiendo aprenderlos:

1. **[[Context]]**
    
2. **Custom Hooks**
    
3. **useReducer**
    
4. (Más adelante) React Query y Zustand
    

---

## 👉 Pregunta clave

¿Quieres que sigamos con el siguiente tema:

### **React Context (para evitar props drilling)?**

Si me dices que sí, te enseño con un ejemplo usando **tu mismo proyecto de UserList + UserCard + UserModal** para que aprendas en contexto real.


---

Estos son los que todavía te faltan:

### **6) useEffect básico**

### **7) Props opcionales**

### **8) Composición de componentes**

### **9) Filtros / lógica de lista**

### **10) Modal avanzado**

### **11) Proyectos completos / práctica**