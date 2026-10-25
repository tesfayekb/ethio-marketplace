import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import { enMember } from "./locales/en-member";
import type { MessageKey } from "./types";

/**
 * DEC-258 — a strings layer loads only when a screen asks for it, joins the
 * chain once its English part is in, and says "failed" (with a retry that asks
 * again) when that part does not arrive. The layer loaders are mocked with
 * promises settled by hand.
 */

const KEY = Object.keys(enMember)[0] as MessageKey;
const TEXT = (enMember as Record<string, string>)[KEY];

const loaders = vi.hoisted(() => ({
  calls: [] as string[],
  pending: new Map<
    string,
    { resolve: (value: Record<string, string>) => void; reject: (reason: unknown) => void }
  >(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
    },
  },
}));
vi.mock("@/features/auth/auth-service", () => ({
  fetchPreferredLanguage: () => new Promise(() => undefined),
  savePreferredLanguage: () => Promise.resolve({ ok: true }),
}));
vi.mock("./bundle", () => ({
  fetchUiBundle: () => Promise.resolve({ bundle: null, reason: "test" }),
  fetchEntityBundle: () => Promise.resolve({ bundle: null, reason: "test" }),
}));
vi.mock("./compiled-catalog", async (importOriginal) => {
  const real = await importOriginal<typeof import("./compiled-catalog")>();
  return {
    ...real,
    compiledCatalogLoader: () => undefined,
    compiledLayerLoader: (layer: string, code: string) =>
      code === "en"
        ? () => {
            loaders.calls.push(layer);
            return new Promise<Record<string, string>>((resolve, reject) => {
              loaders.pending.set(layer, { resolve, reject });
            });
          }
        : undefined,
  };
});

const { I18nProvider, useI18n, useStringsLayers } = await import("./provider");

function Probe({ ask }: { ask: boolean }) {
  const { t } = useI18n();
  return (
    <div>
      <p data-testid="text">{t(KEY) ?? ""}</p>
      {ask ? <Asker /> : null}
    </div>
  );
}

function Asker() {
  const member = useStringsLayers(["member"]);
  return (
    <>
      <p data-testid="state">{member.state}</p>
      <Button type="button" onClick={member.retry}>
        retry
      </Button>
    </>
  );
}

function mount(ask: boolean) {
  const tree = (asking: boolean) => (
    <I18nProvider>
      <Probe ask={asking} />
    </I18nProvider>
  );
  const view = render(tree(ask));
  return { again: (asking: boolean) => view.rerender(tree(asking)) };
}

beforeEach(() => {
  loaders.calls = [];
  loaders.pending.clear();
  window.localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(() => new Promise(() => undefined)),
  );
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("strings layers in the provider (DEC-258)", () => {
  it("PSL-1 a layer no screen asks for is never loaded, and its keys are absent", async () => {
    mount(false);
    await act(async () => undefined);
    expect(loaders.calls).toEqual([]);
    expect(screen.getByTestId("text").textContent).toBe("");
  });

  it("PSL-2 asked, the layer loads once: loading, then ready with its text applied", async () => {
    mount(true);
    await waitFor(() => expect(loaders.pending.has("member")).toBe(true));
    expect(screen.getByTestId("state").textContent).toBe("loading");
    expect(loaders.calls).toEqual(["member"]);
    await act(async () => {
      loaders.pending.get("member")?.resolve({ [KEY]: TEXT });
    });
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("ready"));
    expect(screen.getByTestId("text").textContent).toBe(TEXT);
  });

  it("PSL-3 a failed English part fails the layer; Try again asks again and a later load is ready", async () => {
    mount(true);
    await waitFor(() => expect(loaders.pending.has("member")).toBe(true));
    await act(async () => {
      loaders.pending.get("member")?.reject(new Error("offline"));
    });
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("failed"));
    expect(screen.getByTestId("text").textContent).toBe("");
    loaders.pending.clear();
    fireEvent.click(screen.getByRole("button", { name: "retry" }));
    await waitFor(() => expect(loaders.pending.has("member")).toBe(true));
    await act(async () => {
      loaders.pending.get("member")?.resolve({ [KEY]: TEXT });
    });
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("ready"));
    expect(screen.getByTestId("text").textContent).toBe(TEXT);
  });

  it("PSL-4 a layer already in is not loaded again when a later screen asks for it", async () => {
    const view = mount(true);
    await waitFor(() => expect(loaders.pending.has("member")).toBe(true));
    await act(async () => {
      loaders.pending.get("member")?.resolve({ [KEY]: TEXT });
    });
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("ready"));
    view.again(false);
    view.again(true);
    await act(async () => undefined);
    expect(screen.getByTestId("state").textContent).toBe("ready");
    expect(loaders.calls).toEqual(["member"]);
  });
});
