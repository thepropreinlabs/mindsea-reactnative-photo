import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { PhotoCard } from "../components/PhotoCard";
import type { Photo } from "../types/photo";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const PHOTO: Photo = {
  id: 42,
  albumId: 3,
  title: "a beautiful sunset over mountains",
  url: "https://via.placeholder.com/600/abc",
  thumbnailUrl: "https://via.placeholder.com/150/abc",
};

function renderCard(photo = PHOTO) {
  return render(
    <MemoryRouter>
      <PhotoCard photo={photo} />
    </MemoryRouter>
  );
}

describe("PhotoCard", () => {
  it("renders photo title", () => {
    renderCard();
    expect(screen.getByText(PHOTO.title)).toBeInTheDocument();
  });

  it("renders album id", () => {
    renderCard();
    expect(screen.getByText("Album 3")).toBeInTheDocument();
  });

  it("renders thumbnail image with correct src", () => {
    renderCard();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", `https://picsum.photos/seed/${PHOTO.id}/300/300`);
    expect(img).toHaveAttribute("alt", PHOTO.title);
  });

  it("navigates to detail page on click", async () => {
    renderCard();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(mockNavigate).toHaveBeenCalledWith(`/photo/${PHOTO.id}`);
  });

  it("has accessible label", () => {
    renderCard();
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-label", `View photo: ${PHOTO.title}`);
  });
});
