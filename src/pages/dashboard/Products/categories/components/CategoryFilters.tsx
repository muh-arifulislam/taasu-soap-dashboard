import { Search } from "lucide-react";
import type { useCategoryFilters } from "../hooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PRODUCT_CATEGORY_TYPES,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from "../constant";
import type { ProductCategoryType } from "@/types";

export const CategoryFilters: React.FC<{
  filters: ReturnType<typeof useCategoryFilters>;
}> = ({ filters }) => {
  const {
    searchTerm,
    handleInputChange,
    statusFilter,
    setStatusFilter,
    categoryType,
    setCategoryType,
    sorting,
    setSorting,
  } = filters;

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleInputChange}
            className="pl-8 bg-accent"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={categoryType}
          onValueChange={(value) =>
            setCategoryType(value as ProductCategoryType | "all")
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {PRODUCT_CATEGORY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sorting} onValueChange={setSorting}>
          <SelectTrigger className="relative w-[165px] bg-accent pl-15 font-semibold">
            <SelectValue />
            <span className="absolute left-2 text-muted-foreground font-normal">
              Sort by:
            </span>
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
