import {
  Bell,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
  Package,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectAllNotifications } from "@/redux/features/notifications/notificationSlice";
import { useNotificationsOperations } from "@/pages/dashboard/Notifications/hooks/useNotificationsOperations";

export function NotificationDropdown() {
  const operations = useNotificationsOperations();

  // local state from adapter
  const notifications = useAppSelector(selectAllNotifications)?.slice(0, 5);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case "inventory":
        return <Package className="h-4 w-4 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-lg p-2 hover:bg-secondary transition-colors">
          <Bell className="h-6 w-6 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[420px] p-0">
        {/* Header */}
        <div className="border-b border-border bg-card px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={operations.handleMarkAllAsRead}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`border-b border-border px-4 py-3 transition-colors hover:bg-secondary/50 cursor-pointer ${
                  !notification.isRead ? "bg-secondary/20" : "bg-card"
                }`}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className="mt-0.5 flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm font-medium ${
                          !notification.isRead
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground/70">
                      {notification.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <Bell className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                No notifications
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t border-border bg-card px-4 py-3">
            <NavLink
              to="/dashboard/notifications"
              className="block w-full text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View all notifications
            </NavLink>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
