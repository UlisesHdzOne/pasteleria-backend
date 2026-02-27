import { Link } from "react-router-dom";
import { Users, TrendingUp, Shield, Zap } from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: Users,
      title: "Gestión Completa",
      description: "Administra todos tus clientes desde un solo lugar",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: TrendingUp,
      title: "Análisis en Tiempo Real",
      description: "Visualiza estadísticas y métricas importantes",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Shield,
      title: "Datos Seguros",
      description: "Protección y privacidad de información garantizada",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Zap,
      title: "Rápido y Eficiente",
      description: "Interfaz optimizada para máxima productividad",
      color: "from-orange-500 to-red-600",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-20">
        <div className="inline-block mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
            <Users className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-slate-800 mb-6">
          Bienvenido a{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Pasteleria Confeti
          </span>
        </h1>

        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          La plataforma integral para gestionar tus clientes de manera
          profesional y eficiente
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/clientes"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <Users className="w-5 h-5 relative z-10" />
            <span className="relative z-10 text-lg">Comenzar Ahora</span>
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:border-blue-600 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span className="text-lg">Conocer Más</span>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-4">
          Características Principales
        </h2>
        <p className="text-center text-slate-600 mb-12 text-lg">
          Todo lo que necesitas para gestionar tu base de clientes
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-200"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl my-20">
        <h2 className="text-4xl font-bold text-white mb-4">
          ¿Listo para comenzar?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
             Únete a miles de personas que ya confían en Pasteleria confeti para gestionar
          sus relaciones con clientes
        </p>
        <Link
          to="/clientes"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Users className="w-5 h-5" />
          <span className="text-lg">Empezar Gratis</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
