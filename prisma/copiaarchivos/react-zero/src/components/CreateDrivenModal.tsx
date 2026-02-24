import { useDrivenForm } from "../hook/useDrivenForm";
import type { NormalizedErrors } from "../normalizeError";
import TextInput from "./TextInput";

export type DrivenInput = {
  name: string;
};

type CreateDrivenModalProps = {
  onClose: () => void;
  onSave: (driven: DrivenInput) => Promise<boolean>;
  errors?: NormalizedErrors;
};

const CreateDrivenModal = ({
  onClose,
  onSave,
  errors,
}: CreateDrivenModalProps) => {
      const form = useDrivenForm(onSave, onClose, errors);
    
  return (
    <div className="backdrop">
      <div className="modal">
        <h2>Crear Driven</h2>

        <form onSubmit={form.handleSubmit}>
          <TextInput
            value={form.name}
            placeholder="Nombre del Driven"
            onChange={form.handleNameChange}
            onBlur={form.handleNameBlur}
            error={form.effectiveErrors.name}
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

export default CreateDrivenModal;
