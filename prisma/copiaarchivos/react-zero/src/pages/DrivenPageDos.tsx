// import { useEffect } from "react";
// import { Outlet, useSearchParams } from "react-router-dom";
// import DrivensListDos from "../components/driven/dos/DrivensListDos";
// import DrivenSearchInput from "../components/driven/dos/DrivenSearchInput";
// import DrivenPagination from "../components/driven/dos/DrivenPagination";
// import { useDrivenData } from "../assets/context/driven/DrivenDataContext";
// import { useDrivenActions } from "../assets/context/driven/DrivenActionsContext";
// //import { useDrivenActions } from "../assets/context/DrivenActionsContext";

// const DrivenPageDos = () => {
//   //const { drivens, loading, error, fetchDrivens,meta } = useDrivenContext();
//   const { drivens, meta, error } = useDrivenData();
//   const { fetchDrivens, loading } = useDrivenActions();
  

// const [searchParams] = useSearchParams();
// const search = searchParams.get("search") ?? "";
// const page = Number(searchParams.get("page") ?? 1);

// useEffect(() => {
//   fetchDrivens({ search, page });
// }, [search, page]);

//   if (loading) return <p>Cargando...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div style={{ display: "flex", gap: "2rem" }}>
//       <div style={{ flex: 1 }}>
//         <h1>Driven dos</h1>
//         <DrivenSearchInput />
//         <DrivensListDos drivens={drivens} />
//         {meta && <DrivenPagination meta={meta} />}
//       </div>

//       <div style={{ flex: 2 }}>
//         {/* Aquí se renderiza el detalle del driven seleccionado */}
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DrivenPageDos;
