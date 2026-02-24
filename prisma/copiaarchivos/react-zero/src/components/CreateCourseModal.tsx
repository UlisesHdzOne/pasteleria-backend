import type { CourseInput } from "../types/course/course";
import type { NormalizedErrors } from "../normalizeError";
import TextInput from "./TextInput";
import { useCourseForm } from "../hook/useCourseForm";

type CreateCourseModalProps = {
  onClose: () => void;
  onSave: (course: CourseInput) => Promise<boolean>;
  errors?: NormalizedErrors;
};

const CreateCourseModal = ({
  onClose,
  onSave,
  errors,
}: CreateCourseModalProps) => {
  const form = useCourseForm(onSave, onClose, errors);

  return (
    <div className="backdrop">
      <div className="modal">
        <h2>Crear curso</h2>

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
            value={form.description}
            placeholder="Descripción (opcional)"
            onChange={form.handleDescriptionChange}
            onBlur={form.handleDescriptionBlur}
            error={form.effectiveErrors.description}
            disabled={form.isSubmitting}
          />

          <TextInput
            value={form.durationHours}
            placeholder="Duración en horas (opcional)"
            onChange={form.handleDurationChange}
            onBlur={form.handleDurationBlur}
            error={form.effectiveErrors.durationHours}
            disabled={form.isSubmitting}
          />

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

export default CreateCourseModal;
