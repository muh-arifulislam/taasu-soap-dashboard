import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Percent, Plus } from "lucide-react";
import { useState } from "react";

export const AddDiscountDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  setEditingDiscount,
  editingDiscount,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountPercent: 0,
    isActive: true,
  });

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

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
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
                      discountPercent: Number.parseFloat(e.target.value) || 0,
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
                  setFormData((prev) => ({
                    ...prev,
                    isActive: checked,
                  }))
                }
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
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
