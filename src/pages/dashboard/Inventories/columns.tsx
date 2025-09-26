import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
// import { ProductActionCell } from "./action-cell";
import { Badge } from "@/components/ui/badge";

import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface ColumnActions {
  handleEdit: (discount: Product) => void;
  handleDelete: (discountId: string) => void;
  handleViewProduct: (product: Product) => void;
}

const getStockStatus = (quantity: number) => {
  if (quantity === 0)
    return {
      status: "Out of Stock",
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    };
  if (quantity <= 10)
    return {
      status: "Low Stock",
      color: "bg-yellow-100 text-yellow-800",
      icon: AlertTriangle,
    };
  return {
    status: "In Stock",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  };
};

export const columns = (actions: ColumnActions): ColumnDef<Product>[] => [
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
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => {
      return <span className="font-mono text-sm">{row.getValue("sku")}</span>;
    },
  },

  {
    accessorKey: "inventoryId",
    header: "Stock",
    cell: ({ row }) => {
      const product = row.original;

      const stock = product.inventory.quantity - product.inventory.sold;

      const stockStatus = getStockStatus(stock);

      const StockIcon = stockStatus.icon;

      return (
        <div className="flex items-center gap-2">
          <StockIcon className="h-4 w-4" />
          <span>{stock}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "inventoryId" + "sold",
    header: "Sold",
    cell: ({ row }) => {
      const product = row.original;
      return <span>{product.inventory.sold}</span>;
    },
  },
  {
    accessorKey: "inventoryId" + "status",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;

      const stock =
        product.inventory?.quantity || 0 - product.inventory?.sold || 0;

      const stockStatus = getStockStatus(stock);
      return <Badge className={stockStatus.color}>{stockStatus.status}</Badge>;
    },
  },
  //   {
  //     accessorKey: "createdAt",
  //     header: "Created",
  //     cell: ({ row }) => {
  //       return (
  //         <span>{dayjs(row.getValue("createdAt")).format("MM/DD/YYYY")}</span>
  //       );
  //     },
  //   },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return null;

      //   return (
      //     <ProductActionCell
      //       handleEdit={() => actions.handleEdit(product)}
      //       handleDelete={() => actions.handleDelete(product._id)}
      //       handleViewProduct={() => actions.handleViewProduct(product)}
      //     />
      //   );
    },
  },
];
