export function PhotoCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-neutral-200 shadow-sm">
      <div className="aspect-square bg-neutral-200 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-neutral-200 rounded animate-pulse w-full" />
        <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-neutral-200 rounded animate-pulse w-1/3 mt-1" />
      </div>
    </div>
  );
}
