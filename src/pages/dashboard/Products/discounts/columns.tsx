import { Checkbox } from "@/components/ui/checkbox";
import type { ProductDiscount } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import dayjs from "dayjs";

import { DiscountActionCell } from "./action-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface ColumnActions {
  handleEdit: (discount: ProductDiscount) => void;
  handleDelete: (discountId: string) => void;
  toggleStatus: (discountId: string) => void;
}

const getDiscountColor = (percent: number) => {
  if (percent <= 10) return "bg-green-100 text-green-800";
  if (percent <= 30) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

export const columns = (
  actions: ColumnActions
): ColumnDef<ProductDiscount>[] => [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <>
        <span className="font-medium">{row.getValue("name")}</span>
      </>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground max-w-xs truncate">
          {row.getValue("description") || "No description"}
        </span>
      );
    },
  },
  {
    accessorKey: "discountPercent",
    header: "Discount",
    cell: ({ row }) => {
      return (
        <Badge className={getDiscountColor(row.getValue("discountPercent"))}>
          {row.getValue("discountPercent")}%
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const discount = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => actions.toggleStatus(discount._id)}
            className="h-8 w-8 p-0"
          >
            {discount.isActive ? (
              <Eye className="h-4 w-4 text-green-600" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-400" />
            )}
          </Button>
          <Badge variant={discount.isActive ? "default" : "secondary"}>
            {discount.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      return (
        <span>{dayjs(row.getValue("createdAt")).format("MM/DD/YYYY")}</span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const discount = row.original;
      return (
        <DiscountActionCell
          data={discount}
          handleEdit={() => actions.handleEdit(discount)}
          handleDelete={() => actions.handleDelete(discount._id)}
        />
      );
    },
  },
];
