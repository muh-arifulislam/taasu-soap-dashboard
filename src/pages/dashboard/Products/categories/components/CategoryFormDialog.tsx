import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORY_TYPES } from "../constant";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { ProductCategory, ProductCategoryType } from "@/types";
import type { useCategoryForm } from "../hooks";
import type { CategoryFormData } from "../validation";

export const CategoryFormDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ReturnType<typeof useCategoryForm>;
  editingCategory: ProductCategory | null;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  isLoading: boolean;
}> = ({ open, onOpenChange, form, editingCategory, onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                <p className="text-sm text-red-500">{errors.name.message}</p>
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
                <p className="text-sm text-red-500">{errors.slug.message}</p>
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
                <p className="text-sm text-red-500">{errors.type.message}</p>
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
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : editingCategory ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
