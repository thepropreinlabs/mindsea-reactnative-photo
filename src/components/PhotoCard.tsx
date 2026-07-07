import { useNavigate } from "react-router-dom";
import { getThumbnailUrl } from "../lib/api";
import { cn } from "../lib/cn";
import type { Photo } from "../types/photo";

interface PhotoCardProps {
  photo: Photo;
  className?: string;
}

export function PhotoCard({ photo, className }: PhotoCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/photo/${photo.id}`)}
      className={cn(
        "group text-left rounded-xl overflow-hidden bg-white border border-neutral-200",
        "shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        className
      )}
      aria-label={`View photo: ${photo.title}`}
    >
      <div className="overflow-hidden aspect-square bg-neutral-100">
        <img
          src={getThumbnailUrl(photo.id)}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-neutral-900 leading-5 line-clamp-2">
          {photo.title}
        </p>
        <p className="text-xs text-neutral-400 mt-1">Album {photo.albumId}</p>
      </div>
    </button>
  );
}
