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
import dayjs from "dayjs";

interface StatusHistoryItem {
  _id: string;
  status: string;
  message: string;
  timestamp: string;
}

interface OrderStatusHistoryProps {
  orderNumber?: string;
  statusHistory: StatusHistoryItem[];
}

export default function OrderStatusHistory({
  orderNumber = "ORD-2024-001",
  statusHistory,
}: OrderStatusHistoryProps) {
  const getStatusIcon = (status: string) => {
    const iconClass = cn("h-5 w-5", "text-green-600");

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
    <Card className="w-full rounded-md shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Order Status</CardTitle>
          <Badge variant="outline" className="text-xs font-mono">
            #{orderNumber}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {statusHistory?.map((item, index) => (
            <div
              key={index}
              className="relative flex items-start space-x-4 pb-6 last:pb-0"
            >
              {/* Timeline Line */}
              {/* {index < statusHistory.length - 1 && (
                <div
                  className={cn(
                    "absolute left-6 top-8 w-0.5 h-16",
                    item.isCompleted ? "bg-green-200" : "bg-gray-200"
                  )}
                />
              )} */}

              {/* Status Icon */}
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full border-2 z-10 border-green-200 dark:border-green-200/10 bg-green-50 dark:bg-green-50/10"
                )}
              >
                {getStatusIcon(item.status)}
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
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-50/10 rounded-lg border border-blue-200 dark:border-blue-200/10">
          <div className="flex items-center space-x-2">
            <Truck className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900 dark:text-white">
              Estimated Delivery:{" "}
              {statusHistory?.length &&
                dayjs(statusHistory[0]?.timestamp)
                  .add(7, "day")
                  .format("MMMM D, YYYY")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
