import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

/**
 * Foundations turn 21 (INC-891) — ONE LIST PER LINT CONCERN. Flat config
 * REPLACES a rule's options for a file: a later block that sets
 * `no-restricted-syntax` drops every selector an earlier block gave the same
 * file. Each list below is its concern's one definition; every block composes
 * the lists its files owe, and scripts/conformance/lint-rules.test.ts
 * (CF-LINT-1…3) checks every file under src/ and e2e/ against the owed table.
 */
export const RESTRICTED_SYNTAX = {
  // DEC-025 — typed clients: every file under src/.
  typedClient: [
    {
      selector: "CallExpression[callee.name='createClient']:not([typeArguments])",
      message:
        "DEC-025: pass the generated schema — createClient<Database>(…). An untyped client makes every table, column and RPC argument `any`.",
    },
  ],
  // INC-815 — a caught error is read with errorText: every file under src/
  // except the tests and the platform's lovable-error-reporting.ts.
  caughtError: [
    {
      selector: "BinaryExpression[operator='instanceof'][right.name='Error']",
      message:
        "INC-815: a caught error may be a plain { message } object (a Supabase door's refusal), not an Error. Read it with errorText (src/lib/error-text.ts). A line that truly needs an Error instance carries an eslint-disable-next-line comment with its reason.",
    },
  ],
  // DEC-237 — the route boundary: src/routes/** and src/server/** outside the
  // block's ignores (CF-RT-5 keeps those equal to routes-allowlist.txt).
  routeBoundary: [
    {
      selector:
        "CallExpression[callee.object.name='request'][callee.property.name=/^(json|formData|arrayBuffer|text)$/]",
      message: "a route reads its body through defineRoute's schema or form",
    },
    {
      selector: "NewExpression[callee.name='Response']",
      message: "answers come from src/server/answer.ts",
    },
    {
      selector: "CallExpression[callee.name='fetch']",
      message: "outside calls go through upstream()",
    },
    {
      selector: "CallExpression[callee.name='createClient']",
      message: "clients come from user-client.ts",
    },
  ],
  // DEC-027 — spec lint: every e2e/**/*.ts.
  specLint: [
    {
      selector: "CallExpression[callee.property.name='first']",
      message: "twin helpers per J5",
    },
    {
      selector: "MemberExpression[object.name='test'][property.name='only']",
      message: "test.only never lands: it silently green-washes the whole file",
    },
    {
      selector: "CallExpression[callee.property.name='waitForTimeout']",
      message: "poll on truth, never sleep",
    },
  ],
};

export default tseslint.config(
  {
    ignores: [
      "dist",
      ".output",
      ".vinxi",
      "src/integrations/supabase/types.ts",
      "src/routeTree.gen.ts",
      // Platform-injected, regeneration-owned auth storage broker (INC-087).
      // Knowledge E5 / INC-011 machine-generated exemption: it carries the
      // "automatically generated. Do not edit it directly." banner and is
      // rewritten by the platform on every injection, so in-place formatting
      // would not survive. Exemption is scoped to this exact file.
      "src/integrations/supabase/previewAuthStorage.ts",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // DEC-025 — TYPED CLIENTS (app code). An untyped `createClient` types every
    // table, column and RPC argument as `any`, which is exactly what let the
    // misspelled RPC argument `_user_id` compile and ship (INC-096d).
    // Selector censused against the installed @typescript-eslint parser: the
    // generic list hangs off `typeArguments` (the v6+ name), so a call with no
    // type argument is the `:not([typeArguments])` case.
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...RESTRICTED_SYNTAX.typedClient,
        ...RESTRICTED_SYNTAX.caughtError,
      ],
    },
  },
  {
    // INC-815 — a later block replaces the rule for its files: tests may assert
    // on Error instances, and the platform's lovable-error-reporting.ts stays as
    // it is. These files keep the DEC-025 selector alone.
    files: ["src/**/*.test.{ts,tsx}", "src/lib/lovable-error-reporting.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...RESTRICTED_SYNTAX.typedClient],
    },
  },
  {
    // Foundations turn 2 (DEC-237) — THE ROUTE BOUNDARY. A route reads its body
    // through defineRoute's schema, answers through src/server/answer.ts, calls
    // out through upstream() and takes its clients from user-client.ts. The
    // ignore list IS scripts/conformance/routes-allowlist.txt's paths (CF-RT-5
    // checks both ways); as a wave moves its routes, both shrink in one edit.
    files: ["src/routes/**/*.{ts,tsx}", "src/server/**/*.ts"],
    ignores: [
      "src/server/route.ts",
      "src/server/answer.ts",
      "src/server/upstream.ts",
      "src/server/supabase/user-client.ts",
      "src/server/door.ts",
      "src/server/listings/own-listing.ts",
      "**/*.test.ts",
      "**/*.test.tsx",
      // ROUTES-BOUNDARY-IGNORES-BEGIN
      "src/integrations/supabase/previewAuthStorage.ts", // the platform's file (INC-087)
      // ROUTES-BOUNDARY-IGNORES-END
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...RESTRICTED_SYNTAX.typedClient,
        ...RESTRICTED_SYNTAX.caughtError,
        ...RESTRICTED_SYNTAX.routeBoundary,
      ],
    },
  },
  {
    // DEC-027 — SPEC LINT. Three failure classes the e2e suite paid for more
    // than once; each is cheaper to catch here than in a CI run.
    files: ["e2e/**/*.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...RESTRICTED_SYNTAX.specLint],
    },
  },
  eslintPluginPrettier,
);
