## Flujo Completo del Error - Todos los Archivos

### **1. Backend envía (NestJS/Express)**

```
POST /customer/
Status: 409 Conflict

Body:
{
  "success": false,
  "statusCode": 409,
  "errorCode": "UNIQUE_CONSTRAINT_VIOLATION",
  "message": "El teléfono ya está registrado",
  "data": null,
  "errors": {
    "phone": {
      "message": "El teléfono ya está registrado",
      "code": "UNIQUE_CONSTRAINT_VIOLATION"
    }
  },
  "timestamp": "2026-04-19T02:42:54.691Z",
  "path": "/customer/"
}
```

---

### **2. Axios recibe → Interceptor transforma**

**Archivo:** [/src/api/interceptor.ts](cci:7://file:///home/jesushdz/Documents/frontend/src/api/interceptor.ts:0:0-0:0)

```typescript
export function setupInterceptors() {
  api.interceptors.response.use(
    (res) => res,  // Éxito: pasa directo
    (error) => {   // Error: transforma
      const status = error.response?.status;     // 409
      const data = error.response?.data;         // ↑ JSON del backend
      
      return Promise.reject({
        // Transformación
        status,                                    // 409
        statusCode: data?.statusCode || status,   // 409
        errorCode: data?.errorCode,                // "UNIQUE_CONSTRAINT_VIOLATION"
        success: data?.success,                    // false
        message: data?.message,                    // "El teléfono ya está registrado"
        errors: data?.errors,      // { phone: { message, code } }
        timestamp: data?.timestamp,
        path: data?.path,
      });
    }
  );
}
```

**Resultado del interceptor:**
```typescript
{
  status: 409,
  statusCode: 409,
  errorCode: "UNIQUE_CONSTRAINT_VIOLATION",
  success: false,
  message: "El teléfono ya está registrado",
  errors: {
    phone: {
      message: "El teléfono ya está registrado",
      code: "UNIQUE_CONSTRAINT_VIOLATION"
    }
  },
  timestamp: "...",
  path: "/customer/"
}
```

---

### **3. Service hace la petición**

**Archivo:** `/src/services/customers/customer.service.ts`

```typescript
export const customerService = {
  create: async (data: CustomerCreateRequest): Promise<Customer> => {
    // Llama a apiClient.post → pasa por interceptor
    const response = await apiClient.post<Customer>("/customer", data);
    return response.data;  // Si éxito, retorna Customer
    // Si error, el interceptor ya hizo throw, nunca llega aquí
  },
};
```

---

### **4. Container maneja el servicio**

**Archivo:** `/src/components/CustomerListContainer.tsx`

```typescript
const handleCreate = async (data: CustomerCreateRequest) => {
  try {
    const newCustomer = await customerService.create(data);
    // Éxito: actualiza lista
    setCustomers([...customers, newCustomer]);
    return newCustomer;
  } catch (error) {
    // Error del interceptor llega aquí
    throw error;  // ← Re-lanza para que el modal lo atrape
  }
};
```

---

### **5. Modal atrapa y muestra el error**

**Archivo:** [/src/components/CreateCustomerModal.tsx](cci:7://file:///home/jesushdz/Documents/frontend/src/components/CreateCustomerModal.tsx:0:0-0:0)

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  try {
    // Llama a onCreate → Container → Service → Interceptor
    const newCustomer = await onCreate(dataToSubmit);
    // Éxito: muestra modal de éxito
    setCreatedCustomer(newCustomer);
    
  } catch (err) {
    // ↑↑↑ ERROR del interceptor llega aquí
    
    const error = err as {
      statusCode?: number;      // 409
      errorCode?: string;       // "UNIQUE_CONSTRAINT_VIOLATION"
      message?: string;         // "El teléfono ya está registrado"
      errors?: Record<string, { 
        message: string;        // "El teléfono ya está registrado"
        code: string;           // "UNIQUE_CONSTRAINT_VIOLATION"
      }>;
    };

    // ¿Hay errores específicos por campo?
    if (error.errors) {
      // SÍ → Recorre cada campo
      Object.entries(error.errors).forEach(([field, fieldError]) => {
        // field = "phone"
        // fieldError = { message: "...", code: "..." }
        
        if (fieldError && fieldError.message) {
          // Guarda error en el estado del formulario
          setFieldErrors(field as CustomerField, [fieldError.message]);
          // ↑ ["El teléfono ya está registrado"]
        }
      });
    } else {
      // NO → Error general
      setSubmitError(error.message);
    }
  }
};
```

---

### **6. Input muestra visualmente**

**Archivo:** [/src/components/ValidatedInput.tsx](cci:7://file:///home/jesushdz/Documents/frontend/src/components/ValidatedInput.tsx:0:0-0:0)

```typescript
// Recibe el estado del campo
const fieldState = {
  hasError: true,
  errors: ["El teléfono ya está registrado"]  // ← Del setFieldErrors
};

// Renderiza:
<div>
  <input className="border-red-500" />  {/* Borde rojo por error */}
  
  {fieldState.hasError && (
    <p className="text-red-500 text-sm mt-1">
      {fieldState.errors[0]}  {/* "El teléfono ya está registrado" */}
    </p>
  )}
</div>
```

---

## Diagrama de Secuencia

```
Backend          Interceptor         Service        Container        Modal          Input
   │                  │                 │              │              │            │
   │  409 + JSON      │                 │              │              │            │
   │─────────────────>│                 │              │              │            │
   │                  │                 │              │              │            │
   │                  │ transforma()    │              │              │            │
   │                  │ {status,        │              │              │            │
   │                  │  statusCode,    │              │              │            │
   │                  │  errorCode,     │              │              │            │
   │                  │  errors...}     │              │              │            │
   │                  │                 │              │              │            │
   │                  │ Promise.reject()│              │              │            │
   │                  │────────────────>│              │              │            │
   │                  │                 │ throw error  │              │            │
   │                  │                 │────────────>│              │            │
   │                  │                 │              │ throw error  │            │
   │                  │                 │              │─────────────>│            │
   │                  │                 │              │              │ catch(err) │
   │                  │                 │              │              │            │
   │                  │                 │              │              │ setFieldErrors("phone", 
   │                  │                 │              │              │   [err.errors.phone.message])
   │                  │                 │              │              │────────────────────────>│
   │                  │                 │              │              │                         │
   │                  │                 │              │              │                         │ render()
   │                  │                 │              │              │                         │ 🔴 muestra error
```

## Archivos Involucrados (en orden)

| Orden | Archivo | Qué hace |
|-------|---------|----------|
| 1 | `Backend API` | Genera el JSON de error |
| 2 | [/src/api/interceptor.ts](cci:7://file:///home/jesushdz/Documents/frontend/src/api/interceptor.ts:0:0-0:0) | Transforma error.response.data |
| 3 | [/src/api/apiClient.ts](cci:7://file:///home/jesushdz/Documents/frontend/src/api/apiClient.ts:0:0-0:0) | Wrapper que usa el interceptor |
| 4 | `/src/services/customers/customer.service.ts` | Llama a apiClient.post() |
| 5 | `/src/components/CustomerListContainer.tsx` | Maneja create/update, re-lanza errores |
| 6 | [/src/components/CreateCustomerModal.tsx](cci:7://file:///home/jesushdz/Documents/frontend/src/components/CreateCustomerModal.tsx:0:0-0:0) | Atrapa error, decide dónde mostrarlo |
| 7 | [/src/components/EditCustomerModal.tsx](cci:7://file:///home/jesushdz/Documents/frontend/src/components/EditCustomerModal.tsx:0:0-0:0) | Igual que Create pero para editar |
| 8 | [/src/components/ValidatedInput.tsx](cci:7://file:///home/jesushdz/Documents/frontend/src/components/ValidatedInput.tsx:0:0-0:0) | Recibe error y renderiza mensaje rojo |

¿Queda claro el flujo completo?