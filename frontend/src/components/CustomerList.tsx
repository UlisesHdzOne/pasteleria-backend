import type { Customer } from "../services/customers/customer.types";
import CustomerActions from "./CustomerActions";

type Props = {
  customers: Customer[];
  onDelete?: (id: string) => void;
  onEdit?: (customer: Customer) => void;
  error?: string | null;
  showActions?: boolean;
};

const CustomerList = ({ customers, onDelete, onEdit, error, showActions = true }: Props) => {
  // Filtrar elementos null/undefined defensivamente
  const validCustomers = customers.filter(
    (c): c is Customer => c != null && typeof c === "object",
  );

  // 👉 Mostrar mensaje de error si hay error
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive text-lg">Error al cargar clientes</p>
        <p className="text-muted-foreground text-sm mt-2">{error}</p>
        <p className="text-muted-foreground/70 text-sm mt-2">Intenta recargar la página</p>
      </div>
    );
  }

  if (validCustomers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-lg">No hay clientes encontrados</p>
        <p className="text-muted-foreground/70 text-sm mt-2">
          Intenta ajustar tu búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {validCustomers.map((customer) => (
        <div
          key={customer.id}
          className="bg-white p-4 rounded-lg border border-border/60 shadow hover:shadow-lg hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">
                {customer.fullName}
              </h3>
              <p className="text-muted-foreground flex items-center mt-1">
                <span className="text-sm">{customer.phone}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs text-muted-foreground/60">
                {new Date(customer.createdAt).toLocaleDateString()}
              </div>
              {showActions &&
                customer.deletedAt === null &&
                (onDelete || onEdit) && (
                  <CustomerActions
                    customer={customer}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
