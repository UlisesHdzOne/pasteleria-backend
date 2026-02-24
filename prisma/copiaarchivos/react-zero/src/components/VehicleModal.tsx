import "./VehicleModal.css";
import type { VehicleInput } from "../types/vehicle";
import TextInput from "./TextInput";
import type { NormalizedErrors } from "../normalizeError";
import { useVehicleForm } from "../hook/useVehicleForm";

type VehicleModalProps = {
  onClose: () => void;
  onSave: (vehicle: VehicleInput) => Promise<boolean>;
  errors?: NormalizedErrors;
};

const VehicleModal = ({ onClose, onSave, errors }: VehicleModalProps) => {
  const form = useVehicleForm(onSave, onClose, errors);

  return (
    <div className="backdrop">
      <div className="modal">
        <h2>Registrar vehículo</h2>

        <form onSubmit={form.handleSubmit}>
          <TextInput
            value={form.name}
            placeholder="Nombre"
            onChange={form.handleNameChange}
            onBlur={form.handleNameBlur}
            error={form.effectiveErrors.name}
            disabled={form.isSubmitting}
          />

          <TextInput
            value={form.driven}
            placeholder="Driven (opcional)"
            onChange={form.handleDrivenChange}
            onBlur={form.handleDrivenBlur}
            error={form.effectiveErrors.driven}
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

export default VehicleModal;

//bueno antes del cambio 
// Formularios dinámicos: campos que se agregan o quitan según el usuario.

// Formularios avanzados: validaciones, dependencias entre campos, manejo de submit async.

// Optimización de renders: React.memo, Lazy loading de componentes, Suspense.

// React Router avanzado: nested routes, params, query strings, redirecciones.

// Integración con APIs más complejas: POST, PATCH, DELETE, manejo de errores global.

// State management más grande: combinar Context con Reducers (useReducer) para manejar estados más complejos.