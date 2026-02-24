import TextInput from "./TextInput";
import type { NormalizedErrors } from "../normalizeError";
import type {
  CourseLifecycleStatus,
  CourseUpdateInput,
} from "../types/course/course";
import { useEditCourseForm } from "../hook/useEditCourseForm";

type EditCourseModalProps = {
  initial: {
    name: string;
    description?: string;
    isActive: boolean;
    status: CourseLifecycleStatus;
    durationHours: string;
  };
  onClose: () => void;
  onSave: (data: CourseUpdateInput) => Promise<boolean>;
  errors?: NormalizedErrors;
};

const EditCourseModal = ({
  initial,
  onClose,
  onSave,
  errors,
}: EditCourseModalProps) => {
  const form = useEditCourseForm(initial, onSave, onClose, errors);

  return (
    <div className="backdrop">
      <div className="modal">
        <h2>Editar curso</h2>

        <form onSubmit={form.handleSubmit}>
          <TextInput
            value={form.name}
            placeholder="Nombre del curso"
            onChange={form.handleNameChange}
            onBlur={form.handleNameBlur}
            error={form.effectiveErrors.name}
            disabled={form.isSubmitting}
          />

          <TextInput
            value={form.description ?? ""}
            placeholder="Descripcion del curso"
            onChange={form.handleDescriptionChange}
            onBlur={form.handleDescriptionBlur}
            error={form.effectiveErrors.description}
            disabled={form.isSubmitting}
          />

          <TextInput
            value={form.durationHours ?? ""}
            placeholder="12"
            onChange={form.handleDurationHoursChange}
            onBlur={form.handleDurationHoursBlur}
            error={form.effectiveErrors.durationHours}
            disabled={form.isSubmitting}
          />

          <label>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => form.handleActiveChange(e.target.checked)}
              disabled={form.isSubmitting}
            />
            Activo
          </label>

          <label>
            Estado:
            <select
              value={form.status}
              onChange={(e) =>
                form.handleStatusChange(e.target.value as CourseLifecycleStatus)
              }
              disabled={form.isSubmitting}
            >
              <option value="DRAFT">DRAFT</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={!form.isFormValid}
            className={!form.isFormValid ? "btn-disabled" : ""}
          >
            {form.isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </form>

        <button onClick={onClose} disabled={form.isSubmitting}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default EditCourseModal;
