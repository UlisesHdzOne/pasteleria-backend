type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const CustomerSearch = ({ value, onChange }: Props) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar clientes..."
        className="block w-full pl-10 pr-3 py-3 border border-border/60 rounded-lg leading-5 bg-white shadow-md placeholder-muted-foreground focus:outline-none focus:placeholder-muted-foreground/70 focus:ring-2 focus:ring-ring focus:border-ring focus:shadow-lg text-foreground text-sm transition-all duration-200"
      />
    </div>
  );
};
