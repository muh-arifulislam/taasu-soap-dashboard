"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { IUser } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { UserRole, type TUserRole } from "@/types/user";
import { UserActionCell } from "./action-cell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IUser>[] = [
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
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`;
      return <span>{fullName ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role: TUserRole = row.getValue("role");
      return <Badge variant={"secondary"}>{UserRole[role]}</Badge>;
    },
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
      return <span>{phoneNumber?.length > 0 ? phoneNumber : "N/A"}</span>;
    },
  },
  {
    accessorKey: "isDisabled",
    header: "Status",
    cell: ({ row }) => {
      const isDisabled: { status: string } = row.getValue("isDisabled");
      return (
        <Button
          variant={isDisabled ? "destructive" : "outline"}
          className="pointer-events-none capitalize"
          size="sm"
        >
          {isDisabled ? "Disabled" : "Enabled"}
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
      // Get all user data for this row
      const userData = row.original;

      return <UserActionCell user={userData} />;
    },
  },
];
