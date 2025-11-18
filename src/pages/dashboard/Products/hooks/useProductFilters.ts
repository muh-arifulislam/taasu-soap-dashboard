import { useDebouncedInput } from "@/hooks/useDebouncedInput";

import { useEffect, useState } from "react";

export const useProductFilters = () => {
  const {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  } = useDebouncedInput();

  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
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
    category,
    setCategory,
    priceRange,
    setPriceRange,
    stockFilter,
    setStockFilter,
    sorting,
    setSorting,
  };
};
