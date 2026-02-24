# 📘 MANUAL COMPLETO: Sistema de Manejo de Errores y Logging

## 🎯 **1. INTRODUCCIÓN**

Este manual explica cómo usar el **sistema profesional de manejo de errores** que has implementado en tu aplicación NestJS. El sistema incluye:

- ✅ **Errores personalizados tipados** (`custom.errors.ts`)
- ✅ **Logging estructurado** con Winston
- ✅ **Manejo global de excepciones** (`GlobalExceptionFilter`)
- ✅ **Validadores de negocio** separados
- ✅ **Utilidades de errores** reutilizables

---

## 📁 **2. ESTRUCTURA DE ARCHIVOS**

```
src/
├── core/
│   ├── errors/
│   │   └── custom.errors.ts          # ← TODOS los errores personalizados
│   └── logger/
│       └── winston.config.ts         # ← Sistema de logging
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts  # ← Filtro global de errores
│   └── utils/
│       └── error-utils.service.ts    # ← Utilidades para manejo de errores
└── modules/ (ej: categories/)
    ├── validators/                    # ← Validadores de reglas de negocio
    └── services/                      # ← Servicios que usan el sistema
```

---

## 🔧 **3. ERRORES PERSONALIZADOS (`custom.errors.ts`)**

### **3.1 ¿Qué errores tienes disponibles?**

| Error Class | Status Code | Código | Cuándo usarlo |
|------------|-------------|--------|---------------|
| `NotFoundError` | 404 | `NOT_FOUND` | Recurso no encontrado |
| `ConflictError` | 409 | `CONFLICT` | Recurso duplicado |
| `ValidationError` | 400 | `VALIDATION_ERROR` | Validación de DTOs fallida |
| `BusinessRuleError` | 422 | Personalizado | Regla de negocio violada |
| `DatabaseError` | 500 | `DATABASE_ERROR` | Error de base de datos |
| `UnauthorizedError` | 401 | `UNAUTHORIZED` | Sin autenticación |
| `ForbiddenError` | 403 | `FORBIDDEN` | Sin permisos |

### **3.2 Cómo usar cada error:**

#### **📌 `NotFoundError` - Recurso no encontrado**
```typescript
// Ejemplo en servicio:
async findOne(id: number) {
  const entity = await this.repository.findUnique({ where: { id } });
  
  if (!entity) {
    throw new NotFoundError('Usuario', id); // ← ¡Así de simple!
  }
  
  return entity;
}

// Mensaje generado: "Usuario con ID 5 no encontrado."
// Respuesta HTTP: 404 NOT_FOUND
```

#### **📌 `ConflictError` - Recurso duplicado**
```typescript
// Ejemplo en validador de negocio:
async validateUniqueEmail(email: string) {
  const existing = await this.repository.findUnique({ where: { email } });
  
  if (existing) {
    throw new ConflictError('Usuario', 'email'); // ← Campo específico
  }
}

// Mensaje: "Usuario con email ya existe"
// Respuesta HTTP: 409 CONFLICT
// Frontend puede mostrar error en campo específico
```

#### **📌 `BusinessRuleError` - Regla de negocio violada**
```typescript
// Ejemplo: No eliminar categoría con productos
validateCategoryHasNoProducts(products: ProductBasic[]) {
  if (products.length > 0) {
    throw new BusinessRuleError(
      'CATEGORY_HAS_PRODUCTS',           // ← Código único
      `No se puede eliminar. Tiene ${products.length} productos`,
      {                                   // ← Metadata para logging
        productCount: products.length,
        productNames: products.map(p => p.name),
      }
    );
  }
}

// Respuesta HTTP: 422 UNPROCESSABLE_ENTITY
// Metadata solo visible en desarrollo
```

#### **📌 `DatabaseError` - Error de Prisma/DB**
```typescript
// ¡NO necesitas lanzarlo manualmente!
// ErrorUtilsService lo hace automáticamente:

async withDatabaseErrorHandling('Operación', async () => {
  // Si aquí ocurre un error de Prisma...
  // Se convierte automáticamente en DatabaseError
});
```

### **3.3 Parámetros de cada error:**

