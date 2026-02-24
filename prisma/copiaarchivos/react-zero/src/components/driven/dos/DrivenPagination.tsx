import { useSearchParams } from "react-router-dom";
import type { DrivenMeta } from "../../../types/driven/driven";

type Props = {
  meta: DrivenMeta;
};

const DrivenPagination = ({ meta }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const goToPage = (page: number) => {
    const params: Record<string, string> = { page: String(page) };
    if (search) params.search = search;
    setSearchParams(params);
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <button
        disabled={!meta.hasPrev}
        onClick={() => goToPage(meta.page - 1)}
      >
        Anterior
      </button>

      <span>
        Página {meta.page} de {meta.totalPages}
      </span>

      <button
        disabled={!meta.hasNext}
        onClick={() => goToPage(meta.page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
};

export default DrivenPagination;
