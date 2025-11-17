import { useDebouncedInput } from "@/hooks/useDebouncedInput";
import type { ProductCategoryType } from "@/types";
import { useEffect, useState } from "react";

export const useCategoryFilters = () => {
  const {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  } = useDebouncedInput();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryType, setCategoryType] = useState<ProductCategoryType | "all">(
    "all"
  );
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
    statusFilter,
    setStatusFilter,
    categoryType,
    setCategoryType,
    sorting,
    setSorting,
  };
};