```typescript
// NotFoundError(resource: string, id?: string | number)
throw new NotFoundError('Categoría', 1);

// ConflictError(resourceName: string, conflictField: string)  
throw new ConflictError('Usuario', 'email');

// BusinessRuleError(code: string, message: string, metadata?: Record)
throw new BusinessRuleError(
  'CUSTOM_CODE',
  'Mensaje descriptivo',
  { datosExtra: 'para logging' }
);

// ValidationError(errors: Array<{field: string, message: string}>)
throw new ValidationError([
  { field: 'name', message: 'Debe tener al menos 3 caracteres' }
]);
```

---

## 🛠️ **4. UTILIDADES DE ERRORES (`error-utils.service.ts`)**

### **4.1 `withDatabaseErrorHandling()` - Manejo seguro de DB**
```typescript
// ENVOLVER cualquier operación de base de datos:
async createUser(data: CreateUserDto) {
  return this.errorUtils.withDatabaseErrorHandling(
    'Crear usuario',  // ← Nombre de la operación para logs
    async () => {
      // Tu código de base de datos aquí...
      const user = await this.prisma.user.create({ data });
      
      // Si hay error de Prisma → DatabaseError automático
      // Si hay AppError → se propaga tal cual
      
      return user;
    }
  );
}

// Beneficios:
// 1. Convierte errores de Prisma en DatabaseError
// 2. Propaga AppError sin modificar
// 3. Logging automático diferenciado
```

### **4.2 `validateOrThrow()` - Validar existencia**
```typescript
// Reemplaza esto:
if (!user) {
  throw new NotFoundError('Usuario', id);
}
return user;

// Con esto:
return this.errorUtils.validateOrThrow(user, 'Usuario', id);

// ¡Más limpio y reutilizable!
```

### **4.3 `checkConflict()` - Verificar duplicados**
```typescript
// Verificar si email ya existe:
const existing = await this.prisma.user.findUnique({ where: { email } });
this.errorUtils.checkConflict(existing, 'Usuario', 'email');

// Si existing existe → lanza ConflictError automáticamente
```

---

## 📝 **5. VALIDADORES DE NEGOCIO**

### **5.1 ¿Por qué separar validadores?**
```typescript
// ❌ MALO (validación en servicio):
async createCategory(data) {
  // Validación de entrada (DTOs) ✅
  // Validación de negocio (duplicados) ❌ mezclado
  // Lógica de negocio ❌ mezclado
  
  const existing = await this.prisma.category.findUnique(...);
  if (existing) throw new ConflictError(...);
  
  return this.prisma.category.create(...);
}

// ✅ BUENO (separación clara):
async createCategory(data) {
  // 1. Validación de entrada → DTOs (automático)
  // 2. Validación de negocio → Validator separado
  await this.validator.validateCategoryCreation(data.name);
  
  // 3. Lógica de negocio pura → Service
  return this.prisma.category.create(...);
}
```

### **5.2 Cómo crear un validador:**
```typescript
// users/validators/user-business.validator.ts
@Injectable()
export class UserBusinessValidator {
  constructor(
    private readonly logger: AppLogger,
    private readonly prisma: PrismaService,
  ) {}

  async validateUserCreation(email: string): Promise<void> {
    const existing = await this.prisma.user.findUnique({ 
      where: { email } 
    });
    
    this.errorUtils.checkConflict(existing, 'Usuario', 'email');
    // ↑ Usa errorUtils para consistencia
  }

  async validateUserAge(birthDate: Date): Promise<void> {
    const age = this.calculateAge(birthDate);
    
    if (age < 18) {
      throw new BusinessRuleError(
        'UNDERAGE_USER',
        'El usuario debe ser mayor de 18 años',
        { age, birthDate: birthDate.toISOString() }
      );
    }
  }
}
```

### **5.3 Usar en servicio:**
```typescript
// users/users.service.ts
@Injectable()
export class UsersService {
  constructor(
    private readonly validator: UserBusinessValidator,
    private readonly errorUtils: ErrorUtilsService,
  ) {}

  async create(data: CreateUserDto) {
    return this.errorUtils.withDatabaseErrorHandling('Crear usuario', async () => {
      // 1. Validaciones de negocio
      await this.validator.validateUserCreation(data.email);
      await this.validator.validateUserAge(data.birthDate);
      
      // 2. Crear usuario
      const user = await this.prisma.user.create({ data });
      
      // 3. Logging
      this.logger.log('Usuario creado', { userId: user.id });
      
      return user;
    });
  }
}
```

