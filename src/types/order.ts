export type TOrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Completed"
  | "Cancelled"
  | "Halted";

export type TOrder = {
  _id: string;
  orderId: string;
  totalAmount: number;
  orderStatus: TOrderStatus;
  createdAt: string;
  updatedAt: string;
  isDisabled?: boolean;
};
