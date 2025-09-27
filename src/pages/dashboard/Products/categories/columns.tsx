import { Checkbox } from "@/components/ui/checkbox";
import type { ProductCategory } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { CategoryActionCell } from "./components";

interface ColumnActions {
  handleEdit: (category: ProductCategory) => void;
  handleDelete: (discountId: string) => void;
  toggleStatus: (discountId: string) => void;
}

const getTypeColor = (type: string) => {
  const colors = {
    type: "bg-blue-100 text-blue-800",
    skinType: "bg-green-100 text-green-800",
    scent: "bg-purple-100 text-purple-800",
    useCase: "bg-orange-100 text-orange-800",
    feature: "bg-pink-100 text-pink-800",
  };
  return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const columns = (
  actions: ColumnActions
): ColumnDef<ProductCategory>[] => [
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
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground max-w-xs truncate">
          {row.getValue("slug") || "No slug"}
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <Badge className={getTypeColor(row.getValue("type"))}>
          {row.getValue("type")}
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
      const category = row.original;
      return (
        <CategoryActionCell
          data={category}
          handleEdit={() => actions.handleEdit(category)}
          handleDelete={() => actions.handleDelete(category._id)}
        />
      );
    },
  },
];
