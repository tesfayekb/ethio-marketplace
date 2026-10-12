import { useNavigate, useSearch } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { useI18n } from "@/i18n";

import type { AdminUserRow } from "./admin-users-service";
import { useAdminRoles, useAdminUsers, useDebounced } from "./use-admin-users";

const TABLE_ID = "admin-users";
const LOCKED = ["name"];
const PAGE_SIZE_STORAGE_KEY = "ethio.admin.users.pageSize";

function StatusBadge({ status }: { status: string }) {
  const { t } = useI18n();
  return (
    // Bundle 11 G2a (D132) — the soft pills: a live state green, a stopped one red.
    <Badge variant={status === "deactivated" ? "danger" : "success"}>
      {status === "deactivated"
        ? t("admin.users.status.deactivated")
        : t("admin.users.status.active")}
    </Badge>
  );
}

function RoleChips({ roles }: { roles: string[] }) {
  return (
    <span className="flex flex-wrap gap-1">
      {roles.map((role) => (
        <Badge key={role} variant="neutral">
          {role}
        </Badge>
      ))}
    </span>
  );
}

/**
 * U1b — 360-first through the shared DataTable primitive (INC-075).
 * Column priority does the responsive work; nothing here may overflow
 * horizontally at 360 / 768 / 1280.
 *
 * Bundle 11 G2a (D118, D128, D132) — on the agreed blocks and the agreed look:
 * the page's heading in the header (TableActions; the page has no header
 * action — accounts are opened by their owners, and changed on their own page);
 * the toolbar (search · Filters with the status and the role as pills · Columns,
 * the chips under it); one card per user below md (the name, the email under
 * it, country, roles and joined as facts, the status pill at the end); the
 * footer's range, page size (kept in this browser) and pages. The whole row
 * opens the user's page, so the row carries no action buttons. The server
 * pages the roster (INC-073: the role lives in the URL).
 *
 * G2b — the cards give way to the table at md, as before G2a: the table law
 * (e2e/shell-table-law.spec.ts) holds this list's table at 768 px.
 */
