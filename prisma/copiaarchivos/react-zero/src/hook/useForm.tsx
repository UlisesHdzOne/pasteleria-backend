// import { useState, useCallback } from "react";

// export function useForm<T extends Record<string, any>>(initialValues: T) {
//   const [values, setValues] = useState<T>(initialValues);
//   const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as any);

//   const handleChange = useCallback(
//     <K extends keyof T>(field: K, value: T[K]) => {
//       setValues((p) => ({ ...p, [field]: value }));
//     },
//     [],
//   );

//   const handleBlur = useCallback(<K extends keyof T>(field: K) => {
//     setTouched((p) => ({ ...p, [field]: true }));
//   }, []);

//   const reset = useCallback(() => {
//     setValues(initialValues);
//     setTouched({} as any);
//   }, [initialValues]);

//   return {
//     values,
//     touched,
//     handleChange,
//     handleBlur,
//     reset,
//   };
// }

//quedo obsoleto ya que  useValidatedForm es mucho mejor
