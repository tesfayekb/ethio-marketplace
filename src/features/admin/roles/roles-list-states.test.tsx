import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { readFailed } from "@/lib/reader-failure";

import type { RoleSummary } from "./roles-service";

const mocks = vi.hoisted(() => ({
  list: vi.fn(),
  create: vi.fn(),
  guard: vi.fn(),
  may: true,
  navigate: vi.fn(),
}));

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => key, language: "en", has: () => true }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mocks.navigate,
  useRouterState: ({ select }: { select: (s: { location: { href: string } }) => string }) =>
    select({ location: { href: "/admin/roles" } }),
  Link: ({
    to,
    params,
    children,
    search: _search,
    ...rest
  }: {
    to: string;
    params?: Record<string, string>;
    search?: unknown;
    children: ReactNode;
  }) => (
    <a href={params ? to.replace("$roleId", params["roleId"] ?? "") : to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => children(mocks.guard),
}));
vi.mock("@/features/permissions/use-may-call", () => ({
  useMayCall: () => ({ mayCall: () => mocks.may }),
}));
vi.mock("./roles-service", async (original) => ({
  ...(await original<typeof import("./roles-service")>()),
  listRolesDetailed: mocks.list,
  createRole: mocks.create,
}));

import { AdminRolesList } from "./roles-list";

const role = (name: string, over: Partial<RoleSummary> = {}): RoleSummary => ({
  id: `id-${name}`,
  name,
  displayName: `${name} display`,
  description: null,
  isSystem: false,
  memberCount: 3,
  permissionCount: 7,
  ...over,
});
const coded = (code: string) => Object.assign(new Error(code), { code: "P0D01" });

function draw() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <AdminRolesList />
    </QueryClientProvider>,
  );
}

describe("the roles list's rows (UF-2)", () => {
  beforeEach(() => {
    mocks.list.mockReset();
    mocks.create.mockReset();
    mocks.guard.mockReset();
    mocks.navigate.mockReset();
    mocks.may = true;
    localStorage.clear();
  });
  afterEach(cleanup);

  it("UFA-25 heading, search, Columns and rows with each role's facts and its link uf:A9.1", async () => {
    mocks.list.mockResolvedValue([role("editor"), role("viewer", { isSystem: true })]);
    draw();
    expect(await screen.findByTestId("role-row-editor")).toBeTruthy();
    expect(screen.getAllByText("admin.roles.title").length).toBeGreaterThan(0);
    expect(screen.getByTestId("role-columns")).toBeTruthy();
    const row = screen.getByTestId("role-row-editor");
    expect(row.textContent).toContain("editor display");
    expect(row.textContent).toContain("admin.roles.kind.custom");
    expect(screen.getByTestId("role-row-viewer").textContent).toContain("admin.roles.kind.system");
    const links = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href") === "/admin/roles/id-editor");
    expect(links.length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("role-actions-editor-more")[0]).toBeTruthy();
    expect(screen.getByTestId("role-pagination")).toBeTruthy();
    fireEvent.change(screen.getByRole("textbox", { name: "admin.roles.searchLabel" }), {
      target: { value: "view" },
    });
    expect(screen.queryByTestId("role-row-editor")).toBeNull();
    expect(screen.getByTestId("role-row-viewer")).toBeTruthy();
    expect(mocks.navigate).not.toHaveBeenCalled();
  });

  it("UFA-26 Create asks the step-up before the door; cancel closes; a refusal shows its words uf:A9.2", async () => {
    mocks.list.mockResolvedValue([role("editor")]);
    const order: string[] = [];
    mocks.guard.mockImplementation(async (run: () => Promise<void>) => {
      order.push("step-up");
      return run();
    });
    mocks.create.mockImplementation(async () => {
      order.push("door");
      throw coded("duplicateKey");
    });
    draw();
    await screen.findByTestId("role-row-editor");
    fireEvent.click(screen.getByTestId("role-create-open"));
    fireEvent.change(screen.getByTestId("role-create-name"), { target: { value: "auditor" } });
    fireEvent.change(screen.getByTestId("role-create-display"), { target: { value: "Auditor" } });
    fireEvent.click(screen.getByRole("button", { name: "admin.roles.create.submit" }));
    expect((await screen.findByTestId("role-create-error")).textContent).toBe(
      "admin.roles.error.nameTaken",
    );
    expect(order).toEqual(["step-up", "door"]);
    expect(mocks.create).toHaveBeenCalledWith({
      name: "auditor",
      displayName: "Auditor",
      description: "",
    });
    fireEvent.click(screen.getByRole("button", { name: "admin.roles.create.cancel" }));
    expect(screen.queryByTestId("role-create-form")).toBeNull();
  });

  it("UFA-26b a step-up that aborts never calls the door, and without the permission there is no Create uf:A9.2", async () => {
    mocks.list.mockResolvedValue([role("editor")]);
    mocks.guard.mockRejectedValue(Object.assign(new Error("cancel"), { name: "StepUpCancelled" }));
    draw();
    await screen.findByTestId("role-row-editor");
    fireEvent.click(screen.getByTestId("role-create-open"));
    fireEvent.change(screen.getByTestId("role-create-name"), { target: { value: "auditor" } });
    fireEvent.click(screen.getByRole("button", { name: "admin.roles.create.submit" }));
    await waitFor(() => expect(mocks.guard).toHaveBeenCalledTimes(1));
    expect(mocks.create).not.toHaveBeenCalled();
    expect(screen.queryByTestId("role-create-error")).toBeNull();
    cleanup();
    mocks.may = false;
    draw();
    await screen.findByTestId("role-row-editor");
    expect(screen.queryByTestId("role-create-open")).toBeNull();
  });

  it("UFA-27 loading, then empty, then no match uf:A9.3", async () => {
    let answer: (rows: RoleSummary[]) => void = () => undefined;
    mocks.list.mockReturnValueOnce(new Promise<RoleSummary[]>((r) => (answer = r)));
    draw();
    expect((await screen.findByRole("status")).textContent).toBe("admin.roles.loading");
    answer([]);
    expect(await screen.findByText("admin.roles.empty")).toBeTruthy();
    cleanup();
    mocks.list.mockResolvedValue([role("editor")]);
    draw();
    await screen.findByTestId("role-row-editor");
    fireEvent.change(screen.getByTestId("role-search"), { target: { value: "zzz" } });
    expect(screen.getByText("admin.roles.noMatch")).toBeTruthy();
  });

  it("UFA-27a a failed read draws the notice with its subject and a Retry that reads again uf:A9.3", async () => {
    mocks.list.mockRejectedValueOnce(readFailed(new Error("boom"), 503));
    mocks.list.mockResolvedValueOnce([role("editor")]);
    draw();
    const notice = await screen.findByTestId("data-table-error");
    expect(notice.textContent).toContain("admin.roles.error");
    expect(notice.textContent).toContain("failure.server");
    fireEvent.click(screen.getByTestId("data-table-error-retry"));
    expect(await screen.findByTestId("role-row-editor")).toBeTruthy();
    expect(mocks.list).toHaveBeenCalledTimes(2);
  });

  it("UFA-27r INC-1347 a refused read says it was refused, not that it failed uf:A9.3", async () => {
    mocks.list.mockRejectedValue(readFailed(new Error("denied"), 403));
    draw();
    const notice = await screen.findByTestId("data-table-error");
    await waitFor(() => expect(notice.textContent).toContain("failure.noAccess"));
    expect(notice.textContent).not.toContain("failure.server");
    expect(screen.queryByTestId("data-table-error-retry")).toBeNull();
  });
});
