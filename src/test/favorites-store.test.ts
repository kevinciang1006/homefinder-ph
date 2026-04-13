import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { useFavoritesStore } from "@/stores/favorites-store";

describe("FavoritesStore", () => {
  beforeEach(() => {
    useFavoritesStore.setState({ ids: [] });
  });

  it("starts with no favorites", () => {
    expect(useFavoritesStore.getState().ids).toHaveLength(0);
  });

  it("toggles a property into favorites", () => {
    act(() => {
      useFavoritesStore.getState().toggle("prop-001");
    });
    expect(useFavoritesStore.getState().ids).toContain("prop-001");
  });

  it("toggles a property out of favorites", () => {
    act(() => {
      useFavoritesStore.getState().toggle("prop-001");
      useFavoritesStore.getState().toggle("prop-001");
    });
    expect(useFavoritesStore.getState().ids).not.toContain("prop-001");
  });

  it("isFavorite returns true when favorited", () => {
    act(() => {
      useFavoritesStore.getState().toggle("prop-002");
    });
    expect(useFavoritesStore.getState().isFavorite("prop-002")).toBe(true);
  });

  it("isFavorite returns false when not favorited", () => {
    expect(useFavoritesStore.getState().isFavorite("prop-999")).toBe(false);
  });

  it("clear empties favorites", () => {
    act(() => {
      useFavoritesStore.getState().toggle("prop-001");
      useFavoritesStore.getState().toggle("prop-002");
      useFavoritesStore.getState().clear();
    });
    expect(useFavoritesStore.getState().ids).toHaveLength(0);
  });

  it("can add multiple favorites", () => {
    act(() => {
      useFavoritesStore.getState().toggle("prop-001");
      useFavoritesStore.getState().toggle("prop-002");
      useFavoritesStore.getState().toggle("prop-003");
    });
    expect(useFavoritesStore.getState().ids).toHaveLength(3);
  });
});
