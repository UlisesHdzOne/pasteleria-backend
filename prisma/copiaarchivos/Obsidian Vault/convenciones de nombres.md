Seguir buenas prácticas ayuda a que tu código sea más **legible y mantenible**, especialmente en proyectos grandes de React + TypeScript.

### 1️⃣ Variables y funciones

- **camelCase**: la primera palabra en minúscula y las siguientes con mayúscula.
    

```ts
let miVariable = 10;
function sumarNumeros(a: number, b: number) { return a + b; }
```

### 2️⃣ Tipos y interfaces

- **PascalCase**: cada palabra empieza con mayúscula.
    

```ts
type Persona = { nombre: string; edad: number };
interface Producto { nombre: string; precio: number; disponible: boolean }
```

### 3️⃣ Enums

- **PascalCase** para el enum y las constantes dentro también con mayúscula inicial.
    

```ts
enum Color { Rojo, Verde, Azul }
```

### 4️⃣ Constantes

- Opcionalmente puedes usar **UPPER_CASE** si son verdaderas constantes globales.
    

```ts
const MAX_USUARIOS = 100;
```

### 5️⃣ Evitar `any` si puedes

- Usar `any` **solo cuando sea estrictamente necesario**, prefiere `unknown` o tipos específicos.
    

### 6️⃣ Leer y usar `readonly` y `?`

- `readonly` para proteger datos que no cambian.
    
- `?` para propiedades opcionales en objetos.
    

---

💡 Consejo final: mantener estas reglas te ayuda a que tu código sea **claro, consistente y menos propenso a errores**, algo clave antes de meter todo en React.
