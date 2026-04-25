import { useState } from "react";
import { CustomerSearch } from "../components/customer/CustomerSearch.tsx";
import CustomerListContainer from "../../components/CustomerListContainer";
import { PageHeader } from "../../components/PageHeader";
import { UserPlus } from "lucide-react";
const CustomerPage = () => {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <PageHeader
          title="Clientes"
          description="Gestiona el listado de clientes de Prime Pastelería Hilda"
          backHref="/"
          backLabel="Volver al inicio"
          action={
            <button
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-sm hover:bg-primary/90 transition"
            >
              <UserPlus className="w-4 h-4" />
              Crear Cliente
            </button>
          }
        />

        <div className="mt-6 mb-6">
          <CustomerSearch value={search} onChange={setSearch} />
        </div>

        <div className="bg-secondary/15 border border-border/60 rounded-xl p-6 shadow-md">
          <CustomerListContainer
            search={search}
            setSearch={setSearch}
            isCreateOpen={isCreateOpen}
            setIsCreateOpen={setIsCreateOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
