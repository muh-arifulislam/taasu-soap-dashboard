export interface NotificationDto {
  _id: string;
  title: string;
  message: string;
  userId?: string;
  type: "order" | "inventory" | "success" | "alert" | string;
  isRead: boolean;
  eventId?: string;
  createdAt: string; // ISO string
  updatedAt?: string;
}
