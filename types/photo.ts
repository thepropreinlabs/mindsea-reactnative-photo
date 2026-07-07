export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotosPage {
  photos: Photo[];
  nextPage: number | null;
  totalCount: number;
}

export interface PhotoFilters {
  search: string;
  albumId: number | null;
}
