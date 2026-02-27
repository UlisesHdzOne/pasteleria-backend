import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductosPage from "./pages/ProductosPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ClientePage from "./pages/ClientePage";
import CustomerProvider from "./context/customer/CustomerProvider";

const App = () => {
  return (
    <Router>
      <CustomerProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClientePage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </CustomerProvider>
    </Router>
  );
};

export default App;