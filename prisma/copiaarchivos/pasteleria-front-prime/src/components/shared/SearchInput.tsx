import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
 <div className="mt- relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  <input
    type="text"
    placeholder="Buscar por nombre o teléfono..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full pl-11 pr-4 py-2.5 border-2 bg-white  border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
  />
</div>
  );
};

export default SearchInput;
