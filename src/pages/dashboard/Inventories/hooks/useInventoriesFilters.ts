import { useDebouncedInput } from "@/hooks/useDebouncedInput";
import { useEffect, useState } from "react";

export const useInventoriesFilters = () => {
  const {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  } = useDebouncedInput();

  const [stockFilter, setStockFilter] = useState<string>("all");
  const [sorting, setSorting] = useState<string>("default");

  // Cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetter.cancel();
    };
  }, [debouncedSetter]);

  return {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,

    stockFilter,
    setStockFilter,
    sorting,
    setSorting,
  };
};
