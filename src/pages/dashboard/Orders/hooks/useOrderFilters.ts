import { useDebouncedInput } from "@/hooks/useDebouncedInput";
import { useEffect, useState } from "react";

export const useOrderFilters = () => {
  const {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  } = useDebouncedInput();

  const [sorting, setSorting] = useState<string>("default");
  const [statusFilter, setStatusFilter] = useState("");

  const [sortValue, setSortValue] = useState("");
  const [sortBy, sortOrder] = sortValue.split("-");

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
    sorting,
    setSorting,
    statusFilter,
    setStatusFilter,
    sortValue,
    setSortValue,
    sortOrder,
    sortBy,
  };
};
