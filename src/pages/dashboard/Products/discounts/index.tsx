import type React from "react";

import { useState, useEffect, useMemo } from "react";
import { Plus, Search, Eye, Percent } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  useDeleteDiscountMutation,
  useCreateDiscountMutation,
  useGetAllDiscountsQuery,
  useUpdateDiscountMutation,
} from "@/redux/features/products/productDiscountApi";
import type { ProductDiscount } from "@/types";
import { DiscountDataTables } from "./data-table";
import { columns } from "./columns";
import { useDebouncedInput } from "@/hooks/useDebouncedInput";

export default function DiscountsPage() {
  const [createDiscount] = useCreateDiscountMutation();
  const [updateDiscount] = useUpdateDiscountMutation();
  const [deleteDiscount] = useDeleteDiscountMutation();

  const {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  } = useDebouncedInput();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [discountRangeFilter, setDiscountRangeFilter] = useState<string>("all");

  const { data: response } = useGetAllDiscountsQuery({
    searchTerm: debouncedSearchTerm,
    statusFilter,
    discountRangeFilter,
  });

  // Cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetter.cancel();
    };
  }, [debouncedSetter]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] =
    useState<ProductDiscount | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountPercent: 0,
    isActive: true,
  });

  // Filter discounts based on search and filters

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      discountPercent: 0,
      isActive: true,
    });
    setEditingDiscount(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingDiscount) {
        await updateDiscount({
          id: editingDiscount._id,
          data: {
            ...formData,
          },
        }).unwrap();
        toast.success("The discount has been updated successfully.");
      } else {
        await createDiscount({
          ...formData,
        }).unwrap();
        toast.success("The discount has been created successfully.");
      }

      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("There was an error saving the discount.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (discount: ProductDiscount) => {
    setEditingDiscount(discount);
    setFormData({
      name: discount.name,
      description: discount.description || "",
      discountPercent: discount.discountPercent,
      isActive: discount.isActive,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (discountId: string) => {
    try {
      await deleteDiscount(discountId).unwrap();
      toast.success("The discount has been deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("There was an error deleting the discount.");
    }
  };

  const toggleStatus = async (discountId: string) => {
    try {
      const discount = response?.data.find((d) => d._id === discountId);
      if (!discount) return;

      await updateDiscount({
        id: discountId,
        data: {
          ...discount,
          isActive: !discount.isActive,
        },
      }).unwrap();

      toast.success("The discount status has been updated.");
    } catch (error) {
      console.error(error);
      toast.error("There was an error updating the status.");
    }
  };

  // 🧠 Memoize heavy DataTable
  const renderedTable = useMemo(() => {
    return (
      <DiscountDataTables<ProductDiscount, unknown>
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
            Product Discounts
          </h1>
          <p className="text-muted-foreground">
            Manage your product discounts and promotions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Discount
            </Button>
          </DialogTrigger>
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
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter discount name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter discount description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPercent">Discount Percentage *</Label>
                  <div className="relative">
                    <Input
                      id="discountPercent"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.discountPercent}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountPercent:
                            Number.parseFloat(e.target.value) || 0,
                        }))
                      }
                      placeholder="0"
                      className="pr-8"
                      required
                    />
                    <Percent className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isActive: checked }))
                    }
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
                    : editingDiscount
                    ? "Update"
                    : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Discounts
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{response?.data.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Discounts
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {response?.data.filter((d) => d.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Discount
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Discount</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30%</div>
          </CardContent>
        </Card>
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
              value={discountRangeFilter}
              onValueChange={setDiscountRangeFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranges</SelectItem>
                <SelectItem value="low">Low (&lt;=10%)</SelectItem>
                <SelectItem value="medium">Medium (11-30%)</SelectItem>
                <SelectItem value="high">High (&gt;30%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Discounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Discounts</CardTitle>
          <CardDescription>
            A list of all product discounts in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderedTable}</CardContent>
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
