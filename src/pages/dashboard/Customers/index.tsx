import React, { useMemo } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { columns } from "./columns";
import type { TOrder } from "@/types";
import { Input } from "@/components/ui/input";

import { SortDropdown } from "@/components/sort.dropdown";

import { DataTable } from "@/components/table/DataTable";
import { Pagination } from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { usePagination } from "@/hooks/usePagination";
import { useCustomersFilters } from "./hooks/useCustomersFilters";
import { useCustomersData } from "./hooks/useCustomersData";
import RefreshButton from "@/components/button/RefreshButton";
import DataTablePageSkeleton from "@/components/DataTablePageSkeleton";

const Customers: React.FC = () => {
  const filters = useCustomersFilters();
  const pagination = usePagination();
  const { data, refetch, isFetching, isLoading } = useCustomersData({
    filters,
    pagination,
  });

  const total = data?.meta.total || 0;
  const totalPages = Math.ceil(total / pagination.limit);

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <DataTable<TOrder, unknown> columns={columns} data={data?.data || []} />
    );
  }, [data?.data]);

  if (isLoading) {
    return <DataTablePageSkeleton />;
  }
  return (
    <div>
      {/* Filters and Search */}
      <Card className="rounded-md shadow-none mb-1">
        <CardContent className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Input
              value={filters.searchTerm}
              onChange={filters.handleInputChange}
              placeholder="Search with Email, Name"
              className="max-w-sm"
            />

            <SortDropdown
              value={filters.sortValue}
              onValueChange={filters.setSortValue}
            />
          </div>
          <div>
            <RefreshButton refetch={refetch} isFetching={isFetching} />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="rounded-md shadow-none">
        <CardContent>{renderedTable}</CardContent>

        <div className="px-8">
          <Separator />
        </div>
        <CardFooter className="flex items-center justify-center">
          <Pagination
            total={total}
            pagination={pagination}
            totalPages={totalPages}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Customers;
