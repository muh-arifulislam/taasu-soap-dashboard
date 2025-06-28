import { Skeleton } from "@/components/ui/skeleton";

interface PaginationSkeletonProps {
  showPrevNext?: boolean;
  pageCount?: number;
}

export function PaginationSkeleton({
  showPrevNext = true,
  pageCount = 5,
}: PaginationSkeletonProps) {
  return (
    <nav className="mx-auto flex w-full justify-center" aria-label="pagination">
      <div className="flex flex-row items-center gap-1">
        {/* Previous Button */}
        {showPrevNext && (
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
        )}

        {/* Ellipsis */}
        {pageCount > 4 && (
          <div className="flex h-9 w-9 items-center justify-center">
            <Skeleton className="h-4 w-6" />
          </div>
        )}
        {pageCount > 4 && (
          <div className="flex h-9 w-9 items-center justify-center">
            <Skeleton className="h-4 w-6" />
          </div>
        )}

        {/* Next Button */}
        {showPrevNext && (
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-4" />
          </div>
        )}
      </div>
    </nav>
  );
}