---

## 📊 **6. LOGGING ESTRUCTURADO**

### **6.1 ¿Cómo usar `AppLogger`?**
```typescript
// En cualquier servicio/controlador/validador:
import { AppLogger } from '@/core/logger/winston.config';

export class MiService {
  private readonly logger = new AppLogger(MiService.name);
  // ↑ Pasar nombre de clase para contexto
  
  async metodo() {
    // Diferentes niveles:
    this.logger.log('Operación exitosa', { data: 'info' });
    this.logger.warn('Alerta importante', { reason: 'detalle' });
    this.logger.debug('Info debug', { variable: valor });
    this.logger.error('Error crítico', error, { metadata: 'extra' });
  }
}
```

### **6.2 Ejemplos prácticos de logging:**
```typescript
// En creación exitosa:
this.logger.log('Categoría creada', {
  categoryId: category.id,
  name: category.name,
  timestamp: new Date().toISOString(),
});

// En validación fallida:
this.logger.warn('Intento de crear categoría duplicada', {
  name: input.name,
  ip: request.ip, // Si tienes acceso al request
  userAgent: request.get('user-agent'),
});

// En error de negocio:
this.logger.warn('Intento de eliminar categoría con productos', {
  categoryId: id,
  productCount: products.length,
  productNames: products.map(p => p.name),
});
```

### **6.3 ¿Qué pasa con los logs?**
```
Consola (desarrollo):
[14:27:28] warn: Intento de crear categoría con nombre duplicado {"name":"Calzado"}

Archivos logs/ (producción):
- error-2023-12-07.log  # Solo errores
- combined-2023-12-07.log # Todos los logs
```

---

## 🚀 **7. FLUJO COMPLETO DE ERRORES**

### **7.1 Escenario: Crear categoría duplicada**
```typescript
// 1. POST /api/categories { "name": "Existente" }
// 2. Controller → Service.create()
// 3. Service → Validator.validateCategoryCreation()
// 4. Validator detecta duplicado → throw new ConflictError('Categoría', 'name')
// 5. Error sube por la cadena
// 6. GlobalExceptionFilter lo captura
// 7. Filter loguea como WARN (isOperational: true)
// 8. Filter devuelve respuesta estructurada:
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "Categoría con name ya existe",
    "details": [{ "field": "name", "message": "Categoría con name ya existe" }],
    "timestamp": "2023-12-07T20:51:44.576Z",
    "path": "/api/categories",
    "method": "POST",
    "statusCode": 409
  }
}
// 9. Frontend muestra: "Error: Categoría con nombre ya existe"
```

### **7.2 Escenario: Error de base de datos**
```typescript
// 1. Service.withDatabaseErrorHandling() detecta error de Prisma
// 2. Convierte a DatabaseError automáticamente
// 3. DatabaseError tiene isOperational: false
// 4. GlobalExceptionFilter loguea como ERROR (crítico)
// 5. Respuesta al cliente (sin detalles internos):
{
  "success": false,
  "error": {
    "code": "DATABASE_ERROR",
    "message": "Error interno del servidor", // ← Genérico por seguridad
    "timestamp": "...",
    "statusCode": 500
  }
}
// 6. Logs internos tienen stack trace completo para debugging
```

---

## 🧪 **8. PATRONES COMUNES Y EJEMPLOS**

