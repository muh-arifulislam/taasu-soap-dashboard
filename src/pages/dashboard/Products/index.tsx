import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { columns } from "./columns";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import type { Product } from "@/types";

import DataTablePageSkeleton from "@/components/DataTablePageSkeleton";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/pagination";
import { DataTable } from "@/components/table/DataTable";
import { useProductFilters } from "./hooks";
import { ProductDialog, ProductFilters } from "./components";

export default function ProductsPage() {
  const pagination = usePagination();
  const filters = useProductFilters();

  const {
    data: response,
    refetch,
    isFetching,
    isLoading,
  } = useGetAllProductsQuery({
    page: pagination.page,
    limit: pagination.limit,
    category: filters.category,
    sortBy: filters.sorting,
    priceRange: filters.priceRange,
    stock: filters.stockFilter,
    searchTerm: filters.debouncedSearchTerm,
  });

  //pagination
  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / pagination.limit);

  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <DataTable<Product, unknown>
        columns={columns({
          handleDelete: () => {},
          handleEdit: () => {},
          handleViewProduct: setViewingProduct,
        })}
        data={response?.data || []}
      />
    );
  }, [response?.data]);

  if (isLoading) {
    return <DataTablePageSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Products Filter */}
      <ProductFilters
        filters={filters}
        refetch={refetch}
        isFetching={isFetching}
      />

      {/* Products Table */}
      <Card className="rounded-md shadow-none">
        <CardContent>{renderedTable}</CardContent>
        <CardFooter className="flex items-center justify-center">
          <Pagination
            total={total}
            pagination={pagination}
            totalPages={totalPages}
          />
        </CardFooter>
      </Card>

      {/* Product Details Dialog */}
      <ProductDialog
        viewingProduct={viewingProduct}
        setViewingProduct={setViewingProduct}
      />
    </div>
  );
}
