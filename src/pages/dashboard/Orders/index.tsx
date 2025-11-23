import React, { useMemo } from "react";
import { columns } from "./columns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/table/DataTable";
import { Pagination } from "@/components/pagination";
import { usePagination } from "@/hooks/usePagination";
import { useOrderFilters } from "./hooks/useOrderFilters";
import { useOrdersData } from "./hooks/userOrdersData";
import DataTablePageSkeleton from "@/components/DataTablePageSkeleton";
import { OrdersFilter } from "./components";

const Orders: React.FC = () => {
  //feature hooks
  const filters = useOrderFilters();
  const pagination = usePagination();

  const { data, refetch, isLoading, isFetching } = useOrdersData({
    filters,
    pagination,
  });

  //pagination
  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / pagination.limit);

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return <DataTable columns={columns} data={data?.data || []} />;
  }, [data?.data]);

  if (isLoading) {
    return <DataTablePageSkeleton />;
  }

  return (
    <>
      <div className="space-y-6">
        {/* Filters and Search */}
        <OrdersFilter
          filters={filters}
          refetch={refetch}
          isFetching={isFetching}
        />

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
    </>
  );
};

export default Orders;
