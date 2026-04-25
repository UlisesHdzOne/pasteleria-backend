import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationMeta } from "../types/pagination";

interface Props {
  meta: PaginationMeta;
  page: number;
  totalAll?: number | null;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({ meta, page, totalAll, onPrev, onNext }: Props) => {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 pb-2 px-4 bg-white rounded-lg border border-border shadow-sm">
      <div className="text-sm text-muted-foreground">
        Página {page} de {meta.totalPages} ({meta.total} clientes)
        {totalAll !== null && totalAll !== meta.total && (
          <span className="ml-2 text-muted-foreground/60">
            (filtrado de {totalAll} total)
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={!meta.hasPrev}
          className="flex items-center px-3 py-2 border border-border/80 bg-white shadow-sm rounded-md text-sm text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </button>
        <button
          onClick={onNext}
          disabled={!meta.hasNext}
          className="flex items-center px-3 py-2 border border-border/80 bg-white shadow-sm rounded-md text-sm text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
        >
          Siguiente
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
