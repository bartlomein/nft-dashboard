import { act, renderHook } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";

describe("useLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should return the default value if localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("should store and retrieve the value from localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("test", "default"));

    act(() => {
      result.current[1]("new value");
    });

    expect(result.current[0]).toBe("new value");
    expect(localStorage.getItem("test")).toBe('"new value"');
  });

  it("should handle JSON values in localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage<{ value: string }>("test", { value: "default" })
    );

    act(() => {
      result.current[1]({ value: "new value" });
    });

    expect(result.current[0]).toEqual({ value: "new value" });
    expect(localStorage.getItem("test")).toBe('{"value":"new value"}');
  });
});
