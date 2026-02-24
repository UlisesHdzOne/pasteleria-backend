import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VehiclePage } from "./pages/VehiclePage";
import DrivenDetailPage from "./components/driven/DrivenDetailPage";
import DrivenExplorerPage from "./pages/DrivenExplorerPage";
import CoursePage from "./pages/CoursePage";
import DrivenCoursePage from "./pages/DrivenCoursePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<VehiclePage />} />
        <Route path="/driven/:id" element={<DrivenDetailPage />} />
        <Route path="/driven-list" element={<DrivenExplorerPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/driven-course" element={<DrivenCoursePage />} />

        {/* Nested routes solo para la versión Dos */}
        {/* <Route path="/drivenDos" element={<DrivenPageDos />}>
          <Route path=":id" element={<DrivenDetailPageDos />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
