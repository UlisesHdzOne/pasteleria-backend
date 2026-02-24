import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import CustomerDashboard from "../pages/customers/CustomerDashboard";
import AddressesDashboard from "../pages/addresses/AddressesDashboard";
import CustomerFormPage from "../pages/customers/CustomerFormPage/CustomerFormPage";

// Rutas sin layout (modales, formularios)
import CustomerDetailPage from "../pages/customers/CustomerDetailPage";

const RoutesComponent = () => {
  return (
    <Routes>
      {/* Layout principal con navegación móvil */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="customers" element={<CustomerDashboard />} />
        <Route path="address" element={<AddressesDashboard />} />

        {/* Futuras secciones (escalabilidad) */}
        {/* <Route path="orders" element={<OrdersDashboard />} /> */}
        {/* <Route path="profile" element={<ProfilePage />} /> */}
      </Route>

      {/* Rutas sin layout (formularios, detalle) */}
      <Route path="/customers/new" element={<CustomerFormPage />} />
      <Route path="/customers/:id" element={<CustomerDetailPage />} />
      <Route path="/customers/:id/edit" element={<CustomerFormPage />} />

      {/* Redirección */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoutesComponent;
