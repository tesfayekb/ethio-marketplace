import { Link } from "@tanstack/react-router";
import { Fragment } from "react";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { pathOf, useCategoryTree } from "@/features/categories/category-tree";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";

/** Only loaded on a public ad's page; the existing shared tree owns category paths. */
export function AdCrumbs({ title, categoryId }: { title: string; categoryId: string | null }) {
  const { tree } = useCategoryTree();
  const { entities } = useI18n();
  const path = categoryId === null ? [] : pathOf(tree, categoryId);
  return (
    <>
      {path.map((node) => (
        <Fragment key={node.id}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/c/$slug"
                params={{ slug: node.slug }}
                data-testid="breadcrumb-category-parent"
              >
                {entityName("category", node, entities)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Fragment>
      ))}
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage
          data-testid="breadcrumb-ad"
          className="min-w-0 truncate font-semibold text-foreground underline underline-offset-4"
          title={title}
        >
          {title}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}
