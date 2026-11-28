import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
const track = vi.hoisted(() => vi.fn());
vi.mock("@/components/ui/dialog-parts-facade", () => ({
  StepTrack: (props: { steps: string[]; current: number }) => {
    track(props);
    return null;
  },
}));
import { beforeEach, describe, expect, it, vi } from "vitest";

import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";

/** INC-1350 — the undo's gone codes read as gone (`failure.gone`), never the generic line. */
const t = (key: string): string =>
  key.endsWith(".error.reason") ? "Reason: {reason}" : (ownValue(en, key) ?? `T(${key})`);
const has = (key: string) => ownValue(en, key) !== undefined;

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t, has }),
}));

const callRoute = vi.fn();
vi.mock("@/lib/route-client", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/route-client")>()),
  callRoute: (...args: unknown[]) => callRoute(...args),
}));

vi.mock("@/features/auth/mfa/mfa-service", () => ({ stepUpAbortKey: () => undefined }));

vi.mock("@/components/ui/category-modal", () => ({
  CategoryModal: ({
    children,
    footer,
    description,
  }: {
    children: ReactNode;
    footer: ReactNode;
    description: ReactNode;
  }) => (
    <div>
      {description}
      {children}
      {footer}
    </div>
  ),
}));

import { ImportDialog } from "./import-dialog";
import type { RefusalFamily } from "@/lib/refusal";

const ok = (payload: unknown) => ({ kind: "answered", ok: true, status: 200, payload });
const refused = (status: number, error: string, detail?: string) => ({
  kind: "answered",
  ok: false,
  status,
  error,
  detail: detail ?? null,
});
const PREVIEW = { digest: "d", counts: {}, refusals: [], ignored: [] };

function mount(refusals?: RefusalFamily) {
  render(
    <ImportDialog
      testid="imp"
      idPrefix="imp"
      title={t("admin.test.import.title")}
      path={"/api/admin/import" as never}
      keyPrefix="admin.test.import"
      files={[{ field: "csv", id: "imp-file", labelKey: "admin.test.import.file" as never }]}
      countFields={[]}
      reasonKeys={new Set()}
      family={"test" as never}
      scope={null}
      guard={(async (run: () => Promise<void>) => run()) as never}
      onClose={() => {}}
      {...(refusals === undefined ? {} : { refusals })}
    />,
  );
}

async function pick() {
  const file = new File(["a,b\n1,2"], "x.csv", { type: "text/csv" });
  fireEvent.change(screen.getByTestId("imp-file"), { target: { files: [file] } });
  await waitFor(() => expect(screen.getByTestId("imp-preview")).not.toBeDisabled());
}

/** Preview answers, then the commit answers `answer`. */
async function commitWith(answer: unknown, refusals?: RefusalFamily) {
  callRoute.mockResolvedValueOnce(ok(PREVIEW)).mockResolvedValueOnce(answer);
  mount(refusals);
  await pick();
  fireEvent.click(screen.getByTestId("imp-preview"));
  fireEvent.click(await screen.findByTestId("imp-confirm"));
  await screen.findByTestId("imp-error");
}

/** Preview and commit answer, then the undo answers `answer`. */
async function undoWith(answer: unknown) {
  callRoute
    .mockResolvedValueOnce(ok(PREVIEW))
    .mockResolvedValueOnce(ok({ batch_id: "b1", counts: {} }))
    .mockResolvedValueOnce(answer);
  mount();
  await pick();
  fireEvent.click(screen.getByTestId("imp-preview"));
  fireEvent.click(await screen.findByTestId("imp-confirm"));
  fireEvent.click(await screen.findByTestId("imp-undo"));
  await screen.findByTestId("imp-error");
}

const reasonLine = () => screen.queryByTestId("imp-error-reason")?.textContent ?? null;

beforeEach(() => {
  callRoute.mockReset();
  track.mockClear();
  document.body.innerHTML = "";
});

describe("import undo gone codes (INC-1350)", () => {
  it("UFG-4 a refused undo's parentMissing reads as gone", async () => {
    await undoWith(refused(404, "parentMissing"));
    expect(reasonLine()).toBe(`Reason: ${en["failure.gone"]}`);
  });

  it("UFG-5 a refused undo's unknownCountry reads as gone", async () => {
    await undoWith(refused(404, "unknownCountry"));
    expect(reasonLine()).toBe(`Reason: ${en["failure.gone"]}`);
  });
});
