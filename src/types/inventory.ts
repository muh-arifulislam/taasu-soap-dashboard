export interface Inventory {
  _id: string;
  quantity: number;
  sold?: number;

  createdAt: Date;
  updatedAt: Date;
}
