import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ShoppingCart,
  PackageCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusHistoryItem {
  status: string;
  message: string;
  timestamp: string;
  isCompleted: boolean;
  isActive?: boolean;
}

interface OrderStatusHistoryProps {
  orderNumber?: string;
  statusHistory?: StatusHistoryItem[];
}

export default function OrderStatusHistory({
  orderNumber = "ORD-2024-001",
  statusHistory = [
    {
      status: "Order Placed",
      message: "Your order has been successfully placed and payment confirmed.",
      timestamp: "2024-01-15T10:30:00Z",
      isCompleted: true,
    },
    {
      status: "Processing",
      message: "Your order is being prepared and packaged.",
      timestamp: "2024-01-15T14:20:00Z",
      isCompleted: true,
    },
    {
      status: "Shipped",
      message: "Your order has been shipped via FedEx. Tracking: FX123456789",
      timestamp: "2024-01-16T09:15:00Z",
      isCompleted: true,
    },
    {
      status: "Out for Delivery",
      message: "Your package is out for delivery and will arrive today.",
      timestamp: "2024-01-17T08:45:00Z",
      isCompleted: false,
      isActive: true,
    },
    {
      status: "Delivered",
      message: "Package will be delivered to your address.",
      timestamp: "",
      isCompleted: false,
    },
  ],
}: OrderStatusHistoryProps) {
  const getStatusIcon = (
    status: string,
    isCompleted: boolean,
    isActive?: boolean
  ) => {
    const iconClass = cn(
      "h-5 w-5",
      isCompleted
        ? "text-green-600"
        : isActive
        ? "text-blue-600"
        : "text-gray-400"
    );

    switch (status.toLowerCase()) {
      case "order placed":
        return <ShoppingCart className={iconClass} />;
      case "processing":
        return <Package className={iconClass} />;
      case "shipped":
        return <Truck className={iconClass} />;
      case "out for delivery":
        return <PackageCheck className={iconClass} />;
      case "delivered":
        return <CheckCircle className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Order Status</CardTitle>
          <Badge variant="outline" className="text-xs font-mono">
            {orderNumber}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {statusHistory.map((item, index) => (
            <div
              key={index}
              className="relative flex items-start space-x-4 pb-6 last:pb-0"
            >
              {/* Timeline Line */}
              {index < statusHistory.length - 1 && (
                <div
                  className={cn(
                    "absolute left-6 top-8 w-0.5 h-16",
                    item.isCompleted ? "bg-green-200" : "bg-gray-200"
                  )}
                />
              )}

              {/* Status Icon */}
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full border-2 bg-white z-10",
                  item.isCompleted
                    ? "border-green-200 bg-green-50"
                    : item.isActive
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                )}
              >
                {getStatusIcon(item.status, item.isCompleted, item.isActive)}
              </div>

              {/* Status Content */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-foreground">
                    {item.status}
                  </h4>
                  {item.timestamp && (
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(item.timestamp)}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Delivery */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <Truck className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Estimated Delivery: Today by 6:00 PM
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
