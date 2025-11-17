import { useDebouncedInput } from "@/hooks/useDebouncedInput";
import { useEffect, useState } from "react";

export const useDiscountFilters = () => {
  const {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  } = useDebouncedInput();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sorting, setSorting] = useState<string>("default");
  const [discountRangeFilter, setDiscountRangeFilter] = useState<string>("all");

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
    statusFilter,
    setStatusFilter,
    sorting,
    setSorting,
    discountRangeFilter,
    setDiscountRangeFilter,
  };
};
