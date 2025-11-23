import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface InventoryActionCellProps {
  handleEdit: () => void;
}

export const InventoryActionCell: React.FC<InventoryActionCellProps> = ({
  handleEdit,
}) => {
  return (
    <div className="flex items-center justify-start gap-1">
      <Button variant="ghost" size="sm" onClick={handleEdit}>
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );
};
