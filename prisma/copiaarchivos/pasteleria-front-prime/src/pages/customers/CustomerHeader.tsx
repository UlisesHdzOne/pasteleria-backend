import { Filter, Users } from "lucide-react";
import SearchInput from "../../components/shared/SearchInput";
type CustomerHeaderProps = {
  total?: number;
  search: string;
  onSearchChange: (value: string) => void;
};
const CustomerHeader = ({
  total,
  search,
  onSearchChange,
}: CustomerHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-6 pb-5 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
            <Users className="w-5 h-5 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Lista de Clientes
            </h2>
            {total && (
              <p className="text-sm text-blue-100">
                {total} clientes registrados
              </p>
            )}
          </div>
        </div>

        <button className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all backdrop-blur-md border border-white/20">
          <Filter className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="mt-5">
        <SearchInput value={search} onChange={onSearchChange} />
      </div>
    </div>
  );
};

export default CustomerHeader;
