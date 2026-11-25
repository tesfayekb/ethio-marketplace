import { act, renderHook, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";

/** DEC-464 — useCurrencies' retry reads the currencies again and keeps the read's own error. */
const answers = vi.hoisted(() => [] as Array<{ data: unknown; error: unknown }>);
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({ order: async () => answers.shift() ?? { data: [], error: null } }),
    }),
  },
}));
vi.mock("@/lib/supabase-door", () => ({ currentSession: async () => ({ session: null }) }));

const { useCurrencies } = await import("./pricing-data");

it("CUR-U1 a failed read keeps its error; retry reads again and answers", async () => {
  answers.push(
    { data: null, error: { message: "TypeError: Failed to fetch" } },
    { data: [{ code: "ETB", name_en: "Birr", symbol: "Br", display_order: 1 }], error: null },
  );
  const { result } = renderHook(() => useCurrencies());
  await waitFor(() => expect(result.current.failed).toBe(true));
  expect(result.current.failure).not.toBeNull();
  act(() => result.current.retry());
  await waitFor(() => expect(result.current.failed).toBe(false));
  expect(result.current.failure).toBeNull();
  expect(result.current.currencies.map((row) => row.code)).toEqual(["ETB"]);
});
