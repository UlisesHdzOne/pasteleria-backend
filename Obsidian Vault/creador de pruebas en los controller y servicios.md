Sí.  
Puedes usar un prompt genérico así para que yo (o cualquier otro modelo) genere pruebas de ese estilo para tus controladores y servicios:

---

**Prompt sugerido:**

```
Quiero que actúes como un generador de pruebas unitarias en Jest para un proyecto Node.js con TypeScript.  
Te voy a pasar el código de un archivo (puede ser un servicio o un controlador).  
Quiero que generes un archivo de pruebas .test.ts siguiendo estas reglas:  

1. Usa Jest con mocks para todas las dependencias externas (servicios, repositorios, librerías externas).  
2. Si es un servicio:
   - Crea pruebas para casos de éxito y de error.
   - Simula repositorios con `jest.fn()` para sus métodos.
   - Simula librerías como bcrypt, jwt, etc.
3. Si es un controlador:
   - Mockea las dependencias inyectadas (servicios).
   - Simula `req`, `res` y `next` de Express usando `jest.fn()`.
   - Verifica que los métodos del servicio fueron llamados con los parámetros correctos.
4. No uses variables antes de que estén inicializadas dentro de `jest.mock()`.
5. Asegúrate de cubrir validaciones, errores y casos límite.
6. Estructura las pruebas con `describe` y `test` (o `it`).
7. Limpia mocks con `beforeEach(() => jest.clearAllMocks())`.
8. Los nombres de los tests deben ser descriptivos y en español.

Cuando te pase el archivo, responde solo con el código completo del archivo `.test.ts`.
```

---

Si quieres, te puedo dejar también **una variante más compacta** para usarla rápido:

```
Genera pruebas unitarias en Jest para este archivo TypeScript (servicio o controlador).  
- Mockea dependencias y librerías externas.  
- Cubre casos de éxito, error y validaciones.  
- Si es servicio: mockea repositorios y funciones auxiliares.  
- Si es controlador: mockea req, res, next y servicios inyectados.  
- Usa beforeEach para limpiar mocks.  
- Los nombres de pruebas en español.  
Aquí está el archivo:
```

---

Si quieres, puedo ahora adaptarte este prompt para que **automáticamente** genere el test con el mismo estilo que el `user.service.test.ts` que ya hiciste.  
Así quedaría exactamente como tu formato actual.  
¿Quieres que lo prepare así?



/////////////////////
Quiero que generes un archivo de pruebas unitarias en Jest para este archivo TypeScript (puede ser un servicio o un controlador).  
Debes seguir exactamente el estilo y la estructura del archivo user.service.test.ts que te paso como referencia:

Referencia de estilo:
- Uso de describe y test en español con descripciones claras.
- Limpieza de mocks con beforeEach(() => jest.clearAllMocks()).
- Uso de mocks explícitos para repositorios, servicios y librerías externas.
- Cobertura de casos de éxito y casos de error/validaciones.
- Si es un servicio:
    * Mockea repositorios como objetos con métodos jest.fn().
    * Simula dependencias externas como bcrypt o jwt usando jest.spyOn o jest.mock.
    * Retorna mensajes claros como "Usuario registrado con éxito." cuando aplique.
- Si es un controlador:
    * Mockea req, res, next de Express usando jest.fn().
    * Mockea las funciones del servicio que el controlador usa.
    * Verifica que se llamen con los argumentos correctos.
- Nunca uses variables antes de inicializarlas en jest.mock().
- Las pruebas deben estar totalmente autocontenidas, sin depender de base de datos real ni APIs externas.

Al final, entrega únicamente el código del archivo .test.ts listo para usarse.

Aquí está el archivo para testear:
