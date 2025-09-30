import React, { useCallback, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { SortDropdown } from "@/components/sort.dropdown";

import debounce from "lodash.debounce";

import { useEffect } from "react";

import { columns } from "./columns";
import { useGetAdminUsersQuery } from "@/redux/features/users/userApi";
import type { IUser } from "@/types";
import { DataTable } from "@/components/table/DataTable";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/pagination";
import DataTablePageSkeleton from "@/components/DataTablePageSkeleton";

const Users: React.FC = () => {
  const pagination = usePagination();

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

  const [sortValue, setSortValue] = useState("");

  const [sortBy, sortOrder] = sortValue.split("-");

  // Trigger fetch
  const { data, isLoading, isFetching, refetch } = useGetAdminUsersQuery({
    searchTerm: debouncedSearchTerm,
    sortBy,
    sortOrder: sortOrder as "asc" | "desc",
    page: pagination.page,
    limit: pagination.limit,
  });

  const total = data?.meta.total || 0;
  const totalPages = Math.ceil(total / pagination.limit);

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <DataTable<IUser, unknown> columns={columns} data={data?.data || []} />
    );
  }, [data?.data]);

  if (isLoading) {
    return <DataTablePageSkeleton />;
  }

  return (
    <div>
      <Card className="rounded-md shadow-none mb-2">
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Input
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search with Email, Name"
                className="max-w-sm"
              />

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
        </CardContent>
      </Card>

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
    </div>
  );
};

export default Users;
