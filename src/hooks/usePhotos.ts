import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPhotoById, fetchPhotos } from "../lib/api";
import type { PhotoFilters } from "../types/photo";

export function useInfinitePhotos(filters: PhotoFilters) {
  return useInfiniteQuery({
    queryKey: ["photos", filters],
    queryFn: ({ pageParam }) =>
      fetchPhotos({
        page: pageParam,
        search: filters.search,
        albumId: filters.albumId,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function usePhoto(id: number) {
  return useQuery({
    queryKey: ["photo", id],
    queryFn: () => fetchPhotoById(id),
    enabled: !isNaN(id) && id > 0,
  });
}
