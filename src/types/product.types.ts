export interface Product {
  _id: string;
  name: string;
  sku: string;
  price: number;
  descriptions: string[];
  advantages: string[];
  ingredients: string[];
  addInformation: {
    weight: string;
    dimension?: string;
    direction?: string;
    warnings?: string;
  };
  images: string[];

  categoryId: string;
  category: {
    _id: string;
    name: string;
  };

  inventoryId: string;
  inventory: {
    _id: string;
    quantity: number;
    sold: number;
  };

  discountId?: string;
  discount: {
    _id: string;
    name: string;
    discountPercent: number;
    startDate: string;
    endDate: string;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: string;
}

export interface ProductDiscount {
  _id: string;
  name: string;
  description?: string;
  discountPercent: number;
  isActive: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDiscount {
  name: string;
  description?: string;
  discountPercent: number;
  isActive: boolean;
}

export type ProductCategoryType =
  | "type"
  | "skinType"
  | "scent"
  | "useCase"
  | "feature";

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  parent?: string;
  type: ProductCategoryType;
  isActive: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductCategory {
  name: string;
  slug: string;
  parent?: string;
  type: ProductCategoryType;
  isActive: boolean;
}
