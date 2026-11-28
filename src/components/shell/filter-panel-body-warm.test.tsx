import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";

const warm = vi.hoisted(() => vi.fn());
vi.mock("@/components/select-list-loader", () => ({
  loadSelectList: () => Promise.resolve(null),
  readySelectList: () => null,
  preloadSelectList: warm,
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));

import { FilterPanelBody } from "./filter-panel-body";

it("FP-U50 the Filters body starts its selects' open list as it mounts, once", () => {
  render(
    <FilterPanelBody
      filters={[
        {
          kind: "select",
          choices: { fixed: true },
          id: "first",
          chipKey: "first",
          name: "first",
          kept: true,
          value: [],
          multiple: true,
          onChange: vi.fn(),
          clear: vi.fn(),
          changed: vi.fn(),
          options: [{ value: "v0", label: "Choice 0" }],
        },
      ]}
      words={{ all: "All", search: "Search", none: "None", max: "Up to {n}" }}
    />,
  );
  expect(warm).toHaveBeenCalledTimes(1);
});
