## 🧠 1. **Arrow function corta (implícito el return)**

Ideal cuando solo devuelves una expresión:

```ts
const resultado = numeros.filter(num => num > 3);
```

> ✅ No usas `{}` y automáticamente retorna lo que esté después del `=>`.


const números = [1, 2, 3, 4, 5];  
el ejemplo crea un nuevo arreglo con los num >  3 [4,5]

---

## 🧠 2. **Arrow function con `return` explícito**

Necesario si usas llaves `{}` (porque si no, no retorna nada):

```ts
const resultado = numeros.filter(num => {
  return num > 3;
});
```

---

## 🧠 3. **Función anónima tradicional**

La de toda la vida, sin nombre:

```ts
const resultado = numeros.filter(function(num) {
  return num > 3;
});
```

---

## 🧠 4. **Función nombrada (reutilizable)**

Si la lógica es más compleja o quieres usarla varias veces:

```ts
function esMayorQueTres(num: number): boolean {
  return num > 3;
}

const resultado = numeros.filter(esMayorQueTres);
```

const números = [1, 2, 3, 4, 5];
1>3 falso
2>3 falso
3>3 falso
4>3 verdadero
5>3 verdadero
 el arreglo nuevo es [4,5]  ya que la condición solo guarda num > 3

---

## 🎯 Resumen

| Sintaxis                       | ¿Es anónima? | ¿Tiene return?            |
| ------------------------------ | ------------ | ------------------------- |
| `num => num > 3`               | ✅ Sí         | ✅ Implícito               |
| `num => { return num > 3 }`    | ✅ Sí         | ✅ Explícito               |
| `function(num) { ... }`        | ✅ Sí         | ✅ Explícito (si lo pones) |
| `function nombre(num) { ... }` | ❌ No         | ✅ Explícito               |

