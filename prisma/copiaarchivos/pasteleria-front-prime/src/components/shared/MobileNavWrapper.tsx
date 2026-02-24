import { useLocation, useNavigate } from "react-router-dom";
import { Home, Users, MapPin, ShoppingBag, User } from "lucide-react";
import type { ReactNode } from "react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
}

interface MobileNavWrapperProps {
  children: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    path: "/",
    label: "Inicio",
    icon: Home,
    ariaLabel: "Ir a página principal",
  },
  {
    path: "/customers",
    label: "Clientes",
    icon: Users,
    ariaLabel: "Ir a clientes",
  },
  {
    path: "/address",
    label: "Direcciones",
    icon: MapPin,
    ariaLabel: "Ir a direcciones",
  },
  {
    path: "/orders",
    label: "Pedidos",
    icon: ShoppingBag,
    ariaLabel: "Ir a pedidos",
  },
  {
    path: "/profile",
    label: "Perfil",
    icon: User,
    ariaLabel: "Ir a perfil",
  },
];

const MobileNavWrapper = ({ children }: MobileNavWrapperProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Contenido principal con padding para barra inferior */}
      <main className="flex-1 pb-20">{children}</main>

      {/* Barra de navegación inferior */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="flex justify-around items-center py-2">
          {NAV_ITEMS.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`
                  flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200
                  ${
                    active
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                `}
                aria-label={item.ariaLabel}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavWrapper;
