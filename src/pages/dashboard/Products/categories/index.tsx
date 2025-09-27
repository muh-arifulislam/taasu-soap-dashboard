import { useState, useMemo, useCallback } from "react";
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

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { toast } from "sonner";

import type { ProductCategory } from "@/types";

import { useGetAllCategoriesQuery } from "@/redux/features/products/productCategoryApi";

import DataTablePageSkeleton from "@/components/DataTablePageSkeleton";

import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/pagination";
import {
  useCategoryFilters,
  useCategoryForm,
  useCategoryOperations,
} from "./hooks";

import DataTableSkeleton from "@/components/data-table-skeleton";
import type { CategoryFormData } from "./validation";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "./columns";
import { CategoryFilters, CategoryFormDialog } from "./components";

export default function CategoriesPage() {
  const pagination = usePagination();
  const filters = useCategoryFilters();
  const operations = useCategoryOperations();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<ProductCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useCategoryForm(editingCategory);

  const {
    data: response,
    isLoading: isLoadingCategories,
    refetch,
    isFetching,
  } = useGetAllCategoriesQuery({
    searchTerm: filters.debouncedSearchTerm,
    activeStatus: filters.statusFilter,
    type: filters.categoryType,
    page: pagination.page,
    limit: pagination.limit,
    sortBy: filters.sorting,
  });

  //pagination
  const total = response?.meta?.total || 0;
  const totalPages = Math.ceil(total / pagination.limit);

  // Event handlers
  const handleFormSubmit = useCallback(
    async (data: CategoryFormData) => {
      setIsLoading(true);
      try {
        if (editingCategory) {
          await operations.handleUpdate(editingCategory._id, data);
        } else {
          await operations.handleCreate(data);
        }
        setIsAddDialogOpen(false);
        form.resetForm();
        setEditingCategory(null);
      } catch (error) {
        console.error(error);
        toast.error("There was an error saving the category.");
      } finally {
        setIsLoading(false);
      }
    },
    [editingCategory, operations, form]
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
    (category: ProductCategory) => {
      setEditingCategory(category);
      form.populateForm(category);
      setIsAddDialogOpen(true);
    },
    [form]
  );

  const handleToggleStatus = useCallback(
    async (categoryId: string) => {
      const category = response?.data.find((d) => d._id === categoryId);
      if (!category) return;

      try {
        await operations.handleToggleStatus(category);
      } catch (error) {
        console.error(error);
        toast.error("There was an error updating the status.");
      }
    },
    [response?.data, operations]
  );

  const handleAddNew = useCallback(() => {
    form.resetForm();
    setEditingCategory(null);
    setIsAddDialogOpen(true);
  }, [form]);

  const renderedTable = useMemo(() => {
    return (
      <DataTable<ProductCategory, unknown>
        columns={columns({
          handleDelete,
          handleEdit,
          toggleStatus: handleToggleStatus,
        })}
        data={response?.data || []}
      />
    );
  }, [response?.data, handleDelete, handleEdit, handleToggleStatus]);

  if (isLoadingCategories) {
    return <DataTablePageSkeleton />;
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-md shadow-none mb-1">
        <CardContent className="flex flex-col lg:flex-row gap-4 justify-between">
          <CategoryFilters filters={filters} />
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
              <CategoryFormDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                form={form}
                editingCategory={editingCategory}
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
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            A list of all product categories in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isFetching ? <DataTableSkeleton /> : renderedTable}
        </CardContent>
        <CardFooter className="w-full">
          <Pagination
            pagination={pagination}
            totalPages={totalPages}
            total={total}
            loading={isFetching}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
