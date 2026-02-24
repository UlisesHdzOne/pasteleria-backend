import { useEffect, useState } from "react";
import { useDrivenCoursesData } from "../assets/context/driven-courses/driven/DrivenCoursesDataContext";
import { useDrivenCoursesActions } from "../assets/context/driven-courses/driven/DrivenCoursesActionsContext";

type Props = {
  drivenId: number;
  onClose: () => void;
};

const DrivenCoursesModal = ({ drivenId, onClose }: Props) => {
  const { courses, meta, error } = useDrivenCoursesData();
  const { fetchCourses, loading } = useDrivenCoursesActions();
  const [page, setPage] = useState(1);

  // Reset page al cambiar el Driven
  useEffect(() => {
    setPage(1);
  }, [drivenId]);

  // Fetch cursos
  useEffect(() => {
    if (!drivenId) return;
    fetchCourses(drivenId, { page, limit: 10 });
  }, [drivenId, page, fetchCourses]);

  return (
    <div className="backdrop">
      <div className="modal">
        <button onClick={onClose}>Cerrar</button>
        <h2>Cursos del Driven modal</h2>

        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}

        <ul>
          {courses.map((c) => (
            <li key={c.id}>
              {c.name} | {c.isActive ? "✅" : "❌"} | {c.status} | {c.progress}%
            </li>
          ))}
        </ul>

        <div>
          <button
            disabled={!meta?.hasPrev}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </button>
          <span>
            Página {meta?.page} de {meta?.totalPages}
          </span>
          <button
            disabled={!meta?.hasNext}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrivenCoursesModal;
