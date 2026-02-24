import { useEffect, useState } from "react";
import type { Vehicle, VehicleInput, VehiclesResponse } from "../types/vehicle";
import { normalizeError, type NormalizedErrors } from "../normalizeError";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<NormalizedErrors>({});

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:3000/vehicles");
      if (!res.ok) throw new Error();

      const data: VehiclesResponse = await res.json();
      setVehicles(data.data);
    } catch {
      setError("No se pudieron cargar los vehículos");
    } finally {
      setLoading(false);


    }
  };

  const createVehicle = async (vehicle: VehicleInput) => {
    setFormErrors({});
    try {
      const res = await fetch("http://localhost:3000/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicle),
      });

      if (!res.ok) {
        const err = await res.json();
        throw { data: err, status: res.status };
      }

      await loadVehicles();
      return true;
    } catch (err: any) {
      setFormErrors(normalizeError(err.data, err.status));
      return false;
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  return { vehicles, loading, error, formErrors, createVehicle };
}


// Route Params → aprender a capturar datos de la URL (/vehicles/:id) ook
// Query Strings → filtrar o pasar info opcional por URL (?filter=activo) ook
// Nested Routes → rutas anidadas y layouts compartidos (/vehicles/:id/details) ook
// Redirecciones / Navigate → mover al usuario automáticamente después de