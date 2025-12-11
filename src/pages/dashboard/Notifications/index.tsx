import { useEffect, useState } from "react";

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
import { useAdminNotifications } from "@/sockets/useAdminNotifications";
import { useGetAdminNotificationsQuery } from "@/redux/features/notifications/notificationApi";
import { NotificationsPageLoading } from "./loading";

interface Notification {
  _id: string;
  type: "order" | "inventory" | "success" | "alert";
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const { data, isLoading } = useGetAdminNotificationsQuery(undefined);

  const [notifications, setNotifications] = useState<[] | Notification[]>([]);
  const [filterType, setFilterType] = useState<"all" | "unread">("all");
  useAdminNotifications((data) => {
    setNotifications((prev) => [data, ...prev]);
  });
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications =
    filterType === "unread"
      ? notifications.filter((n) => !n.isRead)
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
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n._id !== id));
  };

  // Load from API
  useEffect(() => {
    if (data?.data) setNotifications(data.data);
  }, [data]);

  if (isLoading) {
    return <NotificationsPageLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
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
                key={notification._id}
                className={`border border-border rounded-lg p-4 transition-colors ${
                  !notification.isRead ? "bg-secondary/60" : "bg-card"
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
                            !notification.isRead
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
                      {!notification.isRead && (
                        <div className="flex-shrink-0 h-3 w-3 rounded-full bg-primary mt-1.5"></div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground/70">
                        {notification.createdAt}
                      </p>
                      <div className="flex gap-2">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification._id)}
                            className="text-xs h-7"
                          >
                            Mark as read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification._id)}
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
    </div>
  );
}
