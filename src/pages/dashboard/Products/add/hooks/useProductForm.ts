/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormData } from "../validation";

const DEFAULT_PRODUCT = {
  name: "Organic Lavender & Citrus Soap Bar 110g",
  sku: "SKU-BE10321",
  price: 3.99,
  descriptions: [
    "Combining revitalising Lavender with zingy Citrus, this little ray of sublime soapy sunshine will refresh, tone, cleanse and purify your skin, and add a spring to your step!",
    "Pure Organic bar soap made with the finest natural ingredients and pure Lavender & Orange essential oils. Perfect for bath, shower & sink.",
  ],
  advantages: [
    "Totally free from detergents, SLS, sulphates, alcohol, parabens, sorbates, silicones & synthetic preservatives",
    "Made from Natural Ingredients",
    "Plant based and 100% Vegan",
    "Leaping Bunny Cruelty Free",
    "Plastic Free, Eco Friendly and Biodegradable (soap and packaging)",
    "RSPO Certified Sustainable Palm Oil",
  ],
  ingredients: [
    "Sodium Palmate* (derived from sustainable Palm Oil), Sodium Cocoate (derived from Coconut Oil), Aqua (Water), Naturally Occurring Glycerin (Glycerine), Rose Geranium Essential Oil (Pelargonium Graveolens), Sodium Chloride (Salt), Sodium Citrate (sodium salt derived from citric acid), Limonene**, Linalool**",
    "*made from 100% RSPO certified sustainable Palm Oil and Palm Kernel Oil",
    "**allergen – naturally occurring within the essential oils",
    "Made with 85.8% certified Organic Oils.",
  ],
  addInformation: {
    weight: "0.125 kg",
    dimension: "8.8 × 5.9 × 3.7 cm",
    direction:
      "Use with warm water to create a luxurious, silky lather. Wash off. Suitable for face and body.",
    warnings:
      "Avoid contact with the eyes. If product enters the eyes rinse well with warm water.",
  },
  images: ["https://dev-arifulislam.netlify.app/"],
  categoryId: "",
  stock: 50,
  sold: 0,
  discountId: null,
};

const DEFAULT_VALUES = {
  name: "",
  sku: "",
  price: 0,
  descriptions: [""],
  advantages: [""],
  ingredients: [""],
  images: [""],
  categoryId: "",
  stock: 0,
  sold: 0,
  discountId: null,
  addInformation: {
    weight: "",
    dimension: "",
    direction: "",
    warnings: "",
  },
};

export const useProductForm = () => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const handleDefault = () => {
    form.reset(DEFAULT_PRODUCT);
  };

  const handleResetForm = () => {
    form.reset(DEFAULT_VALUES);
  };

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

  //   const resetForm = useCallback(() => {
  //     form.reset({
  //       name: "",
  //       slug: "",
  //       type: PRODUCT_CATEGORY_TYPES[0]?.value || "type",
  //       isActive: true,
  //     });
  //   }, [form]);

  return {
    ...form,
    handleDefault,
    handleResetForm,
    descriptionFields,
    appendDescription,
    removeDescription,
    advantageFields,
    appendAdvantage,
    removeAdvantage,
    ingredientFields,
    appendIngredient,
    removeIngredient,
    imageFields,
    appendImage,
    removeImage,
  };
};
