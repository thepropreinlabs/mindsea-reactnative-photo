import { render, screen, fireEvent } from "@testing-library/react-native";
import * as React from "react";
import { PhotoCard } from "~/components/PhotoCard";
import type { Photo } from "~/types/photo";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockPhoto: Photo = {
  id: 42,
  albumId: 5,
  title: "a beautiful sunset over mountains",
  url: "https://via.placeholder.com/600",
  thumbnailUrl: "https://via.placeholder.com/150",
};

describe("PhotoCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the photo title", () => {
    render(<PhotoCard photo={mockPhoto} />);
    expect(
      screen.getByText("a beautiful sunset over mountains")
    ).toBeTruthy();
  });

  it("renders the album label", () => {
    render(<PhotoCard photo={mockPhoto} />);
    expect(screen.getByText("Album 5")).toBeTruthy();
  });

  it("navigates to the photo detail screen when pressed", () => {
    render(<PhotoCard photo={mockPhoto} />);

    const pressable = screen.getByRole("button", {
      name: "View photo: a beautiful sunset over mountains",
    });

    fireEvent.press(pressable);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/photo/42");
  });

  it("renders an image with the correct accessibility label", () => {
    render(<PhotoCard photo={mockPhoto} />);
    expect(
      screen.getByLabelText("a beautiful sunset over mountains")
    ).toBeTruthy();
  });
});
