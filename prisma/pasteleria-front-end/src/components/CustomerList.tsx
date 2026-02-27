import { useState } from "react";
import type { Customer } from "../context/customer/types";
import CustomerItem from "./CustomerItem";
import { Filter, Search, Users } from "lucide-react";

type Direction = "left" | "right" | null;

type CustomerListProps = {
  customers: Customer[];
};

const CustomerList = ({ customers }: CustomerListProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [openDirection, setOpenDirection] = useState<Direction>(null);

  const handleSetOpen = (id: string | null, direction: Direction) => {
    setOpenId(id);
    setOpenDirection(direction);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Lista de Clientes
              </h2>
              <p className="text-blue-100 text-sm">
                {customers.length}{" "}
                {customers.length === 1 ? "cliente" : "clientes"}
              </p>
            </div>
          </div>

          <button
            className="relative w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <Filter className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Search Bar (aún sin lógica) */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200" />
          <input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            className="w-full pl-11 pr-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-200 outline-none focus:bg-white/30 focus:border-white/50 transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="p-6 max-h-[600px] overflow-y-auto">
        {customers.length > 0 ? (
          <div className="flex flex-col gap-3">
            {customers.map((customer, index) => (
              <div
                key={customer.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CustomerItem
                  customer={customer}
                  onClick={() => console.log("Cliente seleccionado:", customer)}
                  onEdit={(c) => console.log("Editar cliente:", c)}
                  onDelete={(c) => console.log("Eliminar cliente:", c)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              No hay clientes
            </h3>
            <p className="text-slate-500">Aún no se han cargado clientes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;