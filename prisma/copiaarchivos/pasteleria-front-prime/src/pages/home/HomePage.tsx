import { Link } from "react-router-dom";
import { Users, MapPin, ShoppingBag, User } from "lucide-react";

const HomePage = () => {
  const quickActions = [
    {
      title: "Clientes",
      description: "Gestiona tu base de clientes",
      icon: Users,
      path: "/customers",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Direcciones",
      description: "Administra direcciones de entrega",
      icon: MapPin,
      path: "/address",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Pedidos",
      description: "Controla tus pedidos",
      icon: ShoppingBag,
      path: "/orders",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Perfil",
      description: "Configura tu cuenta",
      icon: User,
      path: "/profile",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido</h1>
        <p className="text-gray-600">¿Qué te gustaría hacer hoy?</p>
      </header>

      {/* Grid de acciones rápidas */}
      <main className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.path}
              to={action.path}
              className={`
                ${action.color}
                text-white rounded-xl p-6 shadow-md transition-all duration-200
                transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
                flex flex-col items-center text-center space-y-3
              `}
            >
              <Icon className="w-8 h-8" />
              <div>
                <h3 className="font-semibold text-lg">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </main>

      {/* Sección de estadísticas (placeholder) */}
      <section className="mt-12 max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Resumen Rápido
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600">Clientes</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">Direcciones</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
