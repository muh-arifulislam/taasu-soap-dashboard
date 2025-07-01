export interface IPayment {
  _id: string;
  method: string;
  status: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}
