import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { enAdmin } from "@/i18n/locales/en-admin";

/**
 * L1 import-reason-words (IRW-1…7) — a refused commit or undo names its reason
 * from the shared dialog's one set of words; a code with its own error line
 * draws no reason line; any other code draws as data.
 */

const words = enAdmin as unknown as Record<string, string>;
const t = (key: string): string =>
  key.endsWith(".error.reason") ? "Reason: {reason}" : (words[key] ?? `T(${key})`);

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t, has: (key: string) => key in words }),
}));

const callRoute = vi.fn();
vi.mock("@/lib/route-client", () => ({ callRoute: (...args: unknown[]) => callRoute(...args) }));

vi.mock("@/features/auth/mfa/mfa-service", () => ({ stepUpAbortKey: () => undefined }));

vi.mock("@/features/admin-categories/category-dialogs", () => ({
  CategoryModal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
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
  document.body.innerHTML = "";
});

describe("import dialog reason words (L1)", () => {
  it("IRW-1 a refused commit's planHasRefusals draws its words", async () => {
    await commitWith(refused(400, "planHasRefusals"));
    expect(reasonLine()).toBe(
      "Reason: The file still has refused rows. Fix them and preview again.",
    );
  });

  it("IRW-2 a refused undo's batchAlreadyUndone draws its words", async () => {
    await undoWith(refused(409, "batchAlreadyUndone"));
    expect(reasonLine()).toBe("Reason: That import has already been undone.");
  });

  it("IRW-3 undoBlocked with detail hasRows draws its words, never the detail", async () => {
    await undoWith(refused(409, "undoBlocked", "hasRows"));
    expect(reasonLine()).toBe(
      "Reason: This import can no longer be undone: something added since depends on what it created.",
    );
    expect(reasonLine()).not.toContain("hasRows");
  });

  it("IRW-4 a refused undo's unknownBatch draws its words", async () => {
    await undoWith(refused(404, "unknownBatch"));
    expect(reasonLine()).toBe("Reason: That import is no longer on record.");
  });

  it.each([
    ["denied", 403, "planHasRefusals", "error.denied"],
    ["step-up", 428, "stepUpRequired", "error.stepUp"],
    ["wrong file", 400, "wrongFile", "error.wrongFile"],
    ["file changed", 409, "fileChanged", "error.fileChanged"],
    ["busy (code)", 409, "importRunning", "error.busy"],
    ["busy (literal)", 409, "import already running", "error.busy"],
    ["too large (status)", 413, "payloadTooLarge", "error.tooLarge"],
    ["too large (code)", 400, "fileTooLarge", "error.tooLarge"],
    ["too many rows", 400, "tooManyRows", "error.tooManyRows"],
    ["bad header", 400, "badHeader", "error.badHeader"],
    ["empty file", 400, "emptyFile", "error.emptyFile"],
  ])("IRW-5 %s draws its own error line and no reason line", async (_, status, code, line) => {
    await commitWith(refused(status, code));
    expect(screen.getByTestId("imp-error").textContent).toBe(`T(admin.test.import.${line})`);
    expect(reasonLine()).toBeNull();
  });

  it("IRW-6 an unknown code draws as data: the code, a dash, its detail", async () => {
    await commitWith(refused(500, "somethingOdd", "x1"));
    expect(screen.getByTestId("imp-error").textContent).toBe("T(admin.test.import.error.failed)");
    expect(reasonLine()).toBe("Reason: somethingOdd — x1");
  });

  it("IRW-7 a dialog's own refusals win for their codes", async () => {
    await commitWith(refused(400, "planHasRefusals"), {
      words: { planHasRefusals: "admin.import.reason.unknownBatch" as never },
    });
    expect(reasonLine()).toBe("Reason: That import is no longer on record.");
  });
});
