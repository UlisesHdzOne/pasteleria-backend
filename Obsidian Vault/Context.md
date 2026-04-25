
---

# ✅ **Orden correcto para crear un Context en React**

Siempre son **3 pasos**, en este orden:

---

# **1️⃣ Crear el contexto (vacío, sin lógica)**

**Archivo:** `UserContext.ts`

✔ Aquí solo declaras **qué datos existirán en el contexto**.  
(No hay estado, no hay lógica, solo la definición).

```ts
import { createContext } from "react";
import type { User } from "../types/user.types";

export interface UserContextType {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | null>(null);
```

### 👉 Piensa en esto como **la caja** donde se va a guardar el estado.

---

# **2️⃣ Crear el provider (el componente que guarda el estado)**

**Archivo:** `UserProvider.tsx`

✔ Aquí sí usas `useState`  
✔ Aquí sí manejas el valor real del contexto  
✔ Aquí envuelves la app

```tsx
import { useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { User } from "../types/user.types";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};
```

### 👉 Piensa en el Provider como **el jefe que controla la caja**.

---

# **3️⃣ Crear el hook para acceder al contexto fácilmente**

**Archivo:** `useUserContext.ts`

✔ Facilita el uso del contexto  
✔ Tira error si no estás dentro del provider

```ts
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used inside <UserProvider>");
  return ctx;
};
```

### 👉 Piensa en este hook como **la llave para abrir la caja**.

---

# 🔥 **Eso es todo.**

El orden siempre es:

```
1. Context
2. Provider
3. Hook
```

Luego en `main.tsx` o `App.tsx` haces:

```tsx
<UserProvider>
  <App />
</UserProvider>
```

Y ya puedes usar:

```ts
const { selectedUser, setSelectedUser } = useUserContext();
```

desde cualquier componente.

---

Si quieres, puedo enseñarte **cómo agregar más valores al mismo contexto** (ej: lista de usuarios, loading, etc.).