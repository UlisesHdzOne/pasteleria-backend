import { useEffect, useState } from "react";
import { useCourseAction } from "../assets/context/course/CourseActionsContext";
import { useCourseData } from "../assets/context/course/CourseDataContext";
import type {
  CourseInput,
  CourseLifecycleStatus,
  CourseUpdateInput,
} from "../types/course/course";
import CreateCourseModal from "../components/CreateCourseModal";
import type { NormalizedErrors } from "../normalizeError";
import Toast from "../components/Toast";
import {
  useCourseFilters,
  type LifecycleFilter,
  type StatusFilter,
} from "../hook/useCourseFilters";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import EditCourseModal from "../components/EditCourseModal";

const CoursePage = () => {
  const [courseToDelete, setCourseToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [courseToEdit, setCourseToEdit] = useState<{
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
    status: CourseLifecycleStatus;
    durationHours?: string;
  } | null>(null);

  const { fetchCourses, loading, createCourse, deleteCourse, updateCourse } =
    useCourseAction();
  const { courses, meta, error } = useCourseData();

  const {
    setPage,
    status,
    setStatus,
    lifecycle,
    setLifecycle,
    search,
    setSearch,
    params,
    resetFilters,
  } = useCourseFilters();

  const [open, setOpen] = useState(false);

  const [formErrors, setFormErrors] = useState<NormalizedErrors | undefined>();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (data: CourseInput) => {
    const res = await createCourse(data);

    if (!res.success) {
      setFormErrors(res.errors);
      if (res.errors?.general?.length) {
        showToast(res.errors.general[0], "error");
      }
      return false;
    }

    setFormErrors(undefined);
    showToast("¡Curso creado exitosamente!", "success");
    resetFilters();
    return true;
  };

  const handleUpdate = async (id: number, data: Partial<CourseUpdateInput>) => {
    const res = await updateCourse(id, data);

    if (!res.success) {
      setFormErrors(res.errors);
      if (res.errors?.general?.length) {
        showToast(res.errors.general[0], "error");
      }
      return false;
    }

    setFormErrors(undefined);
    showToast("Curso actualizado", "success");
    return true;
  };

  useEffect(() => {
    fetchCourses(params);
  }, [params, fetchCourses]);

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <h1>Courses cs</h1>

      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value as StatusFilter);
          setPage(1);
        }}
      >
        <option value="all">Todos</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
      </select>

      <select
        value={lifecycle}
        onChange={(e) => {
          setLifecycle(e.target.value as LifecycleFilter);
          setPage(1);
        }}
      >
        <option value="all">Todos</option>
        <option value="DRAFT">DRAFT</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="ARCHIVED">ARCHIVED</option>
      </select>

      <input
        type="text"
        placeholder="Buscar curso..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <button onClick={() => setOpen(true)}>Nuevo curso</button>


      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <ul>
        {courses.map((c) => (
          <li key={c.id} style={{ marginBottom: 12 }}>
            <strong>{c.name}</strong>

            <div>{c.description}</div>

            <div>
              Estado: {c.isActive ? "Activo ✅" : "Inactivo ❌"} ({c.status})
            </div>

            <div>Duración: {c.durationHours ?? "-"} hrs</div>

            <button
              disabled={loading}
              onClick={() => setCourseToDelete({ id: c.id, name: c.name })}
            >
              {loading ? "Procesando..." : "Eliminar"}
            </button>

            <button
              disabled={loading}
              onClick={() =>
                setCourseToEdit({
                  id: c.id,
                  name: c.name,
                  description: c.description,
                  isActive: c.isActive,
                  status: c.status,
                  durationHours: c.durationHours?.toString() ?? "",
                })
              }
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      <div>
        <button disabled={!meta?.hasPrev} onClick={() => setPage((p) => p - 1)}>
          Anterior
        </button>
        <span>
          Página {meta?.page} de {meta?.totalPages}
        </span>
        <button disabled={!meta?.hasNext} onClick={() => setPage((p) => p + 1)}>
          Siguiente
        </button>
      </div>

      {open && (
        <CreateCourseModal
          onClose={() => setOpen(false)}
          onSave={handleSave}
          errors={formErrors}
        />
      )}

      {courseToDelete && (
        <ConfirmDeleteModal
          courseName={courseToDelete.name}
          loading={loading}
          onCancel={() => setCourseToDelete(null)}
          onConfirm={async () => {
            const ok = await deleteCourse(courseToDelete.id);
            setCourseToDelete(null);

            if (ok) showToast("Curso eliminado", "success");
            else showToast("No se pudo eliminar", "error");
          }}
        />
      )}

      {courseToEdit && (
        <EditCourseModal
          initial={{
            name: courseToEdit.name,
            description: courseToEdit.description,
            isActive: courseToEdit.isActive,
            status: courseToEdit.status,
            durationHours: courseToEdit.durationHours?.toString() ?? "", // <-- aquí
          }}
          errors={formErrors}
          onClose={() => {
            setCourseToEdit(null);
            setFormErrors(undefined);
          }}
          onSave={(data) => handleUpdate(courseToEdit.id, data)}
        />
      )}


    </div>
  );
};

export default CoursePage;
