Claro, aquí tienes un prompt reutilizable para definir cuántos controladores debe tener un módulo, basado en responsabilidades y dominios:

---

**Prompt para decidir cantidad y organización de controladores en un módulo:**

1. ¿Los endpoints que debo implementar pertenecen al mismo dominio funcional o contexto de negocio?

   * Sí: Considerar un módulo único.
   * No: Crear módulos separados.

2. ¿Las funcionalidades tienen responsabilidades claramente diferenciadas?

   * Sí: Crear controladores separados por responsabilidad (ejemplo: `AuthController`, `PasswordResetController`).
   * No: Consolidar en un solo controlador para evitar fragmentación innecesaria.

3. ¿Los controladores propuestos comparten lógica o servicios comunes?

   * Sí: Mantenerlos en el mismo módulo para compartir dependencias fácilmente.
   * No: Modularizar para independencia.

4. ¿La cantidad de endpoints en un controlador afecta la legibilidad o mantenimiento?

   * Sí: Repartir responsabilidades funcionalmente.
   * No: Mantener juntos para evitar sobre división.

---

Con este prompt te puedes guiar para decidir si necesitas 1, 2 o más controladores por módulo. ¿Quieres que te lo formatee para alguna plantilla o checklist?
