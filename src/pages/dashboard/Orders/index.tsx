import React, { useCallback, useMemo, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useGetOrdersQuery } from "@/redux/features/orders/orderApi";
import type { TOrder } from "@/types";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortDropdown } from "@/components/sort.dropdown";

import debounce from "lodash.debounce";

import { useEffect } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Create debounced setter for searchTerm
  const debouncedSetter = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchTerm(value);
      }, 500),
    []
  );

  // Input change handler (only updates debouncedSearchTerm)
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSetter(value);
    },
    [debouncedSetter]
  );

  // Cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetter.cancel();
    };
  }, [debouncedSetter]);

  //   // Create a debounced function
  //   const debouncedChangeHandler = useCallback(
  //     debounce((value: string) => {
  //       setDebouncedSearchTerm(value);
  //     }, 500),
  //     []
  //   );

  //   // Handle input changes
  //   useEffect(() => {
  //     if (searchTerm === "") {
  //       // If input is cleared, cancel debounce and immediately update
  //       debouncedChangeHandler.cancel();
  //       setDebouncedSearchTerm("");
  //     } else {
  //       debouncedChangeHandler(searchTerm);
  //     }

  //     // Cleanup on unmount
  //     return () => {
  //       debouncedChangeHandler.cancel();
  //     };
  //   }, [searchTerm, debouncedChangeHandler]);

  const [statusFilter, setStatusFilter] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [sortBy, sortOrder] = sortValue.split("-");

  // Trigger fetch
  const { data, isLoading, isFetching, refetch } = useGetOrdersQuery({
    searchTerm: debouncedSearchTerm,
    orderStatus: statusFilter,
    sortBy,
    sortOrder: sortOrder as "asc" | "desc",
    page,
    limit,
  });

  const total = data?.meta.total || 0;
  const totalPages = Math.ceil(total / limit);

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <DataTable<TOrder, unknown> columns={columns} data={data?.data || []} />
    );
  }, [data?.data]);

  return (
    <div>
      <div className="w-full flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
        <div className="flex items-center gap-4">
          <Input
            value={searchTerm}
            onChange={handleInputChange}
            // onChange={(e) => {
            //   if (e.target.value) {
            //     setSearchTerm(e.target.value);
            //   } else {
            //     setSearchTerm("");
            //   }
            // }}
            placeholder="Filter emails..."
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filter by Status <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <DropdownMenuRadioItem value="" defaultChecked>
                  All
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Pending">
                  Pending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Processing">
                  Processing
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Shipped">
                  Shipped
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Delivered">
                  Delivered
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Completed">
                  Completed
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Canceled">
                  Canceled
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Halted">
                  Halted
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <SortDropdown value={sortValue} onValueChange={setSortValue} />
        </div>
        <div>
          <Button
            onClick={() => {
              refetch();
            }}
            size="sm"
          >
            Refetch
          </Button>
        </div>
      </div>
      <>{isLoading || isFetching ? <TableSkeleton /> : renderedTable}</>
      <>
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <button
                      onClick={() => setPage(pageNumber)}
                      className={`px-3 py-1 rounded-md ${
                        page === pageNumber
                          ? "bg-primary text-white"
                          : "text-muted-foreground"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className={
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    </div>
  );
};

export default Orders;
