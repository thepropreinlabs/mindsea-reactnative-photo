# Photo Gallery

A React Native photo gallery app built with Expo and TypeScript. Browse photos from the JSONPlaceholder API, search by title, filter by album, and tap any photo to see its full detail.

## Tech Stack

| Concern | Choice |
|---------|--------|
| Framework | Expo (SDK 52) + React Native |
| Language | TypeScript |
| Navigation | Expo Router v4 (file-based) |
| Data fetching | TanStack React Query v5 |
| Styling | NativeWind v4 (Tailwind CSS for RN) |
| Component library | React Native Reusables-style components |
| Testing | Jest + React Testing Library |

## API

**Primary data:** [JSONPlaceholder /photos](https://jsonplaceholder.typicode.com/photos)

The spec references `https://picsum.photos/images`, but the required fields (`title`, `thumbnailUrl`, `url`, `albumId`) exactly match the JSONPlaceholder photos endpoint. JSONPlaceholder is the correct source; picsum.photos is used for rendering real photographic images via its `/seed/:id` endpoint (e.g., `https://picsum.photos/seed/1/300/300`).

## Setup

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Expo Go app on your phone (optional for physical device testing)

### Install

```bash
npm install
```

### Run

```bash
# Interactive launcher (choose iOS / Android / web)
npm start

# Web directly
npm run web

# iOS simulator
npm run ios

# Android emulator
npm run android
```

### Test

```bash
# Run all tests once
npm test

# Watch mode
npm run test:watch
```

### Type check

```bash
npm run typecheck
```

## Features

### Core
- **List screen** — responsive 2-4 column grid of photo cards showing a thumbnail and title
- **Detail screen** — full-resolution image with photo ID, album ID, and title

### Bonus features implemented

#### Search
Real-time title search with 400ms debounce. Uses JSONPlaceholder's `title_like` query parameter so filtering happens on the server, keeping the response payload small.

#### Pagination
Photos load 50 at a time using `useInfiniteQuery`. Fetching the next page triggers automatically when the user scrolls within 40% of the list bottom (`onEndReachedThreshold={0.4}`), providing seamless infinite scroll.

#### Automated tests
Three test suites covering:
- `__tests__/api.test.ts` — unit tests for all API functions including error handling, query param construction, and URL helpers
- `__tests__/PhotoCard.test.tsx` — component tests verifying rendering and navigation
- `__tests__/useDebounce.test.ts` — hook tests using fake timers to verify debounce timing behavior

### Additional touches
- **Loading skeletons** — animated placeholder cards while the first page loads
- **Empty state** — friendly message when search/filter yields no results
- **Error state** — descriptive error screens with retry buttons on both screens
- **Responsive grid** — 2 columns on mobile, 3 on tablet, 4 on desktop/web
- **Album filter chips** — horizontal scrollable row of album ID badges (Albums 1-10)
- **Result count** — shows how many photos match the current filters
- **Accessibility** — `accessibilityRole`, `accessibilityLabel`, and `accessibilityHint` on interactive elements
- **Dark mode** — NativeWind dark: classes throughout, respects system preference

## Project Structure

```
photo-gallery/
├── app/
│   ├── _layout.tsx          # Root layout: QueryClientProvider + Stack navigator
│   ├── index.tsx            # List screen with search, filter, infinite scroll
│   └── photo/
│       └── [id].tsx         # Detail screen
├── components/
│   ├── ui/                  # Reusable primitives (RNR-style)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── text.tsx
│   ├── AlbumFilter.tsx
│   ├── PhotoCard.tsx
│   ├── PhotoCardSkeleton.tsx
│   └── SearchBar.tsx
├── hooks/
│   ├── useDebounce.ts
│   └── usePhotos.ts
├── lib/
│   ├── api.ts               # Fetch functions and URL helpers
│   ├── cn.ts                # clsx + tailwind-merge utility
│   └── queryClient.ts       # Shared QueryClient instance
├── types/
│   └── photo.ts
├── __tests__/
│   ├── api.test.ts
│   ├── PhotoCard.test.tsx
│   └── useDebounce.test.ts
├── global.css               # Tailwind directives
├── tailwind.config.js
├── babel.config.js
└── metro.config.js
```

## Design Decisions

**Why JSONPlaceholder over picsum.photos/images?**
The spec lists field names (`title`, `thumbnailUrl`, `albumId`) that only exist in the JSONPlaceholder response shape. picsum.photos/images returns `author`, `download_url`, and `width`/`height` — no album concept. Using JSONPlaceholder with picsum for image rendering gives us both structured metadata and real photographs.

**Why `useInfiniteQuery` instead of page state?**
Infinite scroll is the natural pattern for a photo grid on mobile. `useInfiniteQuery` accumulates pages in a single cache entry, handles deduplication, and exposes `hasNextPage`/`isFetchingNextPage` cleanly. Switching to cursor-based pagination in the future is a one-line change to `getNextPageParam`.

**Why debounce server-side search instead of client-side filter?**
With 5000 photos and pagination, the client only holds the loaded pages in memory. Client-side filtering would miss photos on unloaded pages. Sending `title_like` to the server resets pagination correctly and returns accurate counts from `X-Total-Count`.

**React Native Reusables note**
RNR is normally consumed via a CLI that copies component source into your project (similar to shadcn/ui). In this repo the UI components under `components/ui/` are written from scratch following RNR's API conventions (forwarded refs, `className` prop, `cn()` utility) so no additional CLI step is required after `npm install`.
