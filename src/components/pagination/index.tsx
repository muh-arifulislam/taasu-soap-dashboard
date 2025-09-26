import type { usePagination } from "@/hooks/usePagination";
import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PAGINATION_CONFIG } from "@/pages/dashboard/Products/categories/constant";
import { PaginationSkeleton } from "../skeleton/PaginationSkeleton";

export const Pagination: React.FC<{
  pagination: ReturnType<typeof usePagination>;
  totalPages: number;
  total: number;
  loading?: boolean;
}> = ({ pagination, totalPages, total, loading }) => {
  const { page, limit, setLimit, goToPage, goToPreviousPage, goToNextPage } =
    pagination;

  if (loading) {
    return <PaginationSkeleton />;
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-secondary w-full">
      <div>
        <p>{`Showing ${page * limit - limit + 1} - ${
          page * limit
        } of ${total} results`}</p>
      </div>
      <div className="flex items-center justify-between">
        {totalPages > 1 && (
          <PaginationRoot>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <button
                      onClick={() => goToPage(pageNumber, totalPages)}
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
                  onClick={() => goToNextPage(totalPages)}
                  className={
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </PaginationRoot>
        )}
        <Select
          value={String(limit)}
          onValueChange={(value) => setLimit(Number(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGINATION_CONFIG.LIMIT_OPTIONS.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
