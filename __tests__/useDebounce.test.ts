import { act, renderHook } from "@testing-library/react-native";
import { useDebounce } from "~/hooks/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("returns the initial value immediately", () => {
    const { result } = renderHook<string, { value: string }>(() => useDebounce("initial", 300));
    expect(result.current).toBe("initial");
  });

  it("does not update before the delay has elapsed", () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "first" } }
    );

    rerender({ value: "second" });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("first");
  });

  it("updates after the delay has elapsed", () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "first" } }
    );

    rerender({ value: "second" });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("second");
  });

  it("resets the timer on rapid updates and only fires once", () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "ab" });
    act(() => jest.advanceTimersByTime(100));
    rerender({ value: "abc" });
    act(() => jest.advanceTimersByTime(100));
    rerender({ value: "abcd" });
    act(() => jest.advanceTimersByTime(100));

    expect(result.current).toBe("a");

    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toBe("abcd");
  });
});
