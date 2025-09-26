export interface IInventory {
  quantity: number;
  sold?: number;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}
