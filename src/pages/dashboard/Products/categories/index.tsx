import type React from "react";

import { useState, useEffect, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { toast } from "sonner";

import type { ProductCategory, ProductCategoryType } from "@/types";

import { useDebouncedInput } from "@/hooks/useDebouncedInput";
import { columns } from "./columns";
import { CategoryDataTable } from "./data-table";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/products/productCategoryApi";
import { PRODUCT_CATEGORY_TYPES } from "./constant";

import { z } from "zod";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Fixed schema - removed "all" from the enum as it's not a valid ProductCategoryType
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(
    PRODUCT_CATEGORY_TYPES.map((type) => type.value) as [string, ...string[]]
  ),
  isActive: z.boolean(),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export default function DiscountsPage() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      type: PRODUCT_CATEGORY_TYPES[0]?.value || "type",
      isActive: true,
    },
  });

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  } = useDebouncedInput();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryType, setCategoryType] = useState<ProductCategoryType | "all">(
    "all"
  );

  const { data: response } = useGetAllCategoriesQuery({
    searchTerm: debouncedSearchTerm,
    isActive: statusFilter,
    type: categoryType,
  });

  // Cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetter.cancel();
    };
  }, [debouncedSetter]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<ProductCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter discounts based on search and filters

  const resetForm = () => {
    reset({
      name: "",
      slug: "",
      type: PRODUCT_CATEGORY_TYPES[0]?.value || "type",
      isActive: true,
    });
    setEditingCategory(null);
  };

  const onSubmit: SubmitHandler<CategorySchema> = async (data) => {
    setIsLoading(true);

    try {
      if (editingCategory) {
        await updateCategory({
          id: editingCategory._id,
          data,
        }).unwrap();
        toast.success("The category has been updated successfully.");
      } else {
        await createCategory(data).unwrap();
        toast.success("The category has been created successfully.");
      }

      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("There was an error saving the category.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: ProductCategory) => {
    setEditingCategory(category);
    reset({
      name: category.name,
      slug: category.slug,
      type: category.type,
      isActive: category.isActive,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success("The category has been deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("There was an error deleting the category.");
    }
  };

  const toggleStatus = async (categoryId: string) => {
    try {
      const category = response?.data.find((d) => d._id === categoryId);
      if (!category) return;

      await updateCategory({
        id: categoryId,
        data: {
          ...category,
          isActive: !category.isActive,
        },
      }).unwrap();

      toast.success("The category status has been updated.");
    } catch (error) {
      console.error(error);
      toast.error("There was an error updating the status.");
    }
  };

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <CategoryDataTable<ProductCategory, unknown>
        columns={columns({
          handleDelete,
          handleEdit,
          toggleStatus,
        })}
        data={response?.data || []}
      />
    );
  }, [response?.data]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Product Categories
          </h1>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Update the category details."
                  : "Create a new product category."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter category name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    {...register("slug")}
                    placeholder="Enter category slug"
                  />
                  {errors.slug && (
                    <p className="text-sm text-red-500">
                      {errors.slug.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Type *</Label>
                  <Select
                    value={watch("type")}
                    onValueChange={(value) =>
                      setValue("type", value as ProductCategoryType)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <span>{type.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-red-500">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={watch("isActive")}
                    onCheckedChange={(checked) => setValue("isActive", checked)}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Saving..."
                    : editingCategory
                    ? "Update"
                    : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discounts..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={categoryType}
              onValueChange={(value) =>
                setCategoryType(value as ProductCategoryType | "all")
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {PRODUCT_CATEGORY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Discounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            A list of all product categories in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderedTable}</CardContent>
      </Card>
    </div>
  );
}
