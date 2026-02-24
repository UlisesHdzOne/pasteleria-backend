import { useCustomer } from "../../../context/customer/useCustomer";
import { useState } from "react";
import { CreateCustomerDTO } from "../../../context/customer/types";

const initialFormState: CreateCustomerDTO = {
  firstName: "",
  lastName: "",
  phone: "",
};

const CustomerFormPage = () => {
  const { createCustomer, loading } = useCustomer();
  const [formData, setFormData] = useState<CreateCustomerDTO>({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    // Limpiar error general
    if (generalError) {
      setGeneralError("");
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "El nombre es requerido";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "El apellido es requerido";
    }
    if (!formData.phone.trim()) {
      errors.phone = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "El teléfono debe tener 10 dígitos";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await createCustomer(formData);

    if (result.success) {
      alert("¡Cliente creado exitosamente!");
      setFormData(initialFormState);
      setFieldErrors({});
      setGeneralError("");
    } else {
      // Si el error tiene un campo específico, lo mostramos ahí
      if (result.field) {
        setFieldErrors((prev) => ({
          ...prev,
          [result.field!]: result.error || "Error en este campo",
        }));
      } else {
        // Si no tiene campo específico, es un error general
        setGeneralError(result.error || "Error al crear el cliente");
      }

      // Si el código es PHONE_ALREADY_EXISTS, podemos hacer algo específico
      if (result.code === "PHONE_ALREADY_EXISTS") {
        console.log("El teléfono ya existe, podemos enfocar el input");
        // Podríamos hacer focus en el input del teléfono
        document.getElementById("phone")?.focus();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "20px auto" }}
    >
      <h2>Crear Nuevo Cliente</h2>

      {/* Error general */}
      {generalError && (
        <div
          style={{
            color: "white",
            backgroundColor: "#dc3545",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          {generalError}
        </div>
      )}

      {/* Campo Nombre */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="firstName"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Nombre:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={loading}
          style={{
            width: "100%",
            padding: "8px",
            border: fieldErrors.firstName
              ? "2px solid #dc3545"
              : "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {fieldErrors.firstName && (
          <span
            style={{
              color: "#dc3545",
              fontSize: "12px",
              marginTop: "4px",
              display: "block",
            }}
          >
            {fieldErrors.firstName}
          </span>
        )}
      </div>

      {/* Campo Apellido */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="lastName"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Apellido:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={loading}
          style={{
            width: "100%",
            padding: "8px",
            border: fieldErrors.lastName
              ? "2px solid #dc3545"
              : "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {fieldErrors.lastName && (
          <span
            style={{
              color: "#dc3545",
              fontSize: "12px",
              marginTop: "4px",
              display: "block",
            }}
          >
            {fieldErrors.lastName}
          </span>
        )}
      </div>

      {/* Campo Teléfono */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="phone"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Teléfono:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={loading}
          placeholder="10 dígitos"
          style={{
            width: "100%",
            padding: "8px",
            border: fieldErrors.phone ? "2px solid #dc3545" : "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {fieldErrors.phone && (
          <span
            style={{
              color: "#dc3545",
              fontSize: "12px",
              marginTop: "4px",
              display: "block",
            }}
          >
            {fieldErrors.phone}
          </span>
        )}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: loading ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Creando cliente..." : "Crear Cliente"}
      </button>
    </form>
  );
};

export default CustomerFormPage;
