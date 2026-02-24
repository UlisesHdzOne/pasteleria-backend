import { useEffect, useMemo, useState, useTransition } from "react";
import { useDebounce } from "../hook/useDebounce";
import { useDrivenData } from "../assets/context/driven/DrivenDataContext";
import { DrivenCoursesDataProvider } from "../assets/context/driven-courses/driven/DrivenCoursesDataContext";
import { DrivenCoursesActionsProvider } from "../assets/context/driven-courses/driven/DrivenCoursesActionsContext";
import DrivenCoursesModal from "../components/DrivenCoursesModal";
import { useDrivenActions } from "../assets/context/driven/DrivenActionsContext";
import CreateDrivenModal, {
  type DrivenInput,
} from "../components/CreateDrivenModal";
import type { NormalizedErrors } from "../normalizeError";
import { useCourseFilters } from "../hook/useCourseFilters";
import Toast from "../components/Toast";

type ToastType = { message: string; type: "success" | "error" };

const DrivenExplorerPage = () => {
  const { drivens, meta, error } = useDrivenData();
  const { fetchDrivens, loading, createDriven } = useDrivenActions();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  const { resetFilters } = useCourseFilters();
  const debouncedSearch = useDebounce(search, 400);
  const [isPending, startTransition] = useTransition();
  const [selectedDriven, setSelectedDriven] = useState<number | null>(null);
  const [openCrearDriven, setOpenCrearDriven] = useState(false);
  const [formErrors, setFormErrors] = useState<NormalizedErrors | undefined>();
  const [toast, setToast] = useState<ToastType | null>(null);
  const toastTimeoutRef = useState<number | null>(null)[0];

  const showToast = (message: string, type: "success" | "error") => {
    if (toastTimeoutRef) clearTimeout(toastTimeoutRef);
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (data: DrivenInput) => {
    const result = await createDriven(data);

    if (!result.success) {
      if (result.code === "DRIVEN_NAME_ALREADY_EXISTS") {
        setFormErrors({ name: [result.message] });
      } else {
        showToast(result.message, "error");
      }
      return false;
    }

    showToast("¡Curso creado exitosamente!", "success");
    resetFilters();
    setFormErrors(undefined);
    return true;
  };

  const params = useMemo(
    () => ({
      search: debouncedSearch,
      page,
      isActive: status === "all" ? undefined : status === "active",
    }),
    [debouncedSearch, page, status],
  );

  useEffect(() => {
    startTransition(() => {
      fetchDrivens(params);
    });
  }, [params, fetchDrivens]);

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h1>Driven list</h1>

      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value as "all" | "active" | "inactive");
          setPage(1);
        }}
      >
        <option value="all">Todos</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
      </select>

      <input
        type="text"
        placeholder="Buscar driven..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <button onClick={() => setOpenCrearDriven(true)}>Nuevo Driven</button>

      {(isPending || loading) && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <ul>
        {drivens.map((d) => (
          <li key={d.id}>
            {d.name} {d.isActive ? "✅" : "❌"} {d.coursesCount}
            <button onClick={() => setSelectedDriven(d.id)}>Ver cursos</button>
          </li>
        ))}
      </ul>

      {selectedDriven && (
        <DrivenCoursesDataProvider>
          <DrivenCoursesActionsProvider>
            <DrivenCoursesModal
              drivenId={selectedDriven}
              onClose={() => setSelectedDriven(null)}
            />
          </DrivenCoursesActionsProvider>
        </DrivenCoursesDataProvider>
      )}

      <div>
        <button disabled={!meta?.hasPrev} onClick={() => setPage((p) => p - 1)}>
          Anterior
        </button>
        <span>
          Página {meta?.page ?? 1} de {meta?.totalPages ?? 1}
        </span>
        <button disabled={!meta?.hasNext} onClick={() => setPage((p) => p + 1)}>
          Siguiente
        </button>
      </div>

      {openCrearDriven && (
        <CreateDrivenModal
          onClose={() => setOpenCrearDriven(false)}
          onSave={handleSave}
          errors={formErrors}
        />
      )}
    </div>
  );
};

export default DrivenExplorerPage;
