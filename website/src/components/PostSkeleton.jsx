import { Skeleton } from "./ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="space-y-3 pt-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-4 ${index % 3 === 0 ? "w-4/5" : "w-full"}`}
          />
        ))}
      </div>
    </div>
  );
}
