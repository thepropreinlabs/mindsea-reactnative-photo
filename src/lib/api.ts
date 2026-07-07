import type { Photo, PhotosPage } from "../types/photo";

const BASE_URL = "https://jsonplaceholder.typicode.com";
const PAGE_SIZE = 50;

export function getThumbnailUrl(photoId: number): string {
  return `https://picsum.photos/seed/${photoId}/300/300`;
}

export function getFullImageUrl(photoId: number): string {
  return `https://picsum.photos/seed/${photoId}/800/600`;
}

interface FetchPhotosParams {
  page: number;
  search?: string;
  albumId?: number | null;
}

export async function fetchPhotos({
  page,
  search,
  albumId,
}: FetchPhotosParams): Promise<PhotosPage> {
  const params = new URLSearchParams({
    _start: String(page * PAGE_SIZE),
    _limit: String(PAGE_SIZE),
  });

  if (albumId != null) {
    params.set("albumId", String(albumId));
  }

  if (search && search.trim()) {
    params.set("title_like", search.trim());
  }

  const response = await fetch(`${BASE_URL}/photos?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
  }

  const photos: Photo[] = await response.json();

  const totalCountHeader = response.headers.get("X-Total-Count");
  const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : photos.length;

  const hasMore = photos.length === PAGE_SIZE;

  return {
    photos,
    nextPage: hasMore ? page + 1 : null,
    totalCount,
  };
}

export async function fetchPhotoById(id: number): Promise<Photo> {
  const response = await fetch(`${BASE_URL}/photos/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch photo ${id}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
