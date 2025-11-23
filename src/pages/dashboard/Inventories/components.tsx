import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { useInventoriesFilters } from "./hooks/useInventoriesFilters";
import RefreshButton from "@/components/button/RefreshButton";

export const InventoriesFilter: React.FC<{
  filters: ReturnType<typeof useInventoriesFilters>;
  refetch: () => void;
  isFetching: boolean;
}> = ({ filters, refetch, isFetching }) => {
  return (
    <>
      <Card className="rounded-md shadow-none mb-1">
        <CardContent className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={filters.searchTerm}
                onChange={filters.handleInputChange}
                className="pl-8 bg-accent"
                disabled
              />
            </div>
            <Select
              value={filters.stockFilter}
              onValueChange={filters.setStockFilter}
            >
              <SelectTrigger className="w-[140px] bg-accent" disabled>
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.sorting} onValueChange={filters.setSorting}>
              <SelectTrigger
                className="relative w-[165px] bg-accent pl-15 font-semibold"
                disabled
              >
                <SelectValue />
                <span className="absolute left-2 text-muted-foreground font-normal">
                  Sort by:
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
                <SelectItem value="price-asc">Price Low-High</SelectItem>
                <SelectItem value="price-desc">Price High-Low</SelectItem>
                <SelectItem value="stock-asc">Stock Low-High</SelectItem>
                <SelectItem value="stock-desc">Stock High-Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <RefreshButton refetch={refetch} isFetching={isFetching} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
