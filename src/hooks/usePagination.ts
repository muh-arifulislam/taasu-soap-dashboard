import { useCallback, useState } from "react";

const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
};

export const usePagination = () => {
  const [page, setPage] = useState(PAGINATION_CONFIG.DEFAULT_PAGE);
  const [limit, setLimit] = useState(PAGINATION_CONFIG.DEFAULT_LIMIT);

  const goToPage = useCallback((newPage: number, totalPages: number) => {
    setPage(Math.max(1, Math.min(totalPages, newPage)));
  }, []);

  const goToPreviousPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback((totalPages: number) => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  }, []);

  return {
    page,
    limit,
    setLimit,
    goToPage,
    goToPreviousPage,
    goToNextPage,
  };
};
