import { useState, useEffect, useMemo } from "react";

import {
  Plus,
  Search,
  Trash2,
  Download,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
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

// Mock data - replace with actual API calls
const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Hydrating Face Cream",
    sku: "HFC-001",
    price: 29.99,
    descriptions: [
      "A luxurious hydrating cream for all skin types",
      "Provides 24-hour moisture",
    ],
    advantages: [
      "Long-lasting hydration",
      "Non-greasy formula",
      "Suitable for sensitive skin",
    ],
    ingredients: ["Hyaluronic Acid", "Vitamin E", "Aloe Vera"],
    addInformation: {
      weight: "50ml",
      dimension: "5cm x 5cm x 8cm",
      direction: "Apply twice daily to clean skin",
      warnings: "For external use only",
    },
    images: ["/placeholder.svg?height=100&width=100"],
    categoryId: "1",
    categoryName: "Skincare",
    inventoryId: "1",
    inventory: {
      quantity: 150,
      sold: 45,
    },
    discountId: "1",
    discountName: "Summer Sale",
    discountPercent: 20,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    name: "Anti-Aging Serum",
    sku: "AAS-002",
    price: 49.99,
    descriptions: ["Powerful anti-aging serum with retinol"],
    advantages: [
      "Reduces fine lines",
      "Improves skin texture",
      "Clinically tested",
    ],
    ingredients: ["Retinol", "Peptides", "Niacinamide"],
    addInformation: {
      weight: "30ml",
      dimension: "3cm x 3cm x 10cm",
      direction: "Use only at night, apply to clean skin",
      warnings: "May cause sensitivity, use sunscreen during the day",
    },
    images: ["/placeholder.svg?height=100&width=100"],
    categoryId: "4",
    categoryName: "Anti-Aging",
    inventoryId: "2",
    inventory: {
      quantity: 75,
      sold: 23,
    },
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    _id: "3",
    name: "Lavender Body Lotion",
    sku: "LBL-003",
    price: 19.99,
    descriptions: ["Soothing lavender-scented body lotion"],
    advantages: ["Relaxing scent", "Quick absorption", "Natural ingredients"],
    ingredients: ["Lavender Oil", "Shea Butter", "Coconut Oil"],
    addInformation: {
      weight: "250ml",
      dimension: "6cm x 6cm x 15cm",
      direction: "Apply to clean skin as needed",
      warnings: "Avoid contact with eyes",
    },
    images: ["/placeholder.svg?height=100&width=100"],
    categoryId: "3",
    categoryName: "Lavender",
    inventoryId: "3",
    inventory: {
      quantity: 5,
      sold: 89,
    },
    discountId: "2",
    discountName: "New Customer",
    discountPercent: 15,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    _id: "4",
    name: "Organic Face Mask",
    sku: "OFM-004",
    price: 15.99,
    descriptions: ["100% organic clay face mask"],
    advantages: [
      "Deep cleansing",
      "Organic ingredients",
      "Suitable for oily skin",
    ],
    ingredients: ["Bentonite Clay", "Charcoal", "Tea Tree Oil"],
    addInformation: {
      weight: "100g",
      dimension: "8cm x 8cm x 3cm",
      direction:
        "Apply thin layer, leave for 15 minutes, rinse with warm water",
      warnings: "Patch test recommended",
    },
    images: ["/placeholder.svg?height=100&width=100"],
    categoryId: "5",
    categoryName: "Organic",
    inventoryId: "4",
    inventory: {
      quantity: 0,
      sold: 156,
    },
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
];

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [sorting, setSorting] = useState<string>("name-asc");

  const { data: response } = useGetAllProductsQuery({
    page,
    limit,
    category,
    sortBy: sorting,
    priceRange,
    stock: stockFilter,
  });
  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const { data: categories } = useGetAllCategoriesQuery({
    searchTerm: "",
    type: "all",
  });

  const [products, setProducts] = useState<Product[]>(mockProducts);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteProduct = async (productId: string) => {
    setIsLoading(true);
    try {
      // Soft delete - set deletedAt timestamp
      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId
            ? { ...product, deletedAt: new Date().toISOString() }
            : product
        )
      );
      toast("The product has been moved to trash.");
    } catch (error) {
      toast("There was an error deleting the product.");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
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

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <ProductDataTable<Product, unknown>
        columns={columns({
          handleDelete: handleDeleteProduct,
          handleEdit: () => {},
          toggleStatus: () => {},
        })}
        data={response?.data || []}
      />
    );
  }, [response?.data]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and details
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full lg:w-[180px]">
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
              <SelectTrigger className="w-full lg:w-[180px]">
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
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sorting} onValueChange={setSorting}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
                <SelectItem value="price-asc">Price Low-High</SelectItem>
                <SelectItem value="price-desc">Price High-Low</SelectItem>
                <SelectItem value="stock-asc">Stock Low-High</SelectItem>
                <SelectItem value="stock-desc">Stock High-Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            A list of all products in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderedTable}</CardContent>

        <CardFooter className="flex items-center justify-end">
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
            <SelectTrigger className="w-[180px]">
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
                      <strong>Category:</strong> {viewingProduct.categoryName}
                    </div>
                    {viewingProduct.discountName && (
                      <div>
                        <strong>Discount:</strong> {viewingProduct.discountName}{" "}
                        ({viewingProduct.discountPercent}%)
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will move the product to trash. You can restore it
              later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                productToDelete && handleDeleteProduct(productToDelete)
              }
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
