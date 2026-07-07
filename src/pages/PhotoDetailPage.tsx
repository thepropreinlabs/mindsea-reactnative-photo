import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getFullImageUrl } from "../lib/api";
import { usePhoto } from "../hooks/usePhotos";

export default function PhotoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const photoId = parseInt(id ?? "", 10);

  const { data: photo, isLoading, isError, error, refetch } = usePhoto(photoId);

  if (isNaN(photoId)) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-lg font-bold text-neutral-900">Invalid photo ID</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Gallery
      </button>

      {isLoading && (
        <div className="space-y-4">
          <div className="w-full aspect-video bg-neutral-200 rounded-2xl animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 bg-neutral-200 rounded animate-pulse w-4/5" />
            <div className="h-4 bg-neutral-200 rounded animate-pulse w-2/5" />
          </div>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center py-24 gap-4 text-center">
          <p className="text-4xl">⚠</p>
          <h2 className="text-xl font-bold text-neutral-900">Photo not found</h2>
          <p className="text-sm text-neutral-500 max-w-sm">
            {error instanceof Error ? error.message : "Could not load this photo."}
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      )}

      {photo && (
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
            <img
              src={getFullImageUrl(photo.id)}
              alt={photo.title}
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-neutral-900 leading-snug capitalize">
              {photo.title}
            </h1>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm divide-y divide-neutral-100">
            <MetaRow label="Photo ID" value={photo.id} />
            <MetaRow label="Album ID" value={photo.albumId} />
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500">Full URL</span>
              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:underline truncate max-w-xs text-right"
              >
                {photo.url}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface MetaRowProps {
  label: string;
  value: string | number;
}

function MetaRow({ label, value }: MetaRowProps) {
  return (
    <div className="px-5 py-4 flex items-center justify-between">
      <span className="text-sm font-medium text-neutral-500">{label}</span>
      <span className="text-sm text-neutral-900 font-medium">{value}</span>
    </div>
  );
}
