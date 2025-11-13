import React, { useMemo } from "react";
import { columns } from "./columns";
import type { IPayment } from "@/types";
import { DataTable } from "@/components/table/DataTable";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/pagination";
import { usePagination } from "@/hooks/usePagination";
import { usePaymentsFilters } from "./hooks/usePaymentsFilters";
import { usePaymentsData } from "./hooks/usePaymentsData";
import DataTablePageSkeleton from "@/components/DataTablePageSkeleton";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SortDropdown } from "@/components/sort.dropdown";
import RefreshButton from "@/components/button/RefreshButton";
import { ChevronDown } from "lucide-react";

const Payments: React.FC = () => {
  const filters = usePaymentsFilters();
  const pagination = usePagination();
  const { data, isLoading, refetch, isFetching } = usePaymentsData({
    filters,
    pagination,
  });

  //pagination
  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / pagination.limit);

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <DataTable<IPayment, unknown> columns={columns} data={data?.data || []} />
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
                  <DropdownMenuRadioItem value="Completed">
                    Completed
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
  );
};

export default Payments;
