import { Skeleton } from "@/components/ui/skeleton";

export function NotificationsPageLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-9 w-30" />
          </div>
          <div className="text-sm text-muted-foreground">
            <Skeleton className="h-[20px] w-40" />
          </div>
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Skeleton className="h-[30px] w-8" />
          <Skeleton className="h-[30px] w-16" />
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <NotificationSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

const NotificationSkeleton = () => {
  return (
    <div className="border border-border rounded-lg p-4 bg-card space-y-3">
      <div className="flex gap-4">
        {/* Icon placeholder */}
        <Skeleton className="h-5 w-5 rounded-full" />

        {/* Text placeholders */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>

      {/* Footer placeholders */}
      <div className="flex items-center justify-between mt-2">
        <Skeleton className="h-3 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
};
