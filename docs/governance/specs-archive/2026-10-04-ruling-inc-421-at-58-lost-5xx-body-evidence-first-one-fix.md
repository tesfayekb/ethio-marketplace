Source: supervisor thread, turn 1294, Sun 2026-10-04 01:15 New York.
Status at 2026-10-05: ruling sent 2026-10-04 (bundle 3 walk fixes, dev 77499b09); the executor's fix was accepted in turn 1298 (one place, src/server.ts, dev 5f5fd6b7) and the walk fixes closed at dev = main = b432691b; not in the repo.
Related: INC-421, AT-58, bundle 3 walk fixes, M4b, TanStack start-server-core 1.169.39, DEC-092.

**Don't send "continue". Lovable's diagnosis is partly wrong and its fix is too narrow; send the ruling below instead.**

## What I checked (dev `77499b09`)

- **CI on `d043db42` is red for two reasons.** One was the type error I predicted, which Lovable has since fixed. The other is AT-58: the import route answers 500, but the error message never reaches the caller.
- **Lovable has also fixed** the lint error (PW-132 no longer sleeps) and the leftover casts. Those are correct.
- **"Any non-2xx body is stripped" is not what CI shows.** In the same run, tests that read the body of 400 answers pass. AT-58 is the only test that checks a 5xx answer, so the loss is on 5xx only.
- **I could not reproduce it.** I built the same commit with a probe route: every status from 400 to 503 kept its body, GET and POST. My install is not identical to Lovable's, so its build is the reference, but the loss is not a plain property of the built server.
- **The failure arrived with the security update.** AT-58 passed before it, and only the TanStack packages changed.
- **Changing one route to answer 200 would hide the cause.** 56 places in the app answer 5xx with a message. The fix has to go where the message is lost, so all of them are repaired.

## What to do

1. Paste the prompt below into Lovable. Nothing to attach. Send it.
2. When it stops with the "apply … → expect mark …" line for M4b, apply that on staging and send "continue".
3. Bring me the final report.

---
```
RULING — AT-58 (INC-421). The relay change is not accepted. Evidence first, then one fix where the body is lost.

0. First lines of your report: the six lines of ci-status.md read by curl (close-out rulings, step 0).

1. WHAT THE EVIDENCE SAYS SO FAR
   - CI run 37177765723 (d043db42): AT-58 fails on both screens with status 500 and an empty payload. In the same run IG-1 reads the bodies of 400 answers (e2e/import-security.spec.ts:350–400) and passes. So 4xx bodies arrive; the loss is on 5xx. AT-58 is the only test that asserts a 5xx.
   - AT-58 passed on the same built server before 4446e42b. Between the two lockfiles nitro, h3, h3-v2 and srvx are unchanged; only the TanStack packages moved (start-server-core 1.169.15 → 1.169.39).
   - My own build of 77499b09 (node-server preset) with a probe route returned the full JSON body for 400, 403, 409, 428, 500, 502 and 503, GET and POST. My install is not lock-exact, so yours is the reference; but the loss is not a plain property of the built server.

2. EVIDENCE OWED BEFORE ANY FIX — pasted, not described
   a. The probe matrix on your lock-exact build:e2e: statuses 200, 400, 409, 500, 502, 503 × GET and POST; for each, the status, the content-length header and the body length the client received. The same matrix with package.json and bun.lock of 3abfd1da.
   b. The file and line where the body is lost. Measure at three points: what handler.fetch returns inside src/server.ts, before normalizeCatastrophicSsrResponse; what src/server.ts returns, after it; what the client receives. Confirm or clear each suspect by measurement:
      (i) src/server.ts:46–50 reads a clone of every 5xx JSON answer;
      (ii) srvx's node adapter answers an empty 500 when sending a response fails (handleSendError), whatever status the route returned;
      (iii) start-server-core's handling of non-ok responses (request-response.js, mergeEventResponseHeaders).
   c. If the real import route loses the body while the probe keeps it, name the difference (signed-in request, cookies on the event, body size).
   d. The Cloudflare build (build:e2e:cloudflare, serve:e2e:built:cloudflare): the same probe for 500. The published site runs that preset. If your sandbox cannot run it, say so.
   The probe route and all instrumentation are removed before the commit.

3. THE FIX goes where the body is lost, once, so every route's 5xx answer keeps its body. 56 call sites answer 5xx with a body today (38 × 500, 16 × 502, 2 × 503 by my grep of src/routes and src/server). No route's status changes. If the measurement shows the framework drops 5xx bodies on purpose, stop and report: that is a contract change for all 56 sites and their screens, and it is my ruling to make.

4. PINS. AT-58 stays as written (status 500 and the forwarded message). Add one unit test on src/server.ts: a 5xx JSON answer that is not h3's swallowed-error shape passes through with its body byte for byte; the swallowed shape still becomes the error page.

5. routeTree.gen.ts. My build regenerates it with 522 changed lines (import order) under router-plugin 1.168.42. Build, and commit the file if yours differs (the INC-373 item).

6. THEN M4b, exactly as step 3 of the close-out rulings, last in the turn, so the turn ends at "apply <fragment> → expect mark <value>".
```
---
