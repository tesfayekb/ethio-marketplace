import { createElement, type ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";

import { PanelTestContext } from "./dialog-parts-test-context";

/** Preserve consumer providers and rerenders while supplying the real anatomy's context. */
export function renderPanel(ui: ReactNode, options?: RenderOptions) {
  const Outer = options?.wrapper;
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(PanelTestContext, {
      children: Outer ? createElement(Outer, null, children) : children,
    });
  return render(ui, { ...options, wrapper: Wrapper });
}
