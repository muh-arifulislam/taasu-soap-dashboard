export type TUserRole = "admin" | "customer" | "superAdmin";

export type TAccountType = "email" | "google";

export interface IUser {
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
