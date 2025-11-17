import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import type { ProductDiscount } from "@/types";

import type { useDiscountForm } from "./hooks/useDiscountForm";
import type { DiscountFormData } from "./validation";
import type { useDiscountFilters } from "./hooks/useDiscountFilters";
import { Search } from "lucide-react";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
] as const;

export const DiscountFormDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ReturnType<typeof useDiscountForm>;
  editingDiscount: ProductDiscount | null;
  onSubmit: (data: DiscountFormData) => Promise<void>;
  isLoading: boolean;
}> = ({ open, onOpenChange, form, editingDiscount, onSubmit, isLoading }) => {
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
            {editingDiscount ? "Edit Discount" : "Add New Discount"}
          </DialogTitle>
          <DialogDescription>
            {editingDiscount
              ? "Update the discount details."
              : "Create a new product discount."}
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
                className="bg-accent"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...register("description")}
                placeholder="Enter category slug"
                className="bg-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPercent">Description</Label>
              <Input
                id="discountPercent"
                {...register("discountPercent")}
                placeholder="Enter category slug"
                className="bg-accent"
              />
              {errors.discountPercent && (
                <p className="text-sm text-red-500">
                  {errors.discountPercent.message}
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
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : editingDiscount ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const DiscountFilters: React.FC<{
  filters: ReturnType<typeof useDiscountFilters>;
}> = ({ filters }) => {
  const {
    searchTerm,
    handleInputChange,
    statusFilter,
    setStatusFilter,
    sorting,
    setSorting,
    discountRangeFilter,
    setDiscountRangeFilter,
  } = filters;

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discounts..."
            value={searchTerm}
            onChange={handleInputChange}
            className="pl-8 bg-accent"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-accent">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={discountRangeFilter}
          onValueChange={setDiscountRangeFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-accent">
            <SelectValue placeholder="Filter by range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ranges</SelectItem>
            <SelectItem value="low">Low (&lt;=10%)</SelectItem>
            <SelectItem value="medium">Medium (11-30%)</SelectItem>
            <SelectItem value="high">High (&gt;30%)</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sorting} onValueChange={setSorting}>
          <SelectTrigger className="relative w-[165px] bg-accent pl-15">
            <SelectValue />
            <span className="absolute left-2 text-muted-foreground font-normal">
              Sort by:
            </span>
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
