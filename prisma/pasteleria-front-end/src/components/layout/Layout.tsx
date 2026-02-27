// components/layout/Layout.tsx
import React from "react";
import CustomNavbar from "../CustomNavbar";
import CustomFooter from "../CustomFooter";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CustomNavbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <CustomFooter />
    </div>
  );
};

export default Layout;
