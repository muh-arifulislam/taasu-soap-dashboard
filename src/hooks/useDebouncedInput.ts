import { useState, useEffect, useMemo, useCallback } from "react";
import debounce from "lodash.debounce";

export function useDebouncedInput(delay: number = 500) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const debouncedSetter = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
      }, delay),
    [delay]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSetter(value);
    },
    [debouncedSetter]
  );

  useEffect(() => {
    return () => {
      debouncedSetter.cancel();
    };
  }, [debouncedSetter]);

  return {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  };
}
