import { useEffect, useRef, useMemo } from "react";
import type { NormalizedErrors } from "../../../../utils/normalizeError";
import { useCustomerForm } from "../../../../customer/useCustomerForm";
import type { CreateCustomerDTO } from "../../../../context/customer/types";
import { Phone, User, X } from "lucide-react";
import { FIELD_CONFIG } from "../customer.config";
import { FieldStateHelper } from "../helpers/fieldState.helper";
import { ValidatedInput } from "../components/ValidatedInput";

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: CreateCustomerDTO) => Promise<boolean>;
  externalErrors?: NormalizedErrors;
}

const CustomerFormModal = ({
  isOpen,
  onClose,
  onSave,
  externalErrors,
}: CustomerFormModalProps) => {
  const form = useCustomerForm(onSave, externalErrors);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const fieldHandlers = useMemo(
    () => ({
      firstName: {
        onChange: form.handleFirstNameChange,
        onBlur: form.handleFirstNameBlur,
      },
      lastName: {
        onChange: form.handleLastNameChange,
        onBlur: form.handleLastNameBlur,
      },
      phone: {
        onChange: form.handlePhoneChange,
        onBlur: form.handlePhoneBlur,
      },
    }),
    [
      form.handleFirstNameChange,
      form.handleFirstNameBlur,
      form.handleLastNameChange,
      form.handleLastNameBlur,
      form.handlePhoneChange,
      form.handlePhoneBlur,
    ],
  );

  const renderField = (field: keyof CreateCustomerDTO) => {
    const config = FIELD_CONFIG[field];
    const handlers = fieldHandlers[field];
    const fieldState = form.fieldStates[field];
    const styles = FieldStateHelper.getStyles(fieldState);
    const fieldId = `customer-${field}`;
    const ariaProps = FieldStateHelper.getAriaProps(fieldState, fieldId);

    const leftIcon =
      config.icon === "phone" ? (
        <Phone className="w-5 h-5 text-slate-400" />
      ) : undefined;

    return (
      <div key={field} className="space-y-2">
        <label htmlFor={fieldId} className={styles.label}>
          {config.label} <span className="text-red-500">*</span>
        </label>

        <ValidatedInput
          ref={field === "firstName" ? firstInputRef : undefined}
          id={fieldId}
          type={config.type}
          inputType={config.inputType}
          value={form[field]}
          placeholder={config.placeholder}
          disabled={form.isSubmitting}
          fieldState={fieldState}
          styles={styles}
          leftIcon={leftIcon}
          onChange={handlers.onChange}
          onBlur={handlers.onBlur}
          ariaProps={ariaProps}
        />
      </div>
    );
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden ring-1 ring-white/70">
        {/* header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 id="modal-title" className="text-xl font-bold text-white">
              Crear cliente
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
            disabled={form.isSubmitting}
            aria-label="Cerrar diálogo"
            type="button"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* body */}
        <div className="p-4 space-y-4">
          {form.effectiveErrors.general && (
            <p
              id="modal-description"
              className="text-red-500 text-sm"
              role="alert"
            >
              {form.effectiveErrors.general[0]}
            </p>
          )}

          <form
            id="customerForm"
            onSubmit={async (e) => {
              const success = await form.handleSubmit(e);
              if (success) {
                onClose();
                form.reset();
              }
            }}
            className="space-y-4"
            noValidate
          >
            {(Object.keys(FIELD_CONFIG) as (keyof CreateCustomerDTO)[]).map(
              renderField,
            )}
          </form>
        </div>

        {/* footer */}
        <div className="p-4 border-t">
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={form.isSubmitting}
              className="flex-1 px-5 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-50 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="customerForm"
              disabled={!form.isFormValid || form.isSubmitting}
              className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {form.isSubmitting ? (
                <span className="animate-spin">Guardando...</span>
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFormModal;
