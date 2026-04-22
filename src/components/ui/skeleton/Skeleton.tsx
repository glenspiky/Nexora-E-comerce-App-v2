export const SkeletonCard = () => {
  return (
    <div className="bg-gray-100 flex flex-col rounded-t-[10px] border border-gray-200 h-[380px] overflow-hidden animate-pulse">
      {/* Thumbnail Area */}
      <div className="w-full aspect-square bg-gray-200" />

      {/* Description Area */}
      <div className="p-2 flex flex-col gap-3 flex-1">
        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Rating Line */}
        <div className="h-3 bg-gray-200 rounded w-1/4" />

        {/* Price and Button Area */}
        <div className="mt-auto space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonLoader = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[clamp(10px,2vw,15px)]">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
