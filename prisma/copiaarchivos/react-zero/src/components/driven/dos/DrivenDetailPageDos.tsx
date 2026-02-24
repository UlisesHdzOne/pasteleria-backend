import { useParams } from "react-router-dom";
//import { useDrivenContext } from "../../context/DrivenContext";
import "./DrivenDetailPageDos.css";
import { useDrivenData } from "../../../assets/context/driven/DrivenDataContext";

const DrivenDetailPageDos = () => {
  //const { drivens } = useDrivenContext();
  const { drivens } = useDrivenData();

  const { id } = useParams<{ id: string }>();

  const driven = drivens.find((d) => d.id === Number(id));

  if (!driven) return <p>No se encontró el driven.</p>;

  return (
    <div className="targeta">
      <h1>Detalle del Driven</h1>
      <p>ID: {driven.id}</p>
      <p>Nombre: {driven.name}</p>
    </div>
  );
};

export default DrivenDetailPageDos;
