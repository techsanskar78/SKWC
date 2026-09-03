export default function Loading() {
  return (
    <div className="container-wide page-pad animate-pulse" aria-hidden>
      <div className="h-10 w-40 bg-cream mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[3/4] bg-cream" />
            <div className="mt-3 h-3 w-2/3 bg-cream" />
            <div className="mt-2 h-3 w-1/3 bg-cream" />
          </div>
        ))}
      </div>
    </div>
  );
}
