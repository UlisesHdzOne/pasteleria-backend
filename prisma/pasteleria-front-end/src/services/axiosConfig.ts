import type { AxiosInstance } from "axios";
import axios from "axios";

// Creamos una instancia de axios con configuración base
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores globalmente (opcional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Podemos manejar errores globales aquí (ej: 401 Unauthorized)
    console.error("Error en la petición:", error);
    return Promise.reject(error);
  },
);

export default apiClient;
