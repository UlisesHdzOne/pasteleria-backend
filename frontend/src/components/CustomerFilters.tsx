import type { UseCustomerListFilters } from "../hooks/customers/useCustomers";

interface Props {
  filters: UseCustomerListFilters;
  onUpdateFilter: <K extends keyof UseCustomerListFilters>(
    key: K,
    value: UseCustomerListFilters[K],
  ) => void;
}

const CustomerFilters = ({ filters, onUpdateFilter }: Props) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={filters.status}
        onChange={(e) =>
          onUpdateFilter(
            "status",
            e.target.value as UseCustomerListFilters["status"],
          )
        }
        className="px-3 py-2.5 border border-border/60 rounded-md text-sm bg-white shadow-md text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
      >
        <option value="active">Activos</option>
        <option value="deleted">Eliminados</option>
        <option value="all">Todos</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) =>
          onUpdateFilter(
            "sortBy",
            e.target.value as UseCustomerListFilters["sortBy"],
          )
        }
        className="px-3 py-2.5 border border-border/60 rounded-md text-sm bg-white shadow-md text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
      >
        <option value="createdAt">Fecha de creación</option>
        <option value="firstName">Nombre</option>
        <option value="lastName">Apellido</option>
      </select>

      <select
        value={filters.sortOrder}
        onChange={(e) =>
          onUpdateFilter(
            "sortOrder",
            e.target.value as UseCustomerListFilters["sortOrder"],
          )
        }
        className="px-3 py-2.5 border border-border/60 rounded-md text-sm bg-white shadow-md text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
      >
        <option value="desc">Descendente</option>
        <option value="asc">Ascendente</option>
      </select>
    </div>
  );
};

export default CustomerFilters;
