# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38126648954
- Commit: `63f6b687bce2b38600161b0fd1042457c10bf441`
- Attempt: 2
- Written (UTC): 2026-10-11T09:32:16.044Z

## Component tests — failure

### Evidence lines

```text
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:65:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
 [31m❯[39m src/test/pool-reset-map.test.ts [2m([22m[2m2 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 12[2mms[22m[39m
[41m[1m FAIL [22m[49m src/test/pool-reset-map.test.ts[2m > [22mDEC-099 pool reset map[2m > [22mdeclares every user-id table as RESET or EXEMPT, never both
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m101 passed[39m[22m[90m (102)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m642 passed[39m[22m[90m (643)[39m
##[error]AssertionError: expected [ 'seller_notices' ] to deeply equal []
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text

[41m[1m FAIL [22m[49m src/test/pool-reset-map.test.ts[2m > [22mDEC-099 pool reset map[2m > [22mdeclares every user-id table as RESET or EXEMPT, never both
[31m[1mAssertionError[22m: expected [ 'seller_notices' ] to deeply equal [][39m

[32m- Expected[39m
[31m+ Received[39m

[32m- [][39m
[31m+ [[39m
[31m+   "seller_notices",[39m
[31m+ ][39m

[36m [2m❯[22m src/test/pool-reset-map.test.ts:[2m31:24[22m[39m
    [90m 29|[39m     const undeclared = tablesWithUserColumn().filter((t) => !reset.has…
    [90m 30|[39m     [35mconst[39m both [33m=[39m [[33m...[39mreset][33m.[39m[34mfilter[39m((t) [33m=>[39m exempt[33m.[39m[34mhas[39m(t))[33m;[39m
    [90m 31|[39m     [34mexpect[39m(undeclared)[33m.[39m[34mtoEqual[39m([])[33m;[39m
    [90m   |[39m                        [31m^[39m
    [90m 32|[39m     [34mexpect[39m(both)[33m.[39m[34mtoEqual[39m([])[33m;[39m
    [90m 33|[39m   })[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m101 passed[39m[22m[90m (102)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m642 passed[39m[22m[90m (643)[39m
[2m   Start at [22m 08:59:51
[2m   Duration [22m 36.84s[2m (transform 2.58s, setup 14.55s, import 7.76s, tests 7.62s, environment 65.59s)[22m


##[error]AssertionError: expected [ 'seller_notices' ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "seller_notices",
+ ]

 ❯ src/test/pool-reset-map.test.ts:31:24


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/d533a7bf-84ab-4980-b270-e58095317321' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
[command]/usr/bin/git config --global --add safe.directory /home/runner/work/ethio-marketplace/ethio-marketplace
[command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
[command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
http.https://github.com/.extraheader
[command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
[command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
[command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
Cleaning up orphan processes

```
