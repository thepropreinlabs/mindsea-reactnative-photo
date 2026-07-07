import { cn } from "../lib/cn";

const ALBUM_IDS = Array.from({ length: 10 }, (_, i) => i + 1);

interface AlbumFilterProps {
  selectedAlbumId: number | null;
  onSelectAlbum: (albumId: number | null) => void;
}

export function AlbumFilter({ selectedAlbumId, onSelectAlbum }: AlbumFilterProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1">
        Filter by Album
      </p>
      <div
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
        role="group"
        aria-label="Album filter"
      >
        <AlbumChip
          label="All"
          active={selectedAlbumId === null}
          onClick={() => onSelectAlbum(null)}
        />
        {ALBUM_IDS.map((id) => (
          <AlbumChip
            key={id}
            label={`Album ${id}`}
            active={selectedAlbumId === id}
            onClick={() => onSelectAlbum(selectedAlbumId === id ? null : id)}
          />
        ))}
      </div>
    </div>
  );
}

interface AlbumChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function AlbumChip({ label, active, onClick }: AlbumChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        active
          ? "bg-primary-600 text-white shadow-sm"
          : "bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-600"
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
