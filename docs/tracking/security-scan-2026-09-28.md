# Security-scan census — 2026-09-28 (read-only)

Source: the platform's Supabase database linter, run against ethio-prod on 2026-09-28 (165 findings, 4 classes). Example object names come from a read-only catalog query (`pg_proc.prosecdef` + `has_function_privilege`, `pg_extension`). This census fixes nothing and ships no migration.

| Class                                                 | Level | Count | First three examples                                                                                 | Remediation                                                                                                            |
| ----------------------------------------------------- | ----- | ----- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Signed-In Users Can Execute SECURITY DEFINER Function | WARN  | 149   | `admin_accept_category_image`, `admin_add_category_pointer`, `admin_approve_all_entity_translations` | https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable |
| Public Can Execute SECURITY DEFINER Function          | WARN  | 14    | `catalog_find`, `catalog_find_version`, `get_attribute_options`                                      | https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable          |
| Extension in Public                                   | WARN  | 1     | `pg_trgm`                                                                                            | https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public                                |
| Leaked Password Protection Disabled                   | WARN  | 1     | Auth setting (no database object)                                                                    | https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection               |

Notes (facts only):

- The linter reported none of these classes: function search_path mutable, RLS policy always-true, auth.uid() re-evaluated per row, exposed view. Their count is 0 in this scan.
- The 14 anon-executable definers are the public read doors: `catalog_find`, `catalog_find_version`, `get_attribute_options`, `get_attribute_options_version`, `get_browse_tree`, `get_category_attributes`, `get_category_tree_version`, `get_entity_bundle`, `get_location_tree`, `get_location_tree_version`, `get_open_countries`, `get_posting_schema`, `get_ui_bundle`, `get_ui_bundle_version`.
- The 149 authenticated-executable count includes those 14 public doors. Knowledge E7 (client reads go only through gated SECURITY DEFINER RPCs) and the E2 closers (`GRANT EXECUTE … TO authenticated`) create this class on purpose. Each function checks its own permission gate. The linter can't see that gate.
