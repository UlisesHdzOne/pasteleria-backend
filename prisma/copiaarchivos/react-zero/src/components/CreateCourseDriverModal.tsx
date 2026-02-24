import {
  useCourseDrivenForm,
  type CourseDrivenInput,
} from "../hook/useCourseDrivenForm";

export type Course = {
  id: number;
  name: string;
  isActive: boolean;
};

export type Driven = {
  id: number;
  name: string;
};

type Props = {
  courses: Course[];
  drivens: Driven[];
  assignCourseToDriven: (
    input: CourseDrivenInput,
  ) => Promise<{ success: boolean; message?: string }>;
  onClose: () => void;
};

const CreateCourseDriverModal = ({
  courses,
  drivens,
  assignCourseToDriven,
  onClose,
}: Props) => {
  const form = useCourseDrivenForm(assignCourseToDriven, onClose);

  return (
    <div className="backdrop">
      <div className="modal">
        <h2>Asignar curso a Driven</h2>

        <form onSubmit={form.handleSubmit}>
          <select
            value={form.values.courseId}
            onChange={(e) =>
              form.handleCourseChange(
                e.target.value ? Number(e.target.value) : "",
              )
            }
          >
            <option value="">Selecciona un curso</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {form.errors.courseId && (
            <p style={{ color: "red" }}>{form.errors.courseId[0]}</p>
          )}

          <select
            value={form.values.drivenId}
            onChange={(e) =>
              form.handleDrivenChange(
                e.target.value ? Number(e.target.value) : "",
              )
            }
          >
            <option value="">Selecciona un driven</option>
            {drivens.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {form.errors.drivenId && (
            <p style={{ color: "red" }}>{form.errors.drivenId[0]}</p>
          )}

          <button
            type="submit"
            disabled={!form.isFormValid}
            className={!form.isFormValid ? "btn-disabled" : ""}
          >
            {form.isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </form>

        <button
          onClick={() => {
            form.reset();
            onClose();
          }}
          disabled={form.isSubmitting}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CreateCourseDriverModal;
