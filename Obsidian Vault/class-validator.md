Breve y directo.

---

## 1️⃣ Instalar dependencias

```bash
npm install class-validator class-transformer
```

---

## 2️⃣ Activar validaciones globales

En `main.ts`:

```ts
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  }),
);
```

---

## 3️⃣ Usar validaciones en el DTO

```ts
// create-vehicle.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
```

---

## 🧠 Qué hace esto

👉 Si mandas `{}` → **400 error**  
👉 Si `name` no es string → **400 error**  
👉 Campos extra → **se eliminan**

---

## Regla importante

- **Controller valida**
    
- **Service asume datos correctos**
    

Eso es todo.  
Cuando quieras, vemos **qué errores devuelve Nest** y por qué.

asi en el dto aparece advertencias

```ts
// @ts-check

import eslint from '@eslint/js';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import globals from 'globals';

import tseslint from 'typescript-eslint';

  

export default tseslint.config(

{

ignores: ['eslint.config.mjs'],

},

eslint.configs.recommended,

...tseslint.configs.recommendedTypeChecked,

eslintPluginPrettierRecommended,

{

languageOptions: {

globals: {

...globals.node,

...globals.jest,

},

sourceType: 'commonjs',

parserOptions: {

projectService: true,

tsconfigRootDir: import.meta.dirname,

},

},

},

{

rules: {

'@typescript-eslint/no-explicit-any': 'off',

'@typescript-eslint/no-floating-promises': 'warn',

'@typescript-eslint/no-unsafe-argument': 'warn',

'prettier/prettier': ['error', { endOfLine: 'auto' }],

},

},
esto es lo nuevo
{

files: ['src/**/*.dto.ts'],

rules: {

'@typescript-eslint/no-unsafe-call': 'off',

},

},

);
```