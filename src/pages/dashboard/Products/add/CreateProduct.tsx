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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Zod schema for form validation
const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .min(3, "SKU must be at least 3 characters"),
  price: z.number().min(0, "Price must be greater than 0"),
  descriptions: z
    .array(z.string().min(1, "Description cannot be empty"))
    .min(1, "At least one description is required"),
  advantages: z
    .array(z.string().min(1, "Advantage cannot be empty"))
    .min(1, "At least one advantage is required"),
  ingredients: z
    .array(z.string().min(1, "Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  addInformation: z.object({
    weight: z.string().min(1, "Weight is required"),
    dimension: z.string().optional(),
    direction: z.string().optional(),
    warnings: z.string().optional(),
  }),
  images: z
    .array(z.string().url("Invalid URL format"))
    .min(1, "At least one image is required"),
  categoryId: z.string().min(1, "Category is required"),
  inventoryQuantity: z.number().min(0, "Quantity cannot be negative"),
  inventorySold: z.number().min(0, "Sold quantity cannot be negative"),
  discountId: z.string().nullable().optional(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

// const DEFAULT_VALUES = {
//   name: "Organic Lavender & Citrus Soap Bar 110g",
//   sku: "lsc 1105",
//   price: 3.99,
//   descriptions: [
//     "Combining revitalising Lavender with zingy Citrus, this little ray of sublime soapy sunshine will refresh, tone, cleanse and purify your skin, and add a spring to your step!",
//     "Pure Organic bar soap made with the finest natural ingredients and pure Lavender & Orange essential oils. Perfect for bath, shower & sink.",
//   ],
//   advantages: [
//     "Totally free from detergents, SLS, sulphates, alcohol, parabens, sorbates, silicones & synthetic preservatives",
//     "Made from Natural Ingredients",
//     "Plant based and 100% Vegan",
//     "Leaping Bunny Cruelty Free",
//     "Plastic Free, Eco Friendly and Biodegradable (soap and packaging)",
//     "RSPO Certified Sustainable Palm Oil",
//   ],
//   ingredients: [
//     "Sodium Palmate* (derived from sustainable Palm Oil), Sodium Cocoate (derived from Coconut Oil), Aqua (Water), Naturally Occurring Glycerin (Glycerine), Rose Geranium Essential Oil (Pelargonium Graveolens), Sodium Chloride (Salt), Sodium Citrate (sodium salt derived from citric acid), Limonene**, Linalool**",
//     "*made from 100% RSPO certified sustainable Palm Oil and Palm Kernel Oil",
//     "**allergen – naturally occurring within the essential oils",
//     "Made with 85.8% certified Organic Oils.",
//   ],
//   addInformation: {
//     weight: "0.125 kg",
//     dimension: "8.8 × 5.9 × 3.7 cm",
//     direction:
//       "Use with warm water to create a luxurious, silky lather. Wash off. Suitable for face and body.",
//     warnings:
//       "Avoid contact with the eyes. If product enters the eyes rinse well with warm water.",
//   },
//   images: ["https://dev-arifulislam.netlify.app/"],
//   categoryId: "",
//   inventoryQuantity: 50,
//   inventorySold: 0,
//   discountId: null,
// };

export default function AddProductPage() {
  const { data: discounts } = useGetAllDiscountsQuery({
    searchTerm: "",
    discountRangeFilter: "all",
    statusFilter: "active",
  });

  const { data: categories } = useGetAllCategoriesQuery({
    searchTerm: "",
    activeStatus: "active",
    type: "all",
    limit: 100,
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      descriptions: [""],
      advantages: [""],
      ingredients: [""],
      images: [""],
      categoryId: "",
      inventoryQuantity: 0,
      inventorySold: 0,
      discountId: null,
      addInformation: {
        weight: "",
        dimension: "",
        direction: "",
        warnings: "",
      },
    },
  });

  const {
    fields: descriptionFields,
    append: appendDescription,
    remove: removeDescription,
  } = useFieldArray({
    control: form.control as any,
    name: "descriptions",
  });

  const {
    fields: advantageFields,
    append: appendAdvantage,
    remove: removeAdvantage,
  } = useFieldArray({
    control: form.control as any,
    name: "advantages",
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control as any,
    name: "ingredients",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control as any,
    name: "images",
  });

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

      console.log("Product data to submit:", cleanedData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Product created successfully");
      form.reset();
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
          <Button variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
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
                        <Input placeholder="Enter product name" {...field} />
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
                        <Input placeholder="Enter SKU" {...field} />
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Category and Discount */}
          <Card>
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
                          <SelectTrigger className="w-full">
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
                          <SelectTrigger className="w-full">
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
          <Card>
            <CardHeader>
              <CardTitle>Descriptions</CardTitle>
              <CardDescription>Add product descriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {descriptionFields.map((field, index) => (
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
                            className="flex-1"
                            {...field}
                          />
                        </FormControl>
                        {descriptionFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeDescription(index)}
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
                onClick={() => appendDescription("")}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Description
              </Button>
            </CardContent>
          </Card>

          {/* Advantages */}
          <Card>
            <CardHeader>
              <CardTitle>Advantages</CardTitle>
              <CardDescription>
                List the key advantages of your product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {advantageFields.map((field, index) => (
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
                            className="flex-1"
                            {...field}
                          />
                        </FormControl>
                        {advantageFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeAdvantage(index)}
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
                onClick={() => appendAdvantage("")}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Advantage
              </Button>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>List all product ingredients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ingredientFields.map((field, index) => (
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
                            className="flex-1"
                            {...field}
                          />
                        </FormControl>
                        {ingredientFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeIngredient(index)}
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
                onClick={() => appendIngredient("")}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
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
                        <Input placeholder="e.g., 100g, 250ml" {...field} />
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Add product image URLs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imageFields.map((field, index) => (
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
                            className="flex-1"
                            {...field}
                          />
                        </FormControl>
                        {imageFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeImage(index)}
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
                onClick={() => appendImage("")}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Image URL
              </Button>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
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
                  name="inventoryQuantity"
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
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inventorySold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Already Sold</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
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
