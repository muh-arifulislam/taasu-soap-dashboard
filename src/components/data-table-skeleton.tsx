import { Skeleton } from "./ui/skeleton";

const DataTableSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Table Header Skeleton */}
      <div className="flex items-center gap-4 p-4 border-b">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Table Rows Skeleton */}
      {Array.from({ length: 6 }).map((_, index) => (
        <RowSkeleton key={index} />
      ))}
    </div>
  );
};

export default DataTableSkeleton;

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      {/* Checkbox Skeleton */}
      <Skeleton className="h-4 w-4" />

      {/* Product Name with Image Skeleton */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>

      {/* SKU Skeleton */}
      <Skeleton className="h-4 w-16" />

      {/* Category Badge Skeleton */}
      <Skeleton className="h-6 w-20 rounded-full" />

      {/* Price Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-16" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>

      {/* Stock Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-8" />
      </div>

      {/* Sold Skeleton */}
      <Skeleton className="h-4 w-8" />

      {/* Status Badge Skeleton */}
      <Skeleton className="h-6 w-20 rounded-full" />

      {/* Actions Skeleton */}
      <Skeleton className="h-8 w-8" />
    </div>
  );
}
