import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchPhotos, fetchPhotoById, getThumbnailUrl, getFullImageUrl } from "../lib/api";

const MOCK_PHOTOS = [
  { id: 1, albumId: 1, title: "accusamus beatae ad facilis", url: "https://via.placeholder.com/600/92c952", thumbnailUrl: "https://via.placeholder.com/150/92c952" },
  { id: 2, albumId: 1, title: "reprehenderit est deserunt", url: "https://via.placeholder.com/600/771796", thumbnailUrl: "https://via.placeholder.com/150/771796" },
];

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("getThumbnailUrl", () => {
  it("returns picsum URL with correct seed", () => {
    expect(getThumbnailUrl(5)).toBe("https://picsum.photos/seed/5/300/300");
  });
});

describe("getFullImageUrl", () => {
  it("returns picsum URL with correct seed and larger size", () => {
    expect(getFullImageUrl(5)).toBe("https://picsum.photos/seed/5/800/600");
  });
});

describe("fetchPhotos", () => {
  it("returns photos and pagination info on success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_PHOTOS,
      headers: { get: () => "5000" },
    }));

    const result = await fetchPhotos({ page: 0 });

    expect(result.photos).toHaveLength(2);
    expect(result.totalCount).toBe(5000);
    expect(result.nextPage).toBeNull();
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    }));

    await expect(fetchPhotos({ page: 0 })).rejects.toThrow("500");
  });

  it("includes albumId param when provided", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
      headers: { get: () => null },
    });
    vi.stubGlobal("fetch", mockFetch);

    await fetchPhotos({ page: 0, albumId: 3 });

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain("albumId=3");
  });

  it("includes title_like param when search is provided", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
      headers: { get: () => null },
    });
    vi.stubGlobal("fetch", mockFetch);

    await fetchPhotos({ page: 0, search: "sunset" });

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain("title_like=sunset");
  });
});

describe("fetchPhotoById", () => {
  it("returns photo on success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_PHOTOS[0],
    }));

    const result = await fetchPhotoById(1);
    expect(result.id).toBe(1);
    expect(result.title).toBe("accusamus beatae ad facilis");
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    }));

    await expect(fetchPhotoById(9999)).rejects.toThrow("404");
  });
});
