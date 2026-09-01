import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

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
      // DEC-025 — TYPED CLIENTS. An untyped `createClient` types every table,
      // column and RPC argument as `any`, which is exactly what let the
      // misspelled RPC argument `_user_id` compile and ship (INC-096d).
      // Selector censused against the installed @typescript-eslint parser:
      // the generic list hangs off `typeArguments` (v6+ name), so a call with
      // no type argument is the `:not([typeArguments])` case.
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.name='createClient']:not([typeArguments])",
          message:
            "DEC-025: pass the generated schema — createClient<Database>(…). An untyped client makes every table, column and RPC argument `any`.",
        },
      ],
    },
  },
  {
    // DEC-027 — SPEC LINT. Three failure classes the e2e suite paid for more
    // than once; each is cheaper to catch here than in a CI run.
    files: ["e2e/**/*.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
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
    },
  },
  eslintPluginPrettier,
);
