Para profundizar más en esto, conviene verlo como **“Manejo de errores y excepciones en NestJS”**. No es solo `NotFoundException`, hay varias otras que son útiles según el caso:

### 1️⃣ Excepciones integradas en NestJS

- **`NotFoundException`** → HTTP 404, cuando no se encuentra un recurso.
    
- **`BadRequestException`** → HTTP 400, para datos inválidos o faltantes.
    
- **`UnauthorizedException`** → HTTP 401, acceso no autorizado.
    
- **`ForbiddenException`** → HTTP 403, acceso prohibido aunque esté autenticado.
    
- **`ConflictException`** → HTTP 409, conflictos de datos (ej: duplicados).
    
- **`InternalServerErrorException`** → HTTP 500, errores internos inesperados.
    

### 2️⃣ Buenas prácticas

- Siempre **validar existencia de datos** antes de hacer operaciones que dependan de ellos (`findVehicleById` con `NotFoundException`).
    
- Usar el tipo de excepción adecuado según la situación.
    
- No mezclar lógica de validación con lógica de negocio si se vuelve muy complejo; puedes crear **servicios de validación separados**.
    

### 3️⃣ Conceptos relacionados para profundizar

- **Exception filters**: personalizar cómo se manejan todas las excepciones en tu app.
    
- **Custom exceptions**: crear tus propias excepciones con mensajes y códigos específicos.
    
- **Global error handling**: capturar errores no controlados y transformarlos en respuestas HTTP uniformes.
    

---

### **🚨 Manejo de errores en NestJS**

#### **1️⃣ NotFoundException**

```ts
import { NotFoundException } from '@nestjs/common';

async findVehicleById(id: number) {
  const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) {
    throw new NotFoundException(`Vehicle with id ${id} not found`);
  }
  return vehicle;
}
```

- Se lanza cuando un recurso no existe.
    
- Devuelve **HTTP 404** con mensaje.
    

---

#### **2️⃣ BadRequestException**

```ts
import { BadRequestException } from '@nestjs/common';

if (!dto.name) {
  throw new BadRequestException('Name is required');
}
```

- Para datos inválidos o faltantes.
    
- HTTP 400.
    

---

#### **3️⃣ ForbiddenException**

```ts
import { ForbiddenException } from '@nestjs/common';

throw new ForbiddenException('You do not have access');
```

- Para accesos prohibidos aunque el usuario esté autenticado.
    
- HTTP 403.
    

---

#### **4️⃣ ConflictException**

```ts
import { ConflictException } from '@nestjs/common';

throw new ConflictException('Vehicle already exists');
```

- Para conflictos de datos (duplicados, violaciones de reglas).
    
- HTTP 409.
    

---

### **💡 Buenas prácticas**

- Siempre **validar existencia de recursos** antes de actualizar o eliminar.
    
- Usar la excepción **correcta** según la situación.
    
- Puedes crear **métodos auxiliares** que lancen las excepciones, para reutilizar:
    

```ts
async ensureVehicleExists(id: number) {
  const vehicle = await this.findVehicleById(id);
  if (!vehicle) throw new NotFoundException(`Vehicle ${id} no existe`);
  return vehicle;
}
```


---

## **🚗 Flujo CRUD con Excepciones**

### **Tabla `Vehicle`**

|id|name|
|---|---|
|1|Car|
|2|Bike|
|3|Truck|

---

### **1️⃣ Crear vehículo (createVehicle)**

```ts
async createVehicle(dto: CreateVehicleDto) {
  if (!dto.name) throw new BadRequestException('Name is required');
  const exists = await this.prisma.vehicle.findUnique({ where: { name: dto.name } });
  if (exists) throw new ConflictException('Vehicle already exists');
  return this.prisma.vehicle.create({ data: { name: dto.name } });
}
```

**Flujo:**

```
[Cliente POST /vehicles] 
         ↓
[Valida dto.name] → ❌ vacio? → BadRequestException
         ↓
[Verifica duplicado] → ❌ existe? → ConflictException
         ↓
[Crear registro] → Devuelve objeto creado
```

---

### **2️⃣ Listar todos los vehículos (findAllVehicles)**

```ts
async findAllVehicles() {
  return this.prisma.vehicle.findMany();
}
```

**Flujo:**

```
[Cliente GET /vehicles]
         ↓
[Trae todos los registros] → Devuelve array de Vehicles
```

---

### **3️⃣ Obtener vehículo por ID (findVehicleById)**

```ts
async findVehicleById(id: number) {
  const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) throw new NotFoundException(`Vehicle with id ${id} not found`);
  return vehicle;
}
```

**Flujo:**

```
[Cliente GET /vehicles/:id]
         ↓
[Buscar registro por id] → ❌ no existe? → NotFoundException
         ↓
[Registro encontrado] → Devuelve objeto Vehicle
```

---

### **4️⃣ Actualizar vehículo (updateVehicle)**

```ts
async updateVehicle(id: number, dto: UpdateVehicleDto) {
  await this.findVehicleById(id); // Validación de existencia
  return this.prisma.vehicle.update({
    where: { id },
    data: { name: dto.name },
  });
}
```

**Flujo:**

```
[Cliente PATCH /vehicles/:id]
         ↓
[Validar existencia] → ❌ no existe? → NotFoundException
         ↓
[Actualizar registro] → Devuelve objeto actualizado
```

---

### **5️⃣ Eliminar vehículo (removeVehicle)**

```ts
async removeVehicle(id: number) {
  await this.findVehicleById(id); // Validación de existencia
  return this.prisma.vehicle.delete({ where: { id } });
}
```

**Flujo:**

```
[Cliente DELETE /vehicles/:id]
         ↓
[Validar existencia] → ❌ no existe? → NotFoundException
         ↓
[Eliminar registro] → Devuelve objeto eliminado
```

---

### **💡 Notas clave**

- Usamos **NotFoundException** cuando un recurso no existe.
    
- **BadRequestException** para datos inválidos.
    
- **ConflictException** para duplicados.
    
- Validar **existencia antes de update/delete** evita errores de Prisma.
    
- Reutilizar métodos como `findVehicleById` hace tu código más limpio y seguro.
    

---