### **8.1 Nuevo módulo completo (ej: Products):**
```typescript
// products/validators/product-business.validator.ts
@Injectable()
export class ProductBusinessValidator {
  constructor(
    private readonly logger: AppLogger,
    private readonly prisma: PrismaService,
    private readonly errorUtils: ErrorUtilsService,
  ) {}

  async validateProductCreation(name: string, categoryId: number): Promise<void> {
    // Verificar categoría existe
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    this.errorUtils.validateOrThrow(category, 'Categoría', categoryId);

    // Verificar nombre único
    const existing = await this.prisma.product.findUnique({
      where: { name },
    });
    this.errorUtils.checkConflict(existing, 'Producto', 'name');

    // Regla de negocio: precio positivo
    // (esto sería en otro método, pero como ejemplo)
  }

  validatePositivePrice(price: number): void {
    if (price <= 0) {
      throw new BusinessRuleError(
        'INVALID_PRICE',
        'El precio debe ser mayor a 0',
        { price }
      );
    }
  }
}

// products/products.service.ts
@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AppLogger,
    private readonly errorUtils: ErrorUtilsService,
    private readonly validator: ProductBusinessValidator,
  ) {
    this.logger.log('ProductsService inicializado');
  }

  async create(input: CreateProductInput) {
    return this.errorUtils.withDatabaseErrorHandling('Crear producto', async () => {
      // Validaciones de negocio
      await this.validator.validateProductCreation(input.name, input.categoryId);
      this.validator.validatePositivePrice(input.price);

      // Crear producto
      const product = await this.prisma.product.create({
        data: input,
        include: { category: true },
      });

      // Logging
      this.logger.log('Producto creado', {
        productId: product.id,
        name: product.name,
        price: product.price,
        categoryName: product.category.name,
      });

      return product;
    });
  }
}
```

### **8.2 Validación compleja con múltiples reglas:**
```typescript
async validateComplexBusinessRules(data: CreateOrderDto) {
  // 1. Validar stock
  const hasStock = await this.checkStock(data.productId, data.quantity);
  if (!hasStock) {
    throw new BusinessRuleError(
      'INSUFFICIENT_STOCK',
      'No hay suficiente stock disponible',
      { productId: data.productId, requested: data.quantity }
    );
  }

  // 2. Validar límite de crédito
  const creditLimit = await this.getCreditLimit(data.userId);
  if (data.total > creditLimit) {
    throw new BusinessRuleError(
      'CREDIT_LIMIT_EXCEEDED',
      'Límite de crédito excedido',
      { userId: data.userId, total: data.total, limit: creditLimit }
    );
  }

  // 3. Validar horario de entrega
  if (!this.isDeliveryTimeValid(data.deliveryTime)) {
    throw new BusinessRuleError(
      'INVALID_DELIVERY_TIME',
      'Horario de entrega no disponible',
      { deliveryTime: data.deliveryTime }
    );
  }
}
```

---

## 🔍 **9. DEBUGGING Y TROUBLESHOOTING**

### **9.1 Problema: No se muestra el error correcto**
**Síntoma:** Siempre devuelve 500 INTERNAL_SERVER_ERROR
**Solución:** Verificar que el error extienda `AppError` correctamente:
```typescript
// ✅ CORRECTO:
export class MiError extends AppError {
  statusCode = 400;
  code = 'MI_ERROR';
  isOperational = true;

  constructor() {
    super('Mensaje'); // ← CRÍTICO: llamar a super()
  }
}

// Verificar en custom.errors.ts que todos tengan:
Object.setPrototypeOf(this, new.target.prototype); // ← Esta línea
```

### **9.2 Problema: Logs no aparecen**
**Verificar:**
1. ¿Tienes permisos en carpeta `logs/`?
2. ¿NODE_ENV está configurado?
3. ¿El logger se inicializó? (ver consola al iniciar)

### **9.3 Problema: Frontend no puede parsear error**
**Respuesta típica correcta:**
```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",           // ← Usar esto para lógica frontend
    "message": "Mensaje amigable", // ← Mostrar esto al usuario
    "details": [                  // ← Para errores de validación
      { "field": "email", "message": "Ya existe" }
    ],
    "statusCode": 409
  }
}
```

**En frontend (React ejemplo):**
```typescript
try {
  await api.post('/categories', data);
} catch (error) {
  if (error.response?.data?.error?.code === 'CONFLICT') {
    // Mostrar mensaje específico
    alert(error.response.data.error.message);
  } else if (error.response?.data?.error?.details) {
    // Mostrar errores de validación por campo
    error.response.data.error.details.forEach(detail => {
      setFieldError(detail.field, detail.message);
    });
  }
}
```

---

## 📈 **10. MEJORES PRÁCTICAS**

### **10.1 Reglas de oro:**
1. **NUNCA usar `throw new Error()`** - Siempre usar errores personalizados
2. **Validaciones de entrada** → DTOs con class-validator
3. **Validaciones de negocio** → Validadores separados
4. **Logging informativo** → Incluir contexto y metadata
5. **Errores operacionales** → `isOperational: true` (warn logs)
6. **Errores de sistema** → `isOperational: false` (error logs)

