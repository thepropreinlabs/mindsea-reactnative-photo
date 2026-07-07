import { Search, X } from "lucide-react";
import { cn } from "../lib/cn";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  className?: string;
}

export function SearchBar({ value, onChange, resultCount, className }: SearchBarProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search photos by title..."
          aria-label="Search photos"
          className={cn(
            "w-full pl-9 pr-9 py-2.5 rounded-xl border border-neutral-200 bg-white",
            "text-sm text-neutral-900 placeholder:text-neutral-400",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "transition-shadow duration-150"
          )}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {value.trim().length > 0 && resultCount !== undefined && (
        <p className="text-xs text-neutral-500 pl-1">
          {resultCount} result{resultCount !== 1 ? "s" : ""} found
        </p>
      )}
    </div>
  );
}
