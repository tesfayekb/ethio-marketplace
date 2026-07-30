# Phase 1 — Identity deny-proofs (D1–D7)

Purpose: prove that the identity schema (`public.user_directory`, `public.profiles`) and the two
`SECURITY DEFINER` functions deny everything they are supposed to deny, from a real signed-in
browser session — not from a privileged SQL tool.

## How to rerun

1. Two auto-confirmed test users must exist in Supabase Auth (created by the operator in the
   dashboard). Current fixtures: `deny-a@denytest.example.com`, `deny-b@denytest.example.com`,
   shared password held by the operator (never committed).
2. Open the preview app (any page — the placeholder page loads the Supabase client) and open the
   browser console.
3. Get the client:
   ```js
   const { supabase } = await import("/src/integrations/supabase/client.ts");
   ```
4. Setup:
   ```js
   await supabase.auth.signInWithPassword({
     email: "deny-a@denytest.example.com",
     password: "<pw>",
   });
   const A = (await supabase.auth.getUser()).data.user.id;
   await supabase.auth.signOut();
   await supabase.auth.signInWithPassword({
     email: "deny-b@denytest.example.com",
     password: "<pw>",
   });
   const B = (await supabase.auth.getUser()).data.user.id;
   ```
5. Run D1–D7 below in order as B. D5 mutates state (`country_source` becomes `user_confirmed`),
   so a full rerun needs fresh test users — or accept that D5's first call will fail with
   `country already confirmed` on a reused fixture.

## Run of 2026-07-30

A id = `78e789f8-4c80-4490-9d68-15d3ce95899d`
B id = `7c0da410-6fe3-40da-8890-6759b69a7caa`

### D1 — profiles select returns only the caller's row

```js
await supabase.from("profiles").select("*");
```

```json
{
  "status": 200,
  "error": null,
  "data": [
    {
      "user_id": "7c0da410-6fe3-40da-8890-6759b69a7caa",
      "home_country_code": "US",
      "country_source": "ip_guess",
      "display_name": "deny-b",
      "avatar_url": null,
      "preferred_language": "en",
      "viewing_location": null,
      "notification_prefs": {},
      "contact_prefs": {},
      "created_at": "2026-07-30T02:10:19.935818+00:00",
      "updated_at": "2026-07-30T02:10:19.935818+00:00"
    }
  ]
}
```

PASS — 1 row, B's own. A's profile is invisible.

### D2 — user_directory select returns only the caller's row

```js
await supabase.from("user_directory").select("*");
```

```json
{
  "status": 200,
  "error": null,
  "data": [
    {
      "user_id": "7c0da410-6fe3-40da-8890-6759b69a7caa",
      "home_country_code": "US",
      "country_source": "ip_guess",
      "handle": null,
      "account_status": "active",
      "created_at": "2026-07-30T02:10:19.935818+00:00"
    }
  ]
}
```

PASS — 1 row, B's own.

### D3 — B cannot update A's profile

```js
await supabase.from("profiles").update({ display_name: "hacked" }).eq("user_id", A).select();
```

```json
{ "status": 200, "error": null, "data": [] }
```

PASS — 0 rows affected. RLS `USING (auth.uid() = user_id)` filtered A's row out of the update
target set; no error is raised because nothing matched, and nothing was written.

### D4 — B cannot update a column outside the writable set (column-grant proof)

```js
await supabase.from("profiles").update({ home_country_code: "ET" }).eq("user_id", B).select();
```

```json
{
  "status": 403,
  "data": null,
  "error": {
    "code": "42501",
    "message": "permission denied for table profiles",
    "hint": "Grant the required privileges to the current role with: GRANT UPDATE ON public.profiles TO authenticated;"
  }
}
```

PASS — `authenticated` holds UPDATE only on the seven self-editable columns, so an UPDATE naming
`home_country_code` is rejected at the grant layer, before RLS is even consulted.

### D5 — confirm_home_country succeeds once, then refuses

```js
await supabase.rpc("confirm_home_country", { p_country: "ET" }); // first call
```

```json
{ "status": 204, "error": null, "data": null }
```

```js
await supabase.rpc("confirm_home_country", { p_country: "ET" }); // second call
```

```json
{
  "status": 400,
  "data": null,
  "error": { "code": "P0001", "message": "country already confirmed" }
}
```

PASS — one-shot semantics hold; the function only updates rows still at `country_source = 'ip_guess'`.

### D6 — B cannot update user_directory at all

```js
await supabase
  .from("user_directory")
  .update({ account_status: "active" })
  .eq("user_id", B)
  .select();
```

```json
{
  "status": 403,
  "data": null,
  "error": {
    "code": "42501",
    "message": "permission denied for table user_directory",
    "hint": "Grant the required privileges to the current role with: GRANT UPDATE ON public.user_directory TO authenticated;"
  }
}
```

PASS — `user_directory` grants SELECT only; it is system-owned, never user-writable.

### D7 — signed-out callers cannot invoke confirm_home_country (anon revoke proof)

```js
await supabase.auth.signOut();
await supabase.rpc("confirm_home_country", { p_country: "ET" });
```

```json
{
  "status": 401,
  "data": null,
  "error": {
    "code": "42501",
    "message": "permission denied for function confirm_home_country"
  }
}
```

PASS — after the hardening migration, `anon` has no EXECUTE. The request is refused at the
privilege layer, not by the function's internal `auth.uid() IS NULL` check.

### State read-back (via read-only SQL tool)

```sql
SELECT user_id, home_country_code, country_source FROM public.user_directory ORDER BY created_at;
```

```
78e789f8-4c80-4490-9d68-15d3ce95899d | US | ip_guess         -- A, untouched
7c0da410-6fe3-40da-8890-6759b69a7caa | ET | user_confirmed   -- B, after D5
```

### Function ACL read-back

```sql
SELECT proname, proacl FROM pg_proc WHERE proname IN ('handle_new_user','confirm_home_country');
```

```
confirm_home_country | {postgres=X/postgres,authenticated=X/postgres}
handle_new_user      | {postgres=X/postgres}
```

Result: 7 of 7 deny-proofs PASS.
