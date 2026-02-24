import { useState } from "react";
import { useVehicles } from "../hook/useVehicles";
import Toast from "../components/Toast";
import VehicleList from "../components/VehicleList";
import VehicleModal from "../components/VehicleModal";


export const VehiclePage = () => {

      const { vehicles, loading, error, createVehicle, formErrors } = useVehicles();
      const [open, setOpen] = useState(false);
    
      const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
      } | null>(null);
    
      const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
      };
    
      // Función wrapper para createVehicle
      const handleSave = async (vehicleData: any) => {
        const success = await createVehicle(vehicleData);
    
        if (success) {
          showToast("¡Vehículo creado exitosamente!", "success");
        } else {
          if (formErrors.general && formErrors.general.length > 0) {
            showToast(formErrors.general[0], "error");
          }
        }
        return success;
      };
    
      if (loading) return <p>Cargando vehículos...</p>;
      if (error) return <p>{error}</p>;
    
  return (
    <>
      <h1>Veiculos</h1>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <VehicleList vehicles={vehicles} />
      <button onClick={() => setOpen(true)}>Nuevo vehiculo</button>

      {open && (
        <VehicleModal
          onClose={() => setOpen(false)}
          onSave={handleSave}
          errors={formErrors}
        />
      )}
    </>
  )
}
