import React, { useMemo } from "react";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortDropdown } from "@/components/sort.dropdown";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/table/DataTable";
import { Pagination } from "@/components/pagination";
import { usePagination } from "@/hooks/usePagination";
import { useOrderFilters } from "./hooks/useOrderFilters";
import { useOrdersData } from "./hooks/userOrdersData";
import DataTablePageSkeleton from "@/components/DataTablePageSkeleton";
import RefreshButton from "@/components/button/RefreshButton";

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
        <Card className="rounded-md shadow-none mb-1">
          <CardContent className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="flex items-center gap-4">
              <Input
                value={filters.searchTerm}
                onChange={filters.handleInputChange}
                placeholder="Search with Email, Name"
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
                    value={filters.statusFilter}
                    onValueChange={filters.setStatusFilter}
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
    </>
  );
};

export default Orders;
