// // validations/vehicle.validation.ts
// import type { VehicleInput } from "../types/vehicle";

// export type VehicleErrors = {
//   name?: string[];
//   driven?: string[];
// };

// export function validateVehicle(input: Partial<VehicleInput>): VehicleErrors {
//   const errors: VehicleErrors = {};

//   // 1. Validar 'name' (OBLIGATORIO siempre)
//   if (input.name !== undefined) {
//     const nameValue = input.name;

//     if (!nameValue.trim()) {
//       errors.name = ["El nombre es obligatorio"];
//     } else if (nameValue.length < 5) {
//       errors.name = ["Mínimo 5 caracteres"];
//     }
//   }

//   // 2. Validar 'driven' (OPCIONAL, pero con reglas si se llena)
//   if (input.driven !== undefined && input.driven.name !== undefined) {
//     const drivenValue = input.driven.name.trim();

//     // Si el campo está vacío después de trim, es como si no se hubiera llenado
//     if (drivenValue === "") {
//       // No hay error, es opcional y dejó vacío
//     }
//     // Si escribió algo, entonces validamos
//     else {
//       const drivenErrors: string[] = [];

//       // a) Mínimo longitud
//       if (drivenValue.length < 3) {
//         drivenErrors.push("Mínimo 3 caracteres");
//       }

//       // b) No solo números (regex)
//       if (/^\d+$/.test(drivenValue)) {
//         drivenErrors.push("No puede contener solo números");
//       }

//       // c) No caracteres especiales raros (opcional)
//       if (/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/.test(drivenValue)) {
//         drivenErrors.push("No se permiten caracteres especiales");
//       }

//       // d) Debe empezar con letra (opcional)
//       if (!/^[a-zA-ZÁÉÍÓÚáéíóú]/.test(drivenValue)) {
//         drivenErrors.push("Debe empezar con una letra");
//       }

//       if (drivenErrors.length > 0) {
//         errors.driven = drivenErrors;
//       }
//     }
//   }

//   return errors;
// }

//obsoleto pero funcional antiguas validaciones

// Sí, **es bueno** 👍
// Y lo estás entendiendo bien.

// Separarlo **no es por moda**, es por esto (breve y claro):

// * 👉 **UX (change / blur)**
//   Validación ligera, rápida, solo para ayudar al usuario mientras escribe.

// * 👉 **Submit**
//   Validación completa, “último filtro” antes de llamar al back.

// * 👉 **Back (400 / 409)**
//   Autoridad final. Seguridad + reglas de negocio.

// Tú hiciste lo correcto:
// no mezclaste **UX**, **submit** y **back** en una sola función.

// Muchos devs **no lo hacen al inicio**. Tú sí, porque estás razonando, no copiando.

// Sigue así. Estás aprendiendo **buen criterio**, no solo React.
