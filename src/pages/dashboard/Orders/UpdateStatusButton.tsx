import { Button } from "@/components/ui/button";
import { useUpdateOrderMutation } from "@/redux/features/orders/orderApi";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OrderStatus = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Completed",
  "Cancelled",
  "Halted",
] as const;

const NEXT_ORDER_STATUS_MAP: Record<
  (typeof OrderStatus)[number],
  { next: (typeof OrderStatus)[number]; label: string } | null
> = {
  Pending: { next: "Processing", label: "Mark as Processing" },
  Processing: { next: "Shipped", label: "Mark as Shipped" },
  Shipped: { next: "Delivered", label: "Mark as Delivered" },
  Delivered: { next: "Completed", label: "Mark as Completed" },
  Completed: null, // Final stage
  Cancelled: null, // Terminal
  Halted: null, // Terminal
};

type Props = {
  orderId: string;
  currentStatus: (typeof OrderStatus)[number];
};

const UpdateOrderStatusButton = ({ orderId, currentStatus }: Props) => {
  const [updateOrderStatus, { isLoading }] = useUpdateOrderMutation();

  const nextStatusInfo = NEXT_ORDER_STATUS_MAP[currentStatus];

  const handleStatusUpdate = async () => {
    if (!nextStatusInfo) return;

    try {
      const result = await updateOrderStatus({
        id: orderId,
        payload: { orderStatus: nextStatusInfo.next },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((result as any)?.success) {
        toast.success(`Order status updated to ${nextStatusInfo.next}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  if (!nextStatusInfo) {
    return (
      <Button
        variant="outline"
        disabled
        className="opacity-60 cursor-not-allowed"
      >
        No Further Action
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      onClick={handleStatusUpdate}
      disabled={isLoading}
      className="font-medium"
    >
      {isLoading ? "Updating..." : nextStatusInfo.label}
    </Button>
  );
};

export default UpdateOrderStatusButton;
