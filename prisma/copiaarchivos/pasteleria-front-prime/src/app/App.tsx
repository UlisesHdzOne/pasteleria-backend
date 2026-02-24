import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes";
import ToastProvider from "../context/toast/ToastProvider";
import CustomerProvider from "../context/customer/CustomerProvider";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CustomerProvider>
          <RoutesComponent />
        </CustomerProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
