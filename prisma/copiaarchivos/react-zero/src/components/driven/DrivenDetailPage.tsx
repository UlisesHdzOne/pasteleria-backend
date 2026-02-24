import { useParams } from "react-router-dom";
import { useDrivenData } from "../../assets/context/driven/DrivenDataContext";
//import { useDrivenContext } from "../context/DrivenContext";

const DrivenDetailPage = () => {
  
    const { drivens } = useDrivenData();
  
  const { id } = useParams<{ id: string }>();

  const driven = drivens.find((d) => d.id === Number(id));

  if (!driven) return <p>No se encontró el driven.</p>;
  return (
    <div>
      <h1>Detalle del Driven</h1>
      <p>ID: {driven.id}</p>
      <p>Nombre: {driven.name}</p>
    </div>
  );
};

export default DrivenDetailPage;
