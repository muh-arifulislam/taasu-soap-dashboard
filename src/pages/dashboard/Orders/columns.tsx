"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { TOrder } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { OrderActionCell } from "./action-cell";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TOrder>[] = [
  {
    id: "_id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <NavLink
        to={`/dashboard/orders/${row.getValue("orderId")}`}
        className={"hover:underline"}
      >
        {`#${row.getValue("orderId")}`}
      </NavLink>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");

      return (
        <div className="">
          {dayjs(createdAt as string).format("MMM D, YYYY")}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => {
      const user: { _id: string; fullName: string } = row.getValue("user");

      return (
        <NavLink
          to={`/dashboard/customers/${user?._id}`}
          className={"hover:underline"}
        >
          {user.fullName}
        </NavLink>
      );
    },
  },
  {
    accessorKey: "payment",
    header: "Payment Status",
    cell: ({ row }) => {
      const payment: { status: string } = row.getValue("payment");
      return (
        <Button
          variant={"outline"}
          size="sm"
          className={cn(
            "pointer-events-none capitalize",
            `${
              payment.status === "paid"
                ? "border-green-600 border-text-600"
                : "border-amber-600 text-amber-600"
            }`
          )}
        >
          {payment?.status}
        </Button>
      );
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.getValue("items");
      return <div className="">{Array.isArray(items) && items.length}</div>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => {
      const status: string = row.getValue("orderStatus");

      return (
        <Button
          size="sm"
          className={cn(
            "w-full max-w-26",
            `${
              status === "Completed"
                ? "bg-green-800 hover:bg-green-700"
                : "bg-amber-600 hover:bg-amber-500"
            }`
          )}
        >
          {status}
        </Button>
      );
    },
  },

  {
    id: "orderId" + "0",
    accessorKey: "orderId",
    enableHiding: false,
    header: "",
    cell: ({ row }) => {
      const orderData = row.original;

      return <OrderActionCell order={orderData} />;
    },
  },
];
