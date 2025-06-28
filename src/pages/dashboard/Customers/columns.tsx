"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TOrder } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

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
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => {
      const fullName: string = row.getValue("fullName");

      return <span>{fullName.length < 2 ? "N/A" : fullName}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");

      return (
        <div className="">
          {dayjs(createdAt as string).format("MMM D, YYYY")}
        </div>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: "Phone",
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("mobile");

      return <span>{phoneNumber ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "payment",
    header: "Status",
    cell: ({ row }) => {
      const payment: { status: string } = row.getValue("payment");
      return (
        <Button
          variant={"outline"}
          className="pointer-events-none capitalize"
          size="sm"
        >
          {payment?.status || "unknown"}
        </Button>
      );
    },
  },
  {
    id: "userId",
    accessorKey: "_id",
    enableHiding: false,
    header: "",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <NavLink to={`/dashboard/customers/${row.getValue("userId")}`}>
                View customer
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
