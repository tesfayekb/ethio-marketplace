# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40075831535
- Commit: `93176317c0bec0eec9583702d1a7b8b07c79cae2`
- Attempt: 1
- Written (UTC): 2026-10-24T08:09:51.047Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
       2.3 KiB  dist/client/assets/useSelector-Dl1uomi4.js
       1.7 KiB  dist/client/assets/useMutation-Vjzo8Nv2.js
       1.6 KiB  dist/client/assets/dist-DYw4uv7F.js
       1.5 KiB  dist/client/assets/lazyRouteComponent-5Sx92n0r.js
       1.4 KiB  dist/client/assets/category-tree-BBLk8_DS.js
       1.3 KiB  dist/client/assets/react-dom-DR_LbxJG.js
       1.1 KiB  dist/client/assets/legal-reader-BV5BC8ls.js
       1.1 KiB  dist/client/assets/mfa-service-Bms3ePxN.js
       1.0 KiB  dist/client/assets/dist-DrSBnlwU.js
       0.8 KiB  dist/client/assets/post-prefill-dfGn6zft.js
       0.8 KiB  dist/client/assets/use-legal-gate-8_d0KHFa.js
       0.7 KiB  dist/client/assets/createLucideIcon-BsMeATGv.js
       0.7 KiB  dist/client/assets/legal-kinds--w8AHTLb.js

First-paint budget exceeded. Either code-split the addition behind a dynamic import,
or raise the ceiling in scripts/check-bundle-size.mjs in a commit that states why.
       0.5 KiB  dist/client/assets/reader-failure-Cnr5tLrW.js
       0.5 KiB  dist/client/assets/visible-when-DE7p_70p.js
       0.5 KiB  dist/client/assets/cut-text-D0LtYeF5.js
       0.4 KiB  dist/client/assets/rolldown-runtime-QTnfLwEv.js
       0.4 KiB  dist/client/assets/error-text-URNEoF6b.js
       0.4 KiB  dist/client/assets/useMatch-B5ZNUzEn.js
       0.4 KiB  dist/client/assets/dist-BRxzimgZ2.js
       0.3 KiB  dist/client/assets/package-BDSxYVC-.js
       0.2 KiB  dist/client/assets/shield-check-N--Z-1xf.js
       0.2 KiB  dist/client/assets/map-pin-Ci9J_Lp2.js
       0.2 KiB  dist/client/assets/heart-D3fTVRoM.js
       0.2 KiB  dist/client/assets/signed-in-route-DMvVccgF.js
       0.2 KiB  dist/client/assets/useNavigate-qTs2HIr2.js
       0.2 KiB  dist/client/assets/format-locale-C2bnaryd.js
       0.2 KiB  dist/client/assets/useRouterState-Cea3xWwZ.js
       0.2 KiB  dist/client/assets/useSearch-DgB0e1ZZ.js
       0.2 KiB  dist/client/assets/ellipsis-Wf-Pjs9W.js
       0.2 KiB  dist/client/assets/useRouter-CNWE4PNO.js
       0.1 KiB  dist/client/assets/chevron-right-B6kFZruf.js
       0.1 KiB  dist/client/assets/check-DHuU2kT4.js
       0.1 KiB  dist/client/assets/not-found-i5RsCZif.js
       0.1 KiB  dist/client/assets/own-key-Dmr7B1jV.js
       0.1 KiB  dist/client/assets/refresh-after-write-BCMPRWUC.js
       0.1 KiB  dist/client/assets/query-keys-DQ_pMCo4.js
       0.1 KiB  dist/client/assets/root-DLTE-HSj.js
JS: 306.2 KiB / 306 KiB — OVER BUDGET
CSS: 20.5 KiB / 40 KiB — ok
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/a9d000f9-15ca-4a95-bda2-a6a46724d8cb' before making global git config changes
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
