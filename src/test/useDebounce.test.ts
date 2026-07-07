import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../hooks/useDebounce";

afterEach(() => {
  vi.useRealTimers();
});

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("debounces updates until delay elapses", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });
    expect(result.current).toBe("a");

    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe("b");
  });

  it("resets timer on rapid changes", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });
    act(() => { vi.advanceTimersByTime(100); });
    rerender({ value: "c" });
    act(() => { vi.advanceTimersByTime(100); });
    expect(result.current).toBe("a");

    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe("c");
  });
});
