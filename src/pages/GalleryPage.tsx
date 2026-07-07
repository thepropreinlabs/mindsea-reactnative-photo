import { useMemo, useState, useCallback, useRef } from "react";
import { AlbumFilter } from "../components/AlbumFilter";
import { PhotoCard } from "../components/PhotoCard";
import { PhotoCardSkeleton } from "../components/PhotoCardSkeleton";
import { SearchBar } from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { useInfinitePhotos } from "../hooks/usePhotos";

export default function GalleryPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(searchText, 400);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfinitePhotos({ search: debouncedSearch, albumId: selectedAlbumId });

  const photos = useMemo(
    () => data?.pages.flatMap((p) => p.photos) ?? [],
    [data]
  );
  const totalCount = data?.pages[0]?.totalCount;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="sticky top-0 z-10 bg-neutral-50/80 backdrop-blur-sm border-b border-neutral-200 py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Photo Gallery</h1>
            {totalCount !== undefined && !isLoading && (
              <p className="text-sm text-neutral-500 mt-0.5">
                {photos.length} of {totalCount.toLocaleString()} photos
              </p>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <SearchBar value={searchText} onChange={setSearchText} resultCount={photos.length} />
          <AlbumFilter selectedAlbumId={selectedAlbumId} onSelectAlbum={setSelectedAlbumId} />
        </div>
      </header>

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <PhotoCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <p className="text-5xl">⚠</p>
          <h2 className="text-xl font-bold text-neutral-900">Failed to load photos</h2>
          <p className="text-sm text-neutral-500 text-center max-w-sm">
            {error instanceof Error ? error.message : "An unexpected error occurred."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !isError && photos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <p className="text-5xl">&#x1F50D;</p>
          <h2 className="text-lg font-semibold text-neutral-700">No photos found</h2>
          <p className="text-sm text-neutral-400 text-center max-w-xs">
            Try adjusting your search or clearing the album filter.
          </p>
        </div>
      )}

      {!isLoading && !isError && photos.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
          <div ref={sentinelRef} className="h-10 mt-6" />
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
