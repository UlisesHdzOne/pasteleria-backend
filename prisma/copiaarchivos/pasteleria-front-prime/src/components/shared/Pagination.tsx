import type { CustomerMeta } from "../../context/customer/types";

type PaginationProps = {
  meta: CustomerMeta;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination = ({ meta, onPrev, onNext }: PaginationProps) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={!meta.hasPrev}
        onClick={onPrev}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
      >
        Anterior
      </button>

      <span className="text-sm">
        Página {meta.page} de {meta.totalPages}
      </span>

      <button
        disabled={!meta.hasNext}
        onClick={onNext}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
