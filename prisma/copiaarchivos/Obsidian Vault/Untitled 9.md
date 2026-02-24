# 📋 **Requerimientos Completos - Sistema de Reservas de Salas**

## 🎯 **Descripción General**
Sistema web para gestionar reservas de salas/espacios donde usuarios pueden registrar, visualizar y administrar reservas de salas disponibles.

---

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Backend** (NestJS + PostgreSQL + Prisma)
### **Frontend** (React + TypeScript + Vite)

---

## 👥 **MODELOS DE DATOS**

### **Usuario**
```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  phone     String    @unique
  password  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  reservas  Reserva[]
}
```

### **Sala**
```prisma
model Sala {
  id        Int       @id @default(autoincrement())
  name      String
  capacity  Int
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  reservas  Reserva[]
}
```

### **Reserva**
```prisma
model Reserva {
  id         Int      @id @default(autoincrement())
  fecha      DateTime
  horaInicio String
  horaFin    String
  motivo     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  userId Int
  user   User @relation(fields: [userId], references: [id])
  
  salaId Int
  sala   Sala @relation(fields: [salaId], references: [id])
}
```

---

## 🔐 **MÓDULO AUTH - AUTENTICACIÓN**

### **Endpoints:**
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión

### **Funcionalidades:**
- Registro con nombre, teléfono y contraseña
- Login con teléfono y contraseña
- Generación de JWT token
- Hash de contraseñas con bcrypt
- Validación de teléfono único

### **Validaciones:**
- Teléfono debe ser único
- Contraseña mínimo 6 caracteres
- Formato de teléfono válido

---

## 👥 **MÓDULO USERS - USUARIOS**

### **Endpoints:**
- `GET /users` - Listar todos los usuarios (Admin)
- `GET /users/:id` - Obtener usuario por ID
- `GET /users/:id/reservas` - Obtener usuario con sus reservas
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario
- `POST /users` - Crear usuario (Panel Admin)

### **Funcionalidades:**
- CRUD completo de usuarios
- Diferenciación entre registro público y creación admin
- Exclusión de password en respuestas

---

## 🏢 **MÓDULO SALAS - GESTIÓN DE ESPACIOS**

### **Endpoints:**
- `GET /salas` - Listar todas las salas
- `GET /salas/:id` - Obtener sala por ID
- `POST /salas` - Crear sala (Admin)
- `PATCH /salas/:id` - Actualizar sala (Admin)
- `DELETE /salas/:id` - Eliminar sala (Admin)

### **Funcionalidades:**
- Gestión completa de salas
- Cada sala tiene nombre y capacidad
- Validación de nombre único

---

## 📅 **MÓDULO RESERVAS - SISTEMA DE RESERVAS**

### **Endpoints:**
- `GET /reserva` - Listar todas las reservas
- `GET /reserva/:id` - Obtener reserva por ID
- `POST /reserva` - Crear reserva
- `PATCH /reserva/:id` - Actualizar reserva
- `DELETE /reserva/:id` - Eliminar reserva

### **Funcionalidades:**
- Creación de reservas con fecha, horario y motivo
- Relación con usuario y sala
- Inclusión de relaciones completas en respuestas

### **Validaciones CRÍTICAS:**
- **No solapamiento**: Una sala no puede estar reservada dos veces mismo día/hora
- **Fecha futura**: No se permiten reservas en fechas pasadas
- **Formato horario**: HH:MM (24 horas)
- **Orden temporal**: horaInicio debe ser antes de horaFin
- **Duración mínima**: 30 minutos por reserva
- **Motivo**: Mínimo 5 caracteres

---

## 🛡️ **VALIDACIONES Y SEGURIDAD**

### **Backend Validations:**
```typescript
// Ejemplo de validaciones
{
  fecha: "Debe ser fecha futura",
  horaInicio: "Formato HH:MM, debe ser antes de horaFin", 
  horaFin: "Formato HH:MM, debe ser después de horaInicio",
  motivo: "Mínimo 5 caracteres",
  salaId: "Debe existir",
  userId: "Debe existir"
}
```

### **Seguridad:**
- JWT para autenticación
- Bcrypt para hash de passwords
- Validación de datos de entrada
- Manejo global de errores
- CORS configurado

---

## 🎨 **FRONTEND - REQUERIMIENTOS**

