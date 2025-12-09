import { useState, useCallback, useMemo } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { useGetAllDiscountsQuery } from "@/redux/features/products/productDiscountApi";
import type { ProductDiscount } from "@/types";
import { columns } from "./columns";
import DataTablePageSkeleton from "@/components/DataTablePageSkeleton";
import { DataTable } from "@/components/table/DataTable";
import { Pagination } from "@/components/pagination";
import { usePagination } from "@/hooks/usePagination";
import { DiscountFilters, DiscountFormDialog } from "./components";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useDiscountForm } from "./hooks/useDiscountForm";
import type { DiscountFormData } from "./validation";
import { useDiscountOperations } from "./hooks/useDiscountOperations";
import { useDiscountFilters } from "./hooks/useDiscountFilters";

export default function DiscountsPage() {
  const pagination = usePagination();
  const operations = useDiscountOperations();
  const filters = useDiscountFilters();

  const {
    data: response,
    isLoading: isLoadingDiscounts,
    isFetching,
    refetch,
  } = useGetAllDiscountsQuery({
    searchTerm: filters.debouncedSearchTerm,
    activeStatus: filters.statusFilter,
    discountRangeFilter: filters.discountRangeFilter,
    sortBy: filters.sorting,
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingDiscount, setEditingDiscount] =
    useState<ProductDiscount | null>(null);

  const form = useDiscountForm();

  //pagination
  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / pagination.limit);

  // Event handlers
  const handleFormSubmit = useCallback(
    async (data: DiscountFormData) => {
      setIsLoading(true);
      try {
        if (editingDiscount) {
          await operations.handleUpdate(editingDiscount._id, data);
        } else {
          await operations.handleCreate(data);
        }
        setIsAddDialogOpen(false);
        form.resetForm();
        setEditingDiscount(null);
      } catch (error) {
        console.error(error);
        toast.error("There was an error saving the category.");
      } finally {
        setIsLoading(false);
      }
    },
    [editingDiscount, operations, form]
  );

  const handleDelete = useCallback(
    async (categoryId: string) => {
      try {
        await operations.handleDelete(categoryId);
      } catch (error) {
        console.error(error);
        toast.error("There was an error deleting the category.");
      }
    },
    [operations]
  );

  const handleEdit = useCallback(
    (discount: ProductDiscount) => {
      setEditingDiscount(discount);
      form.populateForm(discount);
      setIsAddDialogOpen(true);
    },
    [form]
  );

  const handleToggleStatus = useCallback(
    async (discountId: string) => {
      const discount = response?.data.find((d) => d._id === discountId);
      if (!discount) return;

      try {
        await operations.handleToggleStatus(discount);
      } catch (error) {
        console.error(error);
        toast.error("There was an error updating the status.");
      }
    },
    [response?.data, operations]
  );

  const handleAddNew = useCallback(() => {
    form.resetForm();
    setEditingDiscount(null);
    setIsAddDialogOpen(true);
  }, [form]);

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <DataTable<ProductDiscount, unknown>
        columns={columns({
          handleDelete,
          handleEdit,
          toggleStatus: handleToggleStatus,
        })}
        data={response?.data || []}
      />
    );
  }, [response?.data]);

  if (isLoadingDiscounts) {
    return <DataTablePageSkeleton />;
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-md shadow-none mb-1">
        <CardContent className="flex flex-col lg:flex-row gap-4 justify-between">
          <DiscountFilters filters={filters} />
          <div className="flex items-center gap-2">
            <Button
              onClick={() => refetch()}
              variant="outline"
              disabled={isFetching}
            >
              <RefreshCw className={`${isFetching ? "animate-spin" : ""}`} />
              Refetch
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DiscountFormDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                form={form}
                editingDiscount={editingDiscount}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Discounts Table */}
      <Card className="rounded-md shadow-none mb-1">
        <CardHeader>
          <CardTitle>Discounts</CardTitle>
          <CardDescription>
            A list of all product discounts in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderedTable}</CardContent>
        <CardFooter className="flex items-center justify-center">
          <Pagination
            total={total}
            pagination={pagination}
            totalPages={totalPages}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

// Mock data - replace with actual API calls
// const mockDiscounts = [
//   {
//     _id: "1",
//     name: "Summer Sale",
//     description: "20% off on all summer products",
//     discountPercent: 20,
//     isActive: true,
//     createdAt: "2024-01-15T10:00:00Z",
//     updatedAt: "2024-01-15T10:00:00Z",
//   },
//   {
//     _id: "2",
//     name: "New Customer Discount",
//     description: "15% off for first-time customers",
//     discountPercent: 15,
//     isActive: true,
//     createdAt: "2024-01-16T10:00:00Z",
//     updatedAt: "2024-01-16T10:00:00Z",
//   },
//   {
//     _id: "3",
//     name: "Black Friday",
//     description: "Huge 50% discount for Black Friday",
//     discountPercent: 50,
//     isActive: false,
//     createdAt: "2024-01-17T10:00:00Z",
//     updatedAt: "2024-01-17T10:00:00Z",
//   },
//   {
//     _id: "4",
//     name: "Loyalty Reward",
//     description: "10% off for loyal customers",
//     discountPercent: 10,
//     isActive: true,
//     createdAt: "2024-01-18T10:00:00Z",
//     updatedAt: "2024-01-18T10:00:00Z",
//   },
//   {
//     _id: "5",
//     name: "Clearance Sale",
//     description: "30% off on clearance items",
//     discountPercent: 30,
//     isActive: false,
//     createdAt: "2024-01-19T10:00:00Z",
//     updatedAt: "2024-01-19T10:00:00Z",
//   },
// ];
