import { useState } from "react";

import {
  ChevronLeft,
  Bell,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
  Package,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavLink } from "react-router-dom";

interface Notification {
  id: string;
  type: "order" | "inventory" | "success" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    message: "Order #12345 from Sarah Anderson for $299.99",
    timestamp: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "inventory",
    title: "Low Stock Alert",
    message: "Blue T-Shirt size M is running low (5 units left)",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "success",
    title: "Payment Confirmed",
    message: "Payment from Order #12343 has been processed successfully",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "alert",
    title: "Refund Request",
    message: "Customer requested refund for Order #12340 - Action required",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "order",
    title: "Order Shipped",
    message: "Order #12339 has been shipped and is on its way",
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "inventory",
    title: "Restock Completed",
    message: '250 units of "Premium Jeans Black" added to inventory',
    timestamp: "1 day ago",
    read: true,
  },
];
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    filterType === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const getIcon = (type: string) => {
    const iconProps = "h-5 w-5";
    switch (type) {
      case "order":
        return <ShoppingCart className={`${iconProps} text-blue-500`} />;
      case "inventory":
        return <Package className={`${iconProps} text-amber-500`} />;
      case "success":
        return <CheckCircle className={`${iconProps} text-green-500`} />;
      case "alert":
        return <AlertCircle className={`${iconProps} text-red-500`} />;
      default:
        return <Bell className={`${iconProps}`} />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <NavLink
              to="/"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </NavLink>
            <h1 className="text-3xl font-bold text-foreground">
              Notifications
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {filteredNotifications.length}{" "}
            {filterType === "unread" ? "unread" : "total"} notification
            {filteredNotifications.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Tabs
            value={filterType}
            onValueChange={(value) => setFilterType(value as "all" | "unread")}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread{" "}
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="gap-2 bg-transparent"
            >
              <Check className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border border-border rounded-lg p-4 transition-colors ${
                  !notification.read ? "bg-secondary/20" : "bg-card"
                } hover:bg-secondary/10`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p
                          className={`font-semibold ${
                            !notification.read
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0 h-3 w-3 rounded-full bg-primary mt-1.5"></div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground/70">
                        {notification.timestamp}
                      </p>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs h-7"
                          >
                            Mark as read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs h-7 text-destructive hover:text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium text-foreground">
                No notifications
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {filterType === "unread"
                  ? "You're all caught up!"
                  : "Check back later for updates"}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
