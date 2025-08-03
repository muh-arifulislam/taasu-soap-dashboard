import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import dayjs from "dayjs";

import { ProductActionCell } from "./action-cell";
import { Badge } from "@/components/ui/badge";

import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface ColumnActions {
  handleEdit: (discount: Product) => void;
  handleDelete: (discountId: string) => void;
  toggleStatus: (discountId: string) => void;
}

const getDiscountColor = (percent: number) => {
  if (percent <= 10) return "bg-green-100 text-green-800";
  if (percent <= 30) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

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

const getPriceAfterDiscount = (price: number, discountPercent?: number) => {
  if (!discountPercent) return price;
  return price - (price * discountPercent) / 100;
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
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-3">
          <img
            src={
              "https://res.cloudinary.com/dmiorpsf7/image/upload/v1738833868/taasu-soap-website/Org-Home-2_dbwagp.jpg"
            }
            alt={product.name}
            className="h-10 w-10 rounded-md object-cover"
          />
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-muted-foreground">
              {product.descriptions[0]?.substring(0, 50)}...
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => {
      return <span className="font-mono text-sm">{row.getValue("sku")}</span>;
    },
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row }) => {
      const product = row.original;
      return <Badge variant="outline">{product.category?.name}</Badge>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex flex-col">
          <span
            className={
              product.discount?.discountPercent
                ? "line-through text-muted-foreground text-sm"
                : ""
            }
          >
            ${product.price.toFixed(2)}
          </span>
          {product.discount?.discountPercent && (
            <div className="flex items-center gap-1">
              <span className="font-medium">
                $
                {getPriceAfterDiscount(
                  product.price,
                  product.discount.discountPercent
                ).toFixed(2)}
              </span>
              <Badge
                className={
                  "text-xs" +
                  " " +
                  getDiscountColor(product.discount.discountPercent)
                }
              >
                -{product.discount?.discountPercent}%
              </Badge>
            </div>
          )}
        </div>
      );
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
      const discount = row.original;
      return (
        <ProductActionCell
          data={discount}
          handleEdit={() => actions.handleEdit(discount)}
          handleDelete={() => actions.handleDelete(discount._id)}
        />
      );
    },
  },
];
