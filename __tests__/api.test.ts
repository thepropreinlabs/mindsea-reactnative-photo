import { fetchPhotoById, fetchPhotos, getFullImageUrl, getThumbnailUrl } from "~/lib/api";
import type { Photo } from "~/types/photo";

const mockPhoto: Photo = {
  id: 1,
  albumId: 1,
  title: "accusamus beatae ad facilis cum similique qui sunt",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952",
};

const mockPhotos: Photo[] = Array.from({ length: 50 }, (_, i) => ({
  ...mockPhoto,
  id: i + 1,
  title: `Photo ${i + 1}`,
}));

describe("API helpers", () => {
  it("getThumbnailUrl generates picsum URL with seed", () => {
    const url = getThumbnailUrl(42);
    expect(url).toBe("https://picsum.photos/seed/42/300/300");
  });

  it("getFullImageUrl generates picsum URL with seed", () => {
    const url = getFullImageUrl(42);
    expect(url).toBe("https://picsum.photos/seed/42/800/600");
  });
});

describe("fetchPhotos", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches the first page with default params", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPhotos,
      headers: {
        get: (key: string) => (key === "X-Total-Count" ? "5000" : null),
      },
    });

    const result = await fetchPhotos({ page: 0 });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("_start=0&_limit=50")
    );
    expect(result.photos).toHaveLength(50);
    expect(result.totalCount).toBe(5000);
    expect(result.nextPage).toBe(1);
  });

  it("returns nextPage as null when fewer than 50 results returned", async () => {
    const partialPage = mockPhotos.slice(0, 10);
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => partialPage,
      headers: { get: () => null },
    });

    const result = await fetchPhotos({ page: 5 });

    expect(result.nextPage).toBeNull();
    expect(result.photos).toHaveLength(10);
  });

  it("includes albumId in the query when provided", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
      headers: { get: () => null },
    });

    await fetchPhotos({ page: 0, albumId: 3 });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("albumId=3")
    );
  });

  it("includes title_like in the query when search is provided", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
      headers: { get: () => null },
    });

    await fetchPhotos({ page: 0, search: "nature" });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("title_like=nature")
    );
  });

  it("throws an error when the response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(fetchPhotos({ page: 0 })).rejects.toThrow(
      "Failed to fetch photos: 500 Internal Server Error"
    );
  });
});

describe("fetchPhotoById", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches a single photo by ID", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPhoto,
    });

    const result = await fetchPhotoById(1);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos/1"
    );
    expect(result).toEqual(mockPhoto);
  });

  it("throws when photo is not found", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(fetchPhotoById(99999)).rejects.toThrow(
      "Failed to fetch photo 99999: 404 Not Found"
    );
  });
});
