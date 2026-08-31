import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, type DataTableColumn } from "@/components/shell/data-table";
import { PageCard } from "@/components/shell/page-card";
import { useI18n } from "@/i18n";

import type { AdminUserRow } from "./admin-users-service";
import { useAdminRoles, useAdminUsers, useDebounced } from "./use-admin-users";

const PAGE_SIZE = 25;

function StatusBadge({ status }: { status: string }) {
  const { t } = useI18n();
  return (
    <Badge variant={status === "deactivated" ? "destructive" : "secondary"}>
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
        <Badge key={role} variant="outline">
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
 */
export function AdminUsersList() {
  const { t, language } = useI18n();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  // INC-073 law: the role filter is URL-derived — the URL is its only source
  // of truth, so a deep link and an in-page change are the same state.
  const navigate = useNavigate();
  const { role: roleParam } = useSearch({ from: "/admin/users" });
  const role = roleParam ?? "all";
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebounced(search);

  const { data, isLoading, error } = useAdminUsers({
    search: debouncedSearch,
    status,
    role,
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  });
  const roles = useAdminRoles();

  const users = data?.users ?? [];
  const total = data?.totalCount ?? 0;
  const dateFmt = new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-GB", {
    // Short format keeps the detail column narrow (no-overflow law).
    dateStyle: "short",
  });

  const selectClass =
    "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground";

  const columns: DataTableColumn<AdminUserRow>[] = [
    {
      key: "name",
      header: t("admin.users.col.name"),
      priority: "primary",
      width: "w-[22%]",
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
      cell: (user) => (
        <span className="block text-muted-foreground">{user.homeCountryCode ?? "—"}</span>
      ),
    },
    {
      key: "status",
      header: t("admin.users.col.status"),
      priority: "secondary",
      width: "w-[14%]",
      cell: (user) => <StatusBadge status={user.accountStatus} />,
    },
    {
      key: "roles",
      header: t("admin.users.col.roles"),
      priority: "secondary",
      width: "w-[16%]",
      cell: (user) => <RoleChips roles={user.roles} />,
    },
    {
      key: "joined",
      header: t("admin.users.col.joined"),
      priority: "detail",
      width: "w-[12%]",
      cell: (user) => (
        <span className="block text-muted-foreground">
          {dateFmt.format(new Date(user.createdAt))}
        </span>
      ),
    },
  ];

  return (
    <div data-testid="admin-users" className="min-w-0 space-y-4">
      <PageCard className="space-y-3">
        <label className="block text-sm font-medium text-foreground" htmlFor="admin-users-search">
          {t("admin.users.searchLabel")}
        </label>
        <Input
          id="admin-users-search"
          data-testid="users-search"
          value={search}
          placeholder={t("admin.users.searchPlaceholder")}
          onChange={(event) => {
            setPage(0);
            setSearch(event.target.value);
          }}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label
              className="block text-sm font-medium text-foreground"
              htmlFor="admin-users-status"
            >
              {t("admin.users.statusFilter")}
            </label>
            <select
              id="admin-users-status"
              data-testid="users-status-filter"
              className={`${selectClass} mt-1`}
              value={status}
              onChange={(event) => {
                setPage(0);
                setStatus(event.target.value);
              }}
            >
              <option value="all">{t("admin.users.filter.all")}</option>
              <option value="active">{t("admin.users.status.active")}</option>
              <option value="deactivated">{t("admin.users.status.deactivated")}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground" htmlFor="admin-users-role">
              {t("admin.users.roleFilter")}
            </label>
            <select
              id="admin-users-role"
              data-testid="users-role-filter"
              className={`${selectClass} mt-1`}
              value={role}
              onChange={(event) => {
                const next = event.target.value;
                setPage(0);
                void navigate({
                  to: "/admin/users",
                  search: next === "all" ? {} : { role: next },
                  replace: true,
                });
              }}
            >
              <option value="all">{t("admin.users.filter.all")}</option>
              {/*
                U4g-13 (INC-106, INC-073 extended): URL truth renders BEFORE the
                option list arrives. A controlled <select> whose value has no
                matching <option> collapses to the first one ("all"), so the URL
                role is always emitted as an option — labelled from the roster
                once it loads, by its raw name until then.
              */}
              {roleOptions.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </PageCard>

      <DataTable
        columns={columns}
        rows={users}
        rowKey={(user) => user.userId}
        rowTestId={(user) => `user-row-${user.userId}`}
        rowHref={(user) => ({
          to: "/admin/users/$userId",
          params: { userId: user.userId },
        })}
        caption={t("admin.users.title")}
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
        pagination={
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" data-testid="users-total">
              {t("admin.users.total").replace("{n}", String(total))}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="min-h-11"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
              >
                {t("admin.users.prev")}
              </Button>
              <Button
                variant="outline"
                className="min-h-11"
                disabled={(page + 1) * PAGE_SIZE >= total}
                onClick={() => setPage((p) => p + 1)}
              >
                {t("admin.users.next")}
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default AdminUsersList;
