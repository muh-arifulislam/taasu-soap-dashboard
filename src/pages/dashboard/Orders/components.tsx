import type { useOrderFilters } from "./hooks/useOrderFilters";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortDropdown } from "@/components/sort.dropdown";
import { Card, CardContent } from "@/components/ui/card";
import RefreshButton from "@/components/button/RefreshButton";

export const OrdersFilter: React.FC<{
  filters: ReturnType<typeof useOrderFilters>;
  refetch: () => void;
  isFetching: boolean;
}> = ({ filters, refetch, isFetching }) => {
  return (
    <>
      <Card className="rounded-md shadow-none mb-1">
        <CardContent className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Input
              value={filters.searchTerm}
              onChange={filters.handleInputChange}
              placeholder="Search with Email, Name"
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Filter by Status <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={filters.statusFilter}
                  onValueChange={filters.setStatusFilter}
                >
                  <DropdownMenuRadioItem value="" defaultChecked>
                    All
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Pending">
                    Pending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Processing">
                    Processing
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Shipped">
                    Shipped
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Delivered">
                    Delivered
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Completed">
                    Completed
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Canceled">
                    Canceled
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Halted">
                    Halted
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <SortDropdown
              value={filters.sortValue}
              onValueChange={filters.setSortValue}
            />
          </div>
          <div>
            <RefreshButton refetch={refetch} isFetching={isFetching} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
