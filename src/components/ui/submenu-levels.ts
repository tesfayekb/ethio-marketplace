import type { NavItem } from "@/config/panels.types";

import type { SubmenuLevel } from "./submenu-impl";

/**
 * DEC-302 (R1d-c b) — MenuNav's side-panel rows are built here, in the on-demand sub-menu
 * layer, never on the first download. The rows are the items MenuNav already reads (DEC-288,
 * K1); MenuNav hands over its own current-item rule and page rule, so nothing is copied.
 */
export type NavLevelRules = {
  label: (item: NavItem) => string;
  isCurrent: (item: NavItem) => boolean;
  holdsCurrent: (item: NavItem) => boolean;
  opensPanel: (item: NavItem) => boolean;
  pageOf: (item: NavItem) => NavItem | undefined;
};
export function navLevelOf(
  items: NavItem[],
  id: string,
  rules: NavLevelRules,
): SubmenuLevel | null {
  const find = (list: NavItem[]): NavItem | undefined => {
    for (const item of list) {
      if (item.id === id) return item;
      const inner = item.children ? find(item.children) : undefined;
      if (inner) return inner;
    }
    return undefined;
  };
  const opened = find(items);
  if (!opened?.children?.length) return null;
  return {
    header: rules.label(opened),
    items: opened.children.map((child) => ({
      key: child.id,
      label: rules.label(child),
      testid: child.testid ?? `rail-item-${child.id}`,
      icon: child.icon,
      to: rules.pageOf(child)?.path ?? "/",
      active: rules.isCurrent(child),
      ancestorActive: !rules.isCurrent(child) && rules.holdsCurrent(child),
      hasChildren: rules.opensPanel(child),
    })),
  };
}
