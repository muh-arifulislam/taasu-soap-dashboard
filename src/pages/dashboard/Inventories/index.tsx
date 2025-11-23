import { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { columns } from "./columns";
import type { Product } from "@/types";

import { InventoriesFilter } from "./components";
import { usePagination } from "@/hooks/usePagination";
import { useInventoriesFilters } from "./hooks/useInventoriesFilters";
import { DataTable } from "@/components/table/DataTable";
import { Pagination } from "@/components/pagination";
import {
  useGetAllInventoriesQuery,
  type ExtendedInventory,
} from "@/redux/features/products/productInventoryApi";

export default function InventoriesPage() {
  const pagination = usePagination();
  const filters = useInventoriesFilters();

  const {
    data: response,
    refetch,
    isFetching,
  } = useGetAllInventoriesQuery({
    page: pagination.page,
    limit: pagination.limit,
    sortBy: filters.sorting,
    searchTerm: filters.debouncedSearchTerm,
  });

  //pagination
  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / pagination.limit);

  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

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

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <DataTable<ExtendedInventory, unknown>
        columns={columns({
          handleEdit: () => {},
        })}
        data={response?.data || []}
      />
    );
  }, [response?.data]);

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <InventoriesFilter
        filters={filters}
        refetch={refetch}
        isFetching={isFetching}
      />

      {/* Inventories Table */}
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

      {/* Product Details Dialog */}
      <Dialog
        open={!!viewingProduct}
        onOpenChange={() => setViewingProduct(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingProduct?.name}</DialogTitle>
            <DialogDescription>
              Product details and information
            </DialogDescription>
          </DialogHeader>
          {viewingProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>SKU:</strong> {viewingProduct.sku}
                    </div>
                    <div>
                      <strong>Price:</strong> ${viewingProduct.price.toFixed(2)}
                    </div>
                    <div>
                      <strong>Category:</strong>{" "}
                      {viewingProduct?.category?.name}
                    </div>
                    {viewingProduct?.discount && (
                      <div>
                        <strong>Discount:</strong>{" "}
                        {viewingProduct?.discount?.name} (
                        {viewingProduct?.discount?.discountPercent}%)
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Inventory</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>In Stock:</strong>{" "}
                      {viewingProduct.inventory.quantity}
                    </div>
                    <div>
                      <strong>Sold:</strong> {viewingProduct.inventory.sold}
                    </div>
                    <div>
                      <strong>Status:</strong>{" "}
                      <Badge
                        className={
                          getStockStatus(viewingProduct.inventory.quantity)
                            .color
                        }
                      >
                        {
                          getStockStatus(viewingProduct.inventory.quantity)
                            .status
                        }
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Descriptions</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {viewingProduct.descriptions.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Advantages</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {viewingProduct.advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingProduct.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="secondary">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Weight:</strong>{" "}
                    {viewingProduct.addInformation.weight}
                  </div>
                  <div>
                    <strong>Dimensions:</strong>{" "}
                    {viewingProduct.addInformation.dimension || "N/A"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Directions:</strong>{" "}
                    {viewingProduct.addInformation.direction || "N/A"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Warnings:</strong>{" "}
                    {viewingProduct.addInformation.warnings || "N/A"}
                  </div>
                </div>
              </div>

              {viewingProduct.images.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {viewingProduct.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${viewingProduct.name} ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
