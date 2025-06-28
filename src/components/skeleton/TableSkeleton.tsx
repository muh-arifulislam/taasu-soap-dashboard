import { Skeleton } from "../ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="border rounded-md p-4 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          {[...Array(4)].map((_, j) => (
            <Skeleton key={j} className="h-4 w-full flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
