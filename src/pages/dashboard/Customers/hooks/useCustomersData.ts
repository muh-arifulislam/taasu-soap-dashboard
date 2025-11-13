import { useGetCustomersQuery } from "@/redux/features/customers/customerApi";
import { useMemo } from "react";

type PropsTypes = {
  filters: Record<string, unknown>;
  pagination: Record<string, unknown>;
};

export const useCustomersData = ({ filters, pagination }: PropsTypes) => {
  const queryArgs = useMemo(
    () => ({
      searchTerm: filters.debouncedSearchTerm,
      orderStatus: filters.statusFilter,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder as "asc" | "desc",
      page: pagination.page,
      limit: pagination.limit,
    }),
    [
      filters.debouncedSearchTerm,
      filters.statusFilter,
      filters.sortBy,
      filters.sortOrder,
      pagination.page,
      pagination.limit,
    ]
  );

  const { data, isLoading, refetch, isFetching, isError, error } =
    useGetCustomersQuery(queryArgs);

  // Optional: Transform or normalize error
  let errorMessage: string | null = null;

  if (isError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ("status" in (error as any)) {
      const err = error as { status: number; data?: { message?: string } };
      errorMessage =
        err.data?.message || `Request failed with status ${err.status}`;
    } else {
      errorMessage = "Something went wrong. Please try again.";
    }
  }

  return {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    errorMessage,
  };
};