export function AdminUsersList() {
  const { t, language } = useI18n();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  // INC-073 law: the role filter is URL-derived — the URL is its only source
  // of truth, so a deep link and an in-page change are the same state.
  const navigate = useNavigate();
  const { role: roleParam } = useSearch({ from: "/admin/users" });
  const role = roleParam ?? "";
  // Bundle 11 C1 — the page and its size kept in this browser, one hook for every table.
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } =
    useKeptPage(PAGE_SIZE_STORAGE_KEY);
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);
  const debouncedSearch = useDebounced(search);

  const { data, isLoading, error } = useAdminUsers({
    search: debouncedSearch,
    status: status === "" ? "all" : status,
    role: role === "" ? "all" : role,
    limit: pageSize,
    offset: page * pageSize,
  });
  const roles = useAdminRoles();

  // U4g-13 (INC-106, INC-073 extended): the URL role is a first-class choice
  // even before the roster resolves — labelled from the roster once it loads,
  // by its raw name until then.
  const roleOptions: { name: string; label: string }[] = (roles.data ?? []).map((item) => ({
    name: item.name,
    label: item.displayName ?? item.name,
  }));
  if (role !== "" && !roleOptions.some((item) => item.name === role)) {
    roleOptions.unshift({ name: role, label: role });
  }
  const roleLabel = roleOptions.find((item) => item.name === role)?.label ?? role;

  const users = data?.users ?? [];
  const total = data?.totalCount ?? 0;
  const dateFmt = new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-GB", {
    // Short format keeps the detail column narrow (no-overflow law).
    dateStyle: "short",
  });

  const setRole = (next: string) => {
    setPage(0);
    void navigate({
      to: "/admin/users",
      search: next === "" ? {} : { role: next },
      replace: true,
    });
  };
  const setStatusFilter = (next: string) => {
    setPage(0);
    setStatus(next);
  };
  const allColumns: DataTableColumn<AdminUserRow>[] = [
    {
      key: "name",
      header: t("admin.users.col.name"),
      priority: "primary",
      width: "w-[22%]",
      card: "title",
      cell: (user) => (
        <span className="block truncate font-medium text-foreground" title={user.displayName}>
          {user.displayName}
        </span>
      ),
    },
    {
      key: "email",
      header: t("admin.users.col.email"),
      priority: "primary",
      width: "w-[30%]",
      card: "sub",
      cell: (user) => (
        // Emails wrap at the @ rather than stretching the column.
        <span className="block break-all text-muted-foreground" title={user.email}>
          {user.email}
        </span>
      ),
    },
    {
      key: "country",
      header: t("admin.users.col.country"),
      priority: "secondary",
      width: "w-[10%]",
      card: "meta",
      cell: (user) => (
        <span className="block text-muted-foreground">{user.homeCountryCode ?? "—"}</span>
      ),
    },
    {
      key: "status",
      header: t("admin.users.col.status"),
      priority: "secondary",
      width: "w-[14%]",
      card: "badge",
      cell: (user) => <StatusBadge status={user.accountStatus} />,
    },
    {
      key: "roles",
      header: t("admin.users.col.roles"),
      priority: "secondary",
      width: "w-[16%]",
      card: "meta",
      // A user with no role has no roles fact on the card.
      cardCell: (user) => (user.roles.length > 0 ? <RoleChips roles={user.roles} /> : null),
      cell: (user) => <RoleChips roles={user.roles} />,
    },
    {
      key: "joined",
      header: t("admin.users.col.joined"),
      priority: "detail",
      width: "w-[12%]",
      card: "meta",
      cell: (user) => (
        <span className="block text-muted-foreground">
          {dateFmt.format(new Date(user.createdAt))}
        </span>
      ),
    },
  ];
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  const chips = [
    ...(status === ""
      ? []
      : [
          {
            key: "status",
            label:
              status === "deactivated"
                ? t("admin.users.status.deactivated")
                : t("admin.users.status.active"),
            onRemove: () => setStatusFilter(""),
          },
        ]),
    ...(role === ""
      ? []
      : [
          {
            key: "role",
            label: roleLabel,
            onRemove: () => setRole(""),
          },
        ]),
  ];
  const clearAll = () => {
    setStatus("");
    setRole("");
  };

  return (
    <div data-testid="admin-users" className="min-w-0 space-y-4">
      <TableActions testid="users-header" title={t("admin.users.title")} />

      <DataTable<AdminUserRow>
        columns={columns}
        rows={users}
        rowKey={(user) => user.userId}
        rowTestId={(user) => `user-row-${user.userId}`}
        rowHref={(user) => ({
          to: "/admin/users/$userId",
          params: { userId: user.userId },
        })}
        caption={t("admin.users.title")}
        cardLead={() => <UserRound />}
        loading={isLoading}
        loadingState={
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {t("admin.users.loading")}
          </p>
        }
        error={error}
        errorState={
          <p role="alert" className="text-sm text-destructive">
            {t("admin.users.error")}
          </p>
        }
        emptyState={<p className="text-sm text-muted-foreground">{t("admin.users.empty")}</p>}
        toolbar={
          <TableToolbar
            testid="users-toolbar"
            search={
              <Input
                id="admin-users-search"
                data-testid="users-search"
                aria-label={t("admin.users.searchLabel")}
                value={search}
                placeholder={t("admin.users.searchPlaceholder")}
                onChange={(event) => {
                  setPage(0);
                  setSearch(event.target.value);
                }}
              />
            }
            filters={
              <FiltersButton
                testid="users-filters"
                count={chips.length}
                state={`${status}|${role}`}
                resultCount={total}
                onClearAll={clearAll}
              >
                <FilterChoices
                  testid="users-status-filter"
                  label={t("admin.users.statusFilter")}
                  value={status}
                  onChange={setStatusFilter}
                  options={[
                    { value: "", label: t("admin.users.filter.all") },
                    { value: "active", label: t("admin.users.status.active") },
                    { value: "deactivated", label: t("admin.users.status.deactivated") },
                  ]}
                />
                <FilterChoices
                  testid="users-role-filter"
                  label={t("admin.users.roleFilter")}
                  value={role}
                  onChange={setRole}
                  options={[
                    { value: "", label: t("admin.users.filter.all") },
                    ...roleOptions.map((item) => ({ value: item.name, label: item.label })),
                  ]}
                />
              </FiltersButton>
            }
            columns={
              <ColumnsButton
                testid="users-columns"
                columns={allColumns.map((column) => ({
                  key: column.key,
                  label: String(column.header),
                  locked: LOCKED.includes(column.key),
                }))}
                hidden={hidden}
                onToggle={toggleColumn}
              />
            }
            chips={<FilterChips testid="users-chips" chips={chips} onClearAll={clearAll} />}
          />
        }
        pagination={
          <DataTablePagination
            testid="users-pagination"
            offset={page * pageSize}
            pageSize={pageSize}
            total={total}
            onPrevious={() => setPage((current) => Math.max(0, current - 1))}
            onNext={() => setPage((current) => current + 1)}
            onPage={setPage}
            pageSizeOptions={pageSizeOptions}
            onPageSize={setPageSize}
          />
        }
      />
    </div>
  );
}

export default AdminUsersList;
