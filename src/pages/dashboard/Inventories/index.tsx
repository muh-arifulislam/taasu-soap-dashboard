import { useState, useEffect, useMemo } from "react";

import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProductDataTable } from "./data-table";
import { columns } from "./columns";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import type { Product } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllCategoriesQuery } from "@/redux/features/products/productCategoryApi";
import { useDebouncedInput } from "@/hooks/useDebouncedInput";

import { Separator } from "@/components/ui/separator";

export default function InventoriesPage() {
  //product filtering queries
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [sorting, setSorting] = useState<string>("name-asc");
  const {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  } = useDebouncedInput(500);

  // Cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetter.cancel();
    };
  }, [debouncedSetter]);

  const { data: response } = useGetAllProductsQuery({
    page,
    limit,
    category,
    sortBy: sorting,
    priceRange,
    stock: stockFilter,
    searchTerm: debouncedSearchTerm,
  });

  //pagination
  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  //fetching categories data
  const { data: categories } = useGetAllCategoriesQuery({
    searchTerm: "",
    type: "all",
  });

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
      <ProductDataTable<Product, unknown>
        columns={columns({
          handleDelete: () => {},
          handleEdit: () => {},
          handleViewProduct: setViewingProduct,
        })}
        data={response?.data || []}
      />
    );
  }, [response?.data]);

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="rounded-md shadow-none mb-1">
        <CardContent className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleInputChange}
                className="pl-8 bg-accent"
              />
            </div>
            <Select>
              <SelectTrigger className="relative w-[200px] bg-accent pl-12 font-semibold">
                <SelectValue placeholder="Category" />
                <span className="absolute left-2 text-muted-foreground font-normal">
                  Show:
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="deleted">Deleted Products</SelectItem>
                <SelectItem value="disabled">Disabled Products</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sorting} onValueChange={setSorting}>
              <SelectTrigger className="relative w-[165px] bg-accent pl-15 font-semibold">
                <SelectValue />
                <span className="absolute left-2 text-muted-foreground font-normal">
                  Sort by:
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
                <SelectItem value="price-asc">Price Low-High</SelectItem>
                <SelectItem value="price-desc">Price High-Low</SelectItem>
                <SelectItem value="stock-asc">Stock Low-High</SelectItem>
                <SelectItem value="stock-desc">Stock High-Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={"outline"}>
              <RefreshCcw />
              Refetch
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Filters and Search */}
      <Card className="rounded-md shadow-none mb-1">
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full max-w-xs bg-accent">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.data?.map((category) => (
                  <SelectItem key={category._id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value);
              }}
            >
              <SelectTrigger className="w-full max-w-xs bg-accent font-semibold">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="$0-$20">$0 - $20</SelectItem>
                <SelectItem value="$21-$40">$21 - $40</SelectItem>
                <SelectItem value="$40">$40+</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full max-w-xs bg-accent">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="rounded-md shadow-none">
        <CardContent>{renderedTable}</CardContent>

        <div className="px-8">
          <Separator />
        </div>
        <CardFooter className="flex items-center justify-center">
          {totalPages > 1 && (
            <div>
              <Pagination className="">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      className={
                        page <= 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNumber = idx + 1;
                    return (
                      <PaginationItem key={pageNumber}>
                        <button
                          onClick={() => setPage(pageNumber)}
                          className={`px-3 py-1 rounded-md ${
                            page === pageNumber
                              ? "bg-primary text-white"
                              : "text-muted-foreground"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      className={
                        page >= totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          <Select
            value={String(limit)}
            onValueChange={(value) => setLimit(Number(value))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 / page</SelectItem>
              <SelectItem value="24">24 / page</SelectItem>
              <SelectItem value="48">48 / page</SelectItem>
              <SelectItem value="100">100 / page</SelectItem>
            </SelectContent>
          </Select>
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
