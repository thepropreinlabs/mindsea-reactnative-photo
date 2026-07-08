# Photo Gallery

A React Native photo gallery built with Expo and TypeScript. Browse photos from the JSONPlaceholder API, search by title, filter by album, and tap any photo for its detail view.

## Tech Stack

| Concern       | Choice                                 |
| ------------- | -------------------------------------- |
| Framework     | Expo (SDK 55) + React Native           |
| Language      | TypeScript                             |
| Navigation    | Expo Router (file-based)               |
| Data fetching | TanStack React Query v5                |
| Styling       | NativeWind v4                          |
| Animation     | Reanimated 4 (+ react-native-worklets) |
| Testing       | Jest + React Testing Library           |

## API

**Primary data:** [JSONPlaceholder /photos](https://jsonplaceholder.typicode.com/photos)

The required fields (`title`, `thumbnailUrl`, `url`, `albumId`) match the JSONPlaceholder photos endpoint. picsum.photos renders real images via `/seed/:id` (e.g. `https://picsum.photos/seed/1/300/300`).

## Setup

### Prerequisites

- **Node.js 22 or later.** SDK 55's tooling and several transitive dependencies require it; Node 18/20 will fail to install. With nvm: `nvm install 22 && nvm use 22`.
- **yarn.** This project uses `yarn.lock` — use yarn, not npm, to avoid lockfile conflicts.
- Expo Go on a physical device (optional).

### Install

```bash
yarn install
```

### Run

```bash
yarn start            # interactive launcher (iOS / Android / web)
yarn web              # web
yarn ios              # iOS simulator
yarn android          # Android emulator
```

### Test / typecheck

```bash
yarn test             # run once
yarn typecheck
```

## Features

**Core**

- List screen — responsive 2–4 column grid of photo cards (thumbnail + title)
- Detail screen — full-resolution image with photo ID, album ID, and title

**Search** — real-time title search, 400ms debounce, server-side via `title_like`.

**Pagination** — 50 photos at a time with `useInfiniteQuery`; loads more at 40% from the list bottom.

**Tests** — `api.test.ts` (API functions, error handling, URL helpers), `PhotoCard.test.tsx` (rendering + navigation), `useDebounce.test.ts` (debounce timing with fake timers).

**Other** — loading skeletons, empty/error states with retry, responsive grid (2/3/4 cols), album filter chips (1–10), result count, accessibility labels, dark mode.

## Project Structure

```
photo-gallery/
├── app/
│   ├── _layout.tsx          # QueryClientProvider + Stack navigator
│   ├── index.tsx            # List: search, filter, infinite scroll
│   └── photo/[id].tsx       # Detail screen
├── components/
│   ├── ui/                  # badge, button, card, input, text
│   ├── AlbumFilter.tsx
│   ├── PhotoCard.tsx
│   ├── PhotoCardSkeleton.tsx
│   └── SearchBar.tsx
├── hooks/                   # useDebounce, usePhotos
├── lib/                     # api, cn, queryClient
├── types/photo.ts
├── __tests__/               # api, PhotoCard, useDebounce
├── global.css
├── tailwind.config.js
├── babel.config.js
└── metro.config.js
```

## Notes

**Data source** — JSONPlaceholder supplies the metadata (`title`, `albumId`, `thumbnailUrl`); picsum.photos renders the actual images. picsum.photos/images alone lacks an album concept.

**Infinite scroll** — `useInfiniteQuery` accumulates pages in one cache entry and exposes `hasNextPage` / `isFetchingNextPage`. Moving to cursor-based paging is a one-line change to `getNextPageParam`.

**Server-side search** — with 5000 paginated photos, client-side filtering would miss unloaded pages. `title_like` resets pagination correctly and returns accurate `X-Total-Count`.

**UI components** — `components/ui/` follows React Native Reusables conventions (forwarded refs, `className`, `cn()`) but is written in-repo, so no CLI copy step is needed after install.

**Assets** — `app.json` uses Expo's default icon/splash; no custom asset files are required to run.
