import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageCard } from "@/components/shell/page-card";
import { useI18n } from "@/i18n";

import type { AdminUserRow } from "./admin-users-service";
import { useAdminRoles, useAdminUsers, useDebounced } from "./use-admin-users";

const PAGE_SIZE = 25;

function StatusBadge({ status }: { status: string }) {
  const { t } = useI18n();
  return (
    <Badge
      data-testid="user-status"
      variant={status === "deactivated" ? "destructive" : "secondary"}
    >
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
        <Badge key={role} variant="outline" data-testid={`role-chip-${role}`}>
          {role}
        </Badge>
      ))}
    </span>
  );
}

/** 360-first: cards on phones, a table from md up. */
export function AdminUsersList() {
  const { t, language } = useI18n();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
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
    dateStyle: "medium",
  });

  const selectClass =
    "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground";

  return (
    <div data-testid="admin-users" className="space-y-4">
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
                setPage(0);
                setRole(event.target.value);
              }}
            >
              <option value="all">{t("admin.users.filter.all")}</option>
              {(roles.data ?? []).map((item) => (
                <option key={item.name} value={item.name}>
                  {item.displayName ?? item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </PageCard>

      {isLoading ? (
        <PageCard>
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {t("admin.users.loading")}
          </p>
        </PageCard>
      ) : error ? (
        <PageCard data-testid="users-error">
          <p role="alert" className="text-sm text-destructive">
            {t("admin.users.error")}
          </p>
        </PageCard>
      ) : users.length === 0 ? (
        <PageCard data-testid="users-empty">
          <p className="text-sm text-muted-foreground">{t("admin.users.empty")}</p>
        </PageCard>
      ) : (
        <PageCard className="p-0">
          {/* 360: stacked cards */}
          <ul className="divide-y divide-border md:hidden">
            {users.map((user) => (
              <li key={user.userId} className="p-4">
                <UserRowLink user={user} dateLabel={dateFmt.format(new Date(user.createdAt))} />
              </li>
            ))}
          </ul>

          {/* md+: table */}
          <table className="hidden w-full text-start text-sm md:table">
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                <th className="p-3 text-start font-medium">{t("admin.users.col.name")}</th>
                <th className="p-3 text-start font-medium">{t("admin.users.col.email")}</th>
                <th className="p-3 text-start font-medium">{t("admin.users.col.country")}</th>
                <th className="p-3 text-start font-medium">{t("admin.users.col.status")}</th>
                <th className="p-3 text-start font-medium">{t("admin.users.col.roles")}</th>
                <th className="p-3 text-start font-medium">{t("admin.users.col.joined")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.userId}
                  data-testid={`user-row-${user.userId}`}
                  className="border-b border-border last:border-0"
                >
                  <td className="p-3">
                    <Link
                      to="/admin/users/$userId"
                      params={{ userId: user.userId }}
                      className="font-medium text-foreground underline underline-offset-4"
                    >
                      {user.displayName}
                    </Link>
                  </td>
                  <td className="p-3 text-muted-foreground">{user.email}</td>
                  <td className="p-3 text-muted-foreground">{user.homeCountryCode ?? "—"}</td>
                  <td className="p-3">
                    <StatusBadge status={user.accountStatus} />
                  </td>
                  <td className="p-3">
                    <RoleChips roles={user.roles} />
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {dateFmt.format(new Date(user.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PageCard>
      )}

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
    </div>
  );
}

function UserRowLink({ user, dateLabel }: { user: AdminUserRow; dateLabel: string }) {
  const { t } = useI18n();
  return (
    <Link
      to="/admin/users/$userId"
      params={{ userId: user.userId }}
      data-testid={`user-row-${user.userId}`}
      className="block min-h-11 space-y-1"
    >
      <span className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-foreground">{user.displayName}</span>
        <StatusBadge status={user.accountStatus} />
      </span>
      <span className="block text-sm text-muted-foreground">{user.email}</span>
      <span className="block text-xs text-muted-foreground">
        {(user.homeCountryCode ?? "—") + " · " + dateLabel}
      </span>
      <RoleChips roles={user.roles} />
      <span className="sr-only">{t("admin.users.openDetail")}</span>
    </Link>
  );
}

export default AdminUsersList;
