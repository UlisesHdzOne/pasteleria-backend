import { Outlet } from "react-router-dom";
import MobileNavWrapper from "../components/shared/MobileNavWrapper";

const MainLayout = () => {
  return (
    <MobileNavWrapper>
      <Outlet />
    </MobileNavWrapper>
  );
};

export { MainLayout };
