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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const categories = [
  { _id: "1", name: "Skincare" },
  { _id: "2", name: "Dry Skin" },
  { _id: "3", name: "Lavender" },
  { _id: "4", name: "Anti-Aging" },
  { _id: "5", name: "Organic" },
];

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const { data: response } = useGetAllProductsQuery({
    page,
    limit,
  });
  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter((product) => !product.deletedAt);

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId === categoryFilter
      );
    }

    // Price range filter
    if (priceRangeFilter !== "all") {
      filtered = filtered.filter((product) => {
        switch (priceRangeFilter) {
          case "low":
            return product.price <= 20;
          case "medium":
            return product.price > 20 && product.price <= 40;
          case "high":
            return product.price > 40;
          default:
            return true;
        }
      });
    }

    // Stock filter
    if (stockFilter !== "all") {
      filtered = filtered.filter((product) => {
        switch (stockFilter) {
          case "in-stock":
            return product.inventory.quantity > 10;
          case "low-stock":
            return (
              product.inventory.quantity > 0 && product.inventory.quantity <= 10
            );
          case "out-of-stock":
            return product.inventory.quantity === 0;
          default:
            return true;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Product];
      let bValue: any = b[sortBy as keyof Product];

      if (sortBy === "price") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortBy === "stock") {
        aValue = a.inventory.quantity;
        bValue = b.inventory.quantity;
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredProducts(filtered);
  }, [
    products,
    searchTerm,
    categoryFilter,
    priceRangeFilter,
    stockFilter,
    sortBy,
    sortOrder,
  ]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

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

  const handleBulkDelete = async () => {
    setIsLoading(true);
    try {
      const timestamp = new Date().toISOString();
      setProducts((prev) =>
        prev.map((product) =>
          selectedProducts.includes(product._id)
            ? { ...product, deletedAt: timestamp }
            : product
        )
      );
      toast(`${selectedProducts.length} products have been moved to trash.`);
      setSelectedProducts([]);
    } catch (error) {
      toast("There was an error deleting the products.");
    } finally {
      setIsLoading(false);
      setIsBulkDeleteDialogOpen(false);
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

  const getPriceAfterDiscount = (price: number, discountPercent?: number) => {
    if (!discountPercent) return price;
    return price - (price * discountPercent) / 100;
  };

  const exportProducts = () => {
    // Simple CSV export
    const headers = ["Name", "SKU", "Price", "Category", "Stock", "Sold"];
    const csvContent = [
      headers.join(","),
      ...filteredProducts.map((product) =>
        [
          `"${product.name}"`,
          product.sku,
          product.price,
          `"${product.categoryName}"`,
          product.inventory.quantity,
          product.inventory.sold,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    window.URL.revokeObjectURL(url);
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
          <Button variant="outline" onClick={exportProducts}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter((p) => !p.deletedAt).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                products.filter(
                  (p) =>
                    !p.deletedAt &&
                    p.inventory.quantity <= 10 &&
                    p.inventory.quantity > 0
                ).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                products.filter(
                  (p) => !p.deletedAt && p.inventory.quantity === 0
                ).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {products
                .filter((p) => !p.deletedAt)
                .reduce((sum, p) => sum + p.price * p.inventory.quantity, 0)
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={priceRangeFilter}
              onValueChange={setPriceRangeFilter}
            >
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">$0 - $20</SelectItem>
                <SelectItem value="medium">$21 - $40</SelectItem>
                <SelectItem value="high">$40+</SelectItem>
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
            <Select
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(value) => {
                const [field, order] = value.split("-");
                setSortBy(field);
                setSortOrder(order as "asc" | "desc");
              }}
            >
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

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedProducts.length} product
                {selectedProducts.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedProducts([])}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsBulkDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>
            A list of all products in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderedTable}</CardContent>
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
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
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
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

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Products</AlertDialogTitle>
            <AlertDialogDescription>
              This action will move {selectedProducts.length} product
              {selectedProducts.length > 1 ? "s" : ""} to trash. You can restore
              them later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete All"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
