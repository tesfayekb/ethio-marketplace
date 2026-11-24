import { Link, useRouterState } from "@tanstack/react-router";
import type { ComponentPropsWithRef } from "react";

import { signInReturn } from "./sign-in-return";

/**
 * D11 (DEC-464) — THE ONE SIGN IN LINK. It reads the page the person is on itself and carries it
 * as `return`, so sign-in brings them back there; on the sign-in page it carries nothing. The
 * header, the bottom bar and the failure notice draw it; a menu file never reads the location.
 */
export function SignInLink(props: Omit<ComponentPropsWithRef<"a">, "href">) {
  const here = useRouterState({ select: (state) => state.location.href });
  return <Link to="/auth" search={signInReturn(here)} {...props} />;
}
