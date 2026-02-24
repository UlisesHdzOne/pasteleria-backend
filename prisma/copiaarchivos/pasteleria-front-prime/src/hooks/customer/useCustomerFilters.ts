import { useFilters } from "../shared/useFilters";

export function useCustomerFilters() {
  return useFilters({
    initialFilters: {
      search: "",
      status: "all",
    },
  });
}

//Ejemplo de otro hook de filtros 📁 useCourseFilters.ts
// import { useFilters } from "@/hooks/useFilters";

// export function useCourseFilters() {
//   return useFilters({
//     initialFilters: {
//       search: "",
//       lifecycle: "all",
//       status: "all",
//     },
//   });
// }