### **10.2 Estructura recomendada por método:**
```typescript
async metodoEjemplo(data: Dto) {
  // 1. Log de inicio (opcional)
  this.logger.debug('Iniciando método', { data });
  
  // 2. Envolver en manejo de errores de DB
  return this.errorUtils.withDatabaseErrorHandling('Operación', async () => {
    
    // 3. Validaciones de negocio
    await this.validator.validateAlgo(data);
    
    // 4. Lógica principal
    const resultado = await this.hacerAlgo(data);
    
    // 5. Log de éxito
    this.logger.log('Operación exitosa', { 
      id: resultado.id,
      metricas: 'relevantes' 
    });
    
    return resultado;
  });
  
  // 6. Cualquier error se maneja automáticamente
}
```

### **10.3 Códigos de error recomendados:**
```typescript
// Formato: [ENTIDAD]_[ACCION]_[RAZÓN]
'USER_EMAIL_EXISTS'          // Usuario con email ya existe
'PRODUCT_OUT_OF_STOCK'       // Producto sin stock
'ORDER_MINIMUM_AMOUNT'       // Orden bajo mínimo
'CATEGORY_HAS_PRODUCTS'      // Categoría con productos
'INVALID_PAYMENT_METHOD'     // Método de pago inválido

// Beneficios:
// - Fáciles de buscar en logs
// - Frontend puede traducir por código
// - Consistentes en toda la app
```

---

## 🎯 **11. CHECKLIST DE IMPLEMENTACIÓN**

Para cada nuevo módulo/entidad:

- [ ] ¿Creaste DTOs para validación de entrada?
- [ ] ¿Creaste validador de negocio separado?
- [ ] ¿Usas `ErrorUtilsService.withDatabaseErrorHandling()`?
- [ ] ¿Usas `AppLogger` con contexto?
- [ ] ¿Definiste códigos de error específicos?
- [ ] ¿Probaste errores de validación?
- [ ] ¿Probaste errores de negocio?
- [ ] ¿Verificaste logs en consola/archivos?
- [ ] ¿Frontend puede manejar las respuestas de error?

---

## 🚨 **12. ERRORES COMUNES A EVITAR**

### **❌ MALO:**
```typescript
// 1. Error genérico
throw new Error('Algo salió mal');

// 2. Validación en servicio
if (!user) throw new Error('No encontrado');

// 3. Sin logging
await prisma.user.create({ data });

// 4. Mezclar validaciones
if (price < 0) throw new Error('Precio inválido');
const existing = await findUser(email); // ← Mezclado
```

### **✅ BUENO:**
```typescript
// 1. Error específico
throw new BusinessRuleError('INVALID_PRICE', 'Precio inválido');

// 2. Validación con utilidad
this.errorUtils.validateOrThrow(user, 'Usuario', id);

// 3. Con logging
this.logger.log('Usuario creado', { userId: user.id });

// 4. Separado en validador
await this.validator.validateUserCreation(email);
await this.validator.validatePositivePrice(price);
```

---

## 📚 **13. RECURSOS Y REFERENCIAS**

### **Archivos clave:**
- `src/core/errors/custom.errors.ts` - Todos los errores disponibles
- `src/common/utils/error-utils.service.ts` - Utilidades reutilizables
- `src/categories/validators/` - Ejemplo completo de validador

### **Ejemplos en tu código:**
- `categories.service.ts` - Uso completo del sistema
- `category-business.validator.ts` - Validador de ejemplo
- `main.ts` - Configuración global de validación

### **Para expandir:**
- Agregar más errores específicos en `custom.errors.ts`
- Crear validadores para cada entidad nueva
- Agregar metadata útil a los logs
- Crear tests para cada tipo de error

---

## 🏁 **CONCLUSIÓN**

Tienes un **sistema profesional de manejo de errores** que muchas empresas envidiarían. 

**Recuerda:**
1. **Separa responsabilidades** - DTOs, validadores, servicios
2. **Usa los errores correctos** - Cada situación tiene su error
3. **Log con contexto** - Metadata es tu amiga
4. **Maneja consistentemente** - Frontend te lo agradecerá

**¡Ahora estás listo para construir APIs robustas y mantenibles!** 🚀