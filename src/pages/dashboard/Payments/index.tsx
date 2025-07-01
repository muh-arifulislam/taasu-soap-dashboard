import React, { useMemo } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import type { IPayment } from "@/types";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { useGetPaymentsQuery } from "@/redux/features/payments/paymentApi";

const Payments: React.FC = () => {
  // Trigger fetch
  const { data, isLoading, isFetching, refetch } =
    useGetPaymentsQuery(undefined);

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <DataTable<IPayment, unknown> columns={columns} data={data?.data || []} />
    );
  }, [data?.data]);

  return (
    <div>
      <div className="w-full flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
        <div className="flex items-center gap-4">
          <Input placeholder="Search with ID" className="max-w-sm" />
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
      <>
        {isLoading || isFetching ? (
          <TableSkeleton rows={8} columns={7} />
        ) : (
          renderedTable
        )}
      </>
    </div>
  );
};

export default Payments;
