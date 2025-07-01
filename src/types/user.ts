export type TUserRole = "moderator" | "admin" | "customer" | "superAdmin";

export type TAccountType = "email" | "google";

export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  role: TUserRole;
  accountType: TAccountType;
  googleId?: string;
  mobile: string;
  gender: "male" | "female" | "third";
  address: string;
}

export const UserRole = {
  customer: "Customer",
  moderator: "Moderator",
  admin: "Admin",
  superAdmin: "Super Admin",
} as const;

export interface IUserAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode?: string;
}

export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: TUserRole;
  accountType: TAccountType;
  googleId?: string;
  mobile: string;
  gender: "male" | "female" | "third";
  address: string;
  isDisabled: boolean;
  createdAt: string;
  updatedAt: string;
}
