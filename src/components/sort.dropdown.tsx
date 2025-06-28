"use client";

import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

type SortOption = {
  value: string;
  label: string;
  field: "createdAt" | "updatedAt";
  direction: "asc" | "desc";
  icon: React.ReactNode;
};

const sortOptions: SortOption[] = [
  {
    value: "createdAt-desc",
    label: "Newest First",
    field: "createdAt",
    direction: "desc",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    value: "createdAt-asc",
    label: "Oldest First",
    field: "createdAt",
    direction: "asc",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    value: "updatedAt-desc",
    label: "Recently Updated",
    field: "updatedAt",
    direction: "desc",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    value: "updatedAt-asc",
    label: "Least Recently Updated",
    field: "updatedAt",
    direction: "asc",
    icon: <Clock className="w-4 h-4" />,
  },
];

interface SortDropdownProps {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function SortDropdown({
  value = "createdAt-desc",
  onValueChange,
  className,
}: SortDropdownProps) {
  const selectedOption = sortOptions.find((option) => option.value === value);

  const handleValueChange = (newValue: string) => {
    onValueChange?.(newValue);
  };

  const getDirectionIcon = (direction: "asc" | "desc") => {
    return direction === "asc" ? (
      <ArrowUp className="w-3 h-3" />
    ) : (
      <ArrowDown className="w-3 h-3" />
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort by
          {selectedOption && (
            <span className="ml-2 flex items-center gap-1">
              {selectedOption.icon}
              {getDirectionIcon(selectedOption.direction)}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px]" align="end">
        <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="flex items-center gap-2"
            >
              {option.icon}
              <span className="flex-1">{option.label}</span>
              {getDirectionIcon(option.direction)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
