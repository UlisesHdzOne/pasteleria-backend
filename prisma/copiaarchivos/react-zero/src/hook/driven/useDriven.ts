// import { useEffect, useState } from "react";
// import type { DrivenResponse } from "../../types/driven/driven";
// import type { Driven } from "../../types/vehicle";

// export function useDriven() {
//   const [drivens, setDrivens] = useState<Driven[]>([]);
//   const loadDrivens = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/driven");
//       const data: DrivenResponse = await res.json();
//       setDrivens(data.data);
//     } catch {
//     } finally {
//     }
//   };

//   useEffect(() => {
//     loadDrivens();
//   }, []);

//   return { drivens };
// }
 //con el contexto DrivenContext quedo obsoleto este hook