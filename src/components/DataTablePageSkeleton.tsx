import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Separator } from "./ui/separator";

const DataTablePageSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Search and Actions Skeleton */}
      <Card className="rounded-md shadow-none mb-1">
        <CardContent className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2">
            {/* Search Input Skeleton */}
            <div className="relative">
              <Skeleton className="h-10 w-64" />
            </div>
            {/* Show Filter Skeleton */}
            <Skeleton className="h-10 w-[200px]" />
            {/* Sort Filter Skeleton */}
            <Skeleton className="h-10 w-[165px]" />
          </div>
          <div className="flex items-center gap-2">
            {/* Refetch Button Skeleton */}
            <Skeleton className="h-10 w-24" />
            {/* Add Product Button Skeleton */}
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Additional Filters Skeleton */}
      <Card className="rounded-md shadow-none mb-1">
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-2">
            {/* Category Filter Skeleton */}
            <Skeleton className="h-10 w-full max-w-xs" />
            {/* Price Range Filter Skeleton */}
            <Skeleton className="h-10 w-full max-w-xs" />
            {/* Stock Filter Skeleton */}
            <Skeleton className="h-10 w-full max-w-xs" />
          </div>
        </CardContent>
      </Card>

      {/* Products Table Skeleton */}
      <Card className="rounded-md shadow-none">
        <CardContent>
          <ProductsTableSkeleton />
        </CardContent>
        <div className="px-8">
          <Separator />
        </div>
        <CardFooter className="flex items-center justify-center">
          {/* Pagination Skeleton */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-8" />
              <Skeleton className="h-10 w-8" />
              <Skeleton className="h-10 w-8" />
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataTablePageSkeleton;
function ProductsTableSkeleton() {
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
        <ProductRowSkeleton key={index} />
      ))}
    </div>
  );
}

function ProductRowSkeleton() {
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