### **Estructura de Componentes:**
```
src/
├── components/
│   ├── common/
│   │   ├── Layout/
│   │   ├── Navbar/
│   │   ├── Loading/
│   │   └── Modal/
│   ├── auth/
│   │   ├── LoginForm/
│   │   └── RegisterForm/
│   ├── salas/
│   │   ├── SalaList/
│   │   ├── SalaCard/
│   │   └── SalaForm/
│   └── reservas/
│       ├── ReservaList/
│       ├── ReservaCard/
│       └── ReservaForm/
├── pages/
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── Salas/
│   ├── Reservas/
│   └── Profile/
├── services/
│   ├── api.ts
│   ├── auth.service.ts
│   ├── users.service.ts
│   ├── salas.service.ts
│   └── reservas.service.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── useLocalStorage.ts
├── context/
│   └── AuthContext.tsx
└── types/
```

### **Páginas Principales:**

#### **1. Página de Login**
- Formulario de teléfono y contraseña
- Enlace a registro
- Manejo de errores
- Redirección automática al dashboard

#### **2. Página de Registro**
- Formulario: nombre, teléfono, contraseña
- Validaciones en tiempo real
- Redirección a login después del registro

#### **3. Dashboard/Home**
- Resumen de reservas del usuario
- Accesos rápidos a funcionalidades
- Listado de salas disponibles

#### **4. Gestión de Salas**
- Listado de todas las salas
- Información: nombre, capacidad
- Filtros y búsqueda
- Formulario de creación/edición (admin)

#### **5. Gestión de Reservas**
- Listado de reservas
- Filtros por fecha y sala
- Formulario de creación de reserva
- Calendario visual de disponibilidad
- Opciones de edición y cancelación

#### **6. Perfil de Usuario**
- Información personal
- Historial de reservas
- Opción de editar datos

### **Funcionalidades Frontend:**

#### **Autenticación:**
- Login/Logout
- Protección de rutas privadas
- Persistencia de sesión
- Context de autenticación

#### **Gestión de Estado:**
- AuthContext para estado global de usuario
- React Query para cache de API
- Estado local para formularios

#### **UI/UX:**
- Diseño responsive
- Loading states
- Mensajes de error/success
- Confirmaciones para acciones destructivas
- Navegación intuitiva

#### **Formularios:**
- Validación en cliente y servidor
- Mensajes de error descriptivos
- Auto-completado
- Selectores de fecha/hora intuitivos

### **Servicios API:**
```typescript
// Ejemplo de servicios
authService: { login, register, getProfile }
usersService: { getAll, getById, update, delete }
salasService: { getAll, getById, create, update, delete }
reservasService: { getAll, getById, create, update, delete }
```

---

## 🗓️ **FLUJO PRINCIPAL DE LA APLICACIÓN**

### **Usuario No Autenticado:**
1. **Landing Page** → Login/Register
2. **Registro** → Crear cuenta → Redirige a Login
3. **Login** → Autenticación → Dashboard

### **Usuario Autenticado:**
1. **Dashboard** → Ver resumen → Navegar a módulos
2. **Salas** → Ver salas disponibles → Crear reserva
3. **Reservas** → Ver mis reservas → Gestionar reservas
4. **Perfil** → Ver/editar información personal

### **Administrador:**
1. **Gestión Salas** → Crear/editar/eliminar salas
2. **Gestión Usuarios** → Ver todos los usuarios
3. **Todas las Reservas** → Ver reservas de todos los usuarios

---

## 🚀 **CRITERIOS DE ACEPTACIÓN**

### **Backend:**
- [ ] API RESTful con estándares HTTP
- [ ] Validaciones completas en DTOs
- [ ] Manejo global de errores
- [ ] Autenticación JWT funcional
- [ ] Relaciones de BD correctamente mapeadas
- [ ] Tests unitarios básicos

### **Frontend:**
- [ ] Routing funcional con protección de rutas
- [ ] Autenticación persistente
- [ ] CRUD completo de reservas
- [ ] UI responsive y usable
- [ ] Manejo de estados de carga y error
- [ ] Formularios con validación

### **Integración:**
- [ ] Comunicación frontend-backend funcional
- [ ] CORS configurado correctamente
- [ ] Variables de entorno para configuración
- [ ] Documentación básica de API

---

## 📦 **ENTREGABLES**

### **Backend:**
- [ ] Código fuente NestJS
- [ ] Esquema de base de datos
- [ ] Colección de Postman/Insomnia
- [ ] Variables de entorno de ejemplo
- [ ] Scripts de despliegue

### **Frontend:**
- [ ] Código fuente React/TypeScript
- [ ] Build de producción
- [ ] Instrucciones de instalación
- [ ] Documentación de componentes

---

## 🔧 **TECNOLOGÍAS**

### **Backend Stack:**
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **Validation**: class-validator
- **Docs**: Swagger (opcional)

### **Frontend Stack:**
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS/Tailwind (a elegir)
- **Date Handling**: date-fns

---

¿Necesitas que detalle más algún módulo específico o quieres que empecemos a implementar alguna parte?