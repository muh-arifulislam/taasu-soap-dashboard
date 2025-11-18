/* eslint-disable @typescript-eslint/no-explicit-any */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useGetAllCategoriesQuery } from "@/redux/features/products/productCategoryApi";
import { useGetAllDiscountsQuery } from "@/redux/features/products/productDiscountApi";
import { Plus, Save, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useProductForm } from "./hooks/useProductForm";
import type { ProductFormData } from "./validation";
import { useProductOperations } from "../hooks/useProductOperations";

export default function AddProductPage() {
  const { data: discounts } = useGetAllDiscountsQuery({
    searchTerm: "",
    discountRangeFilter: "all",
    activeStatus: "active",
  });
  const { data: categories } = useGetAllCategoriesQuery({
    searchTerm: "",
    activeStatus: "active",
    type: "all",
    limit: 100,
  });

  const operations = useProductOperations();

  const form = useProductForm();

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...data,
        descriptions: data.descriptions.filter((d) => d.trim() !== ""),
        advantages: data.advantages.filter((a) => a.trim() !== ""),
        ingredients: data.ingredients.filter((i) => i.trim() !== ""),
        images: data.images.filter((img) => img.trim() !== ""),
      };

      await operations.handleCreate(cleanedData);

      form.handleResetForm();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">
            Create a new product for your inventory
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={form.handleDefault}>
            Default
          </Button>
          <Button variant="outline" onClick={form.handleResetForm}>
            Reset
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the basic details of your product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product name"
                          {...field}
                          className="bg-accent"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter SKU"
                          {...field}
                          className="bg-accent"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        className="bg-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Category and Discount */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Category & Discount</CardTitle>
              <CardDescription>
                Select product category and optional discount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-accent">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.data?.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              <div className="flex items-center gap-2">
                                <span>{category.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {category.type}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (Optional)</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value === "none" ? null : value);
                        }}
                        value={field.value ?? "none"}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-accent">
                            <SelectValue placeholder="Select a discount" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">
                            <div className="flex items-center gap-2">
                              <span>Clear Discount</span>
                            </div>
                          </SelectItem>
                          {discounts?.data?.map((discount) => (
                            <SelectItem key={discount._id} value={discount._id}>
                              <div className="flex items-center gap-2">
                                <span>{discount.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {discount.discountPercent}% off
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Descriptions */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Descriptions</CardTitle>
              <CardDescription>Add product descriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.descriptionFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`descriptions.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Textarea
                            placeholder="Enter product description"
                            className="flex-1 bg-accent"
                            {...field}
                          />
                        </FormControl>
                        {form.descriptionFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => form.removeDescription(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => form.appendDescription("")}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Description
              </Button>
            </CardContent>
          </Card>

          {/* Advantages */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Advantages</CardTitle>
              <CardDescription>
                List the key advantages of your product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.advantageFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`advantages.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="Enter product advantage"
                            className="flex-1 bg-accent"
                            {...field}
                          />
                        </FormControl>
                        {form.advantageFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => form.removeAdvantage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => form.appendAdvantage("")}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Advantage
              </Button>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>List all product ingredients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.ingredientFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`ingredients.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="Enter ingredient"
                            className="flex-1 bg-accent"
                            {...field}
                          />
                        </FormControl>
                        {form.ingredientFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => form.removeIngredient(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => form.appendIngredient("")}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>
                Provide additional product details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="addInformation.weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 100g, 250ml"
                          {...field}
                          className="bg-accent"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addInformation.dimension"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensions</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 10cm x 5cm x 3cm"
                          {...field}
                          className="bg-accent"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="addInformation.direction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Directions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How to use this product"
                        {...field}
                        className="bg-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addInformation.warnings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warnings</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any warnings or precautions"
                        {...field}
                        className="bg-accent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Add product image URLs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.imageFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`images.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="Enter image URL"
                            className="flex-1 bg-accent"
                            {...field}
                          />
                        </FormControl>
                        {form.imageFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => form.removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => form.appendImage("")}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Image URL
              </Button>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>
                Set initial inventory quantities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Quantity *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                          className="bg-accent"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Quantity *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                          className="bg-accent"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating Product...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Product
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
