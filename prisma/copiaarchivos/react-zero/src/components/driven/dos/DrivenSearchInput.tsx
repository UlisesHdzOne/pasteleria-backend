import { useEffect, useState, useTransition, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const DrivenSearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(() => searchParams.get("search") ?? "");
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      startTransition(() => {
        const params: Record<string, string> = {};

        if (value.trim()) params.search = value;
        params.page = "1";

        setSearchParams(params);
      });
    }, 500); // debounce real

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, setSearchParams]);

  return (
    <input
      type="text"
      placeholder="Buscar driven..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      aria-busy={isPending}
    />
  );
};

export default DrivenSearchInput;
