import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useCardPhotos } from "./use-card-photos";

/** DEC-195 — UC-1: a cover the preset holds is never asked for again. */

const CARD = (id: string) => `https://staging.example/signed/${id}/card.webp?token=t`;

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useCardPhotos — the preset (DEC-195)", () => {
  it("UC-1 a preset holding every cover: no request is made and each cover's card link is returned", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const preset = {
      p1: { card: CARD("p1") },
      p2: { card: CARD("p2") },
    };
    const { result } = renderHook(
      () =>
        useCardPhotos(
          [{ coverPhotoId: "p1" }, { coverPhotoId: "p2" }, { coverPhotoId: null }],
          preset,
        ),
      { wrapper },
    );
    expect(result.current("p1")).toBe(CARD("p1"));
    expect(result.current("p2")).toBe(CARD("p2"));
    expect(result.current(null)).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("UC-1b a preset holding half: only the other half is asked", async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ ok: true, links: { p2: { card: CARD("p2") } } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);
    const { result } = renderHook(
      () =>
        useCardPhotos([{ coverPhotoId: "p1" }, { coverPhotoId: "p2" }], {
          p1: { card: CARD("p1") },
        }),
      { wrapper },
    );
    await waitFor(() => expect(result.current("p2")).toBe(CARD("p2")));
    expect(result.current("p1")).toBe(CARD("p1"));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const init = fetchMock.mock.calls[0]?.[1] as unknown as RequestInit;
    const body = JSON.parse(String(init.body)) as { photoIds: string[]; variants: string[] };
    expect(body.photoIds).toEqual(["p2"]);
    expect(body.variants).toEqual(["card", "thumb"]);
  });
});
