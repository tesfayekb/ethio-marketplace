# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41121234139
- Commit: `2a9531519456f42735e5157496985752e9f44168`
- Attempt: 1
- Written (UTC): 2026-10-30T20:31:29.090Z

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
       1.7 KiB  dist/client/assets/useMutation-CTAL8_he.js
       1.7 KiB  dist/client/assets/category-tree-6WnZBWvJ.js
       1.5 KiB  dist/client/assets/route-client-9hdXQKk3.js
       1.3 KiB  dist/client/assets/lazyRouteComponent-BirVGXVO.js
       1.3 KiB  dist/client/assets/react-dom-B6cvz6ju.js
       1.0 KiB  dist/client/assets/button-w98x5-ft.js
       1.0 KiB  dist/client/assets/legal-reader-CyRsnKhw.js
       0.8 KiB  dist/client/assets/dist-dpXd8Tik.js
       0.8 KiB  dist/client/assets/use-legal-gate-C6t14Mdi.js
       0.7 KiB  dist/client/assets/post-prefill-60RIRecd.js
       0.7 KiB  dist/client/assets/createLucideIcon-DGPfniA1.js
       0.7 KiB  dist/client/assets/preload-helper-Czpn1I53.js
       0.6 KiB  dist/client/assets/legal-kinds-BSAgA918.js
       0.4 KiB  dist/client/assets/notice-outlets-DHmJqbx-.js
       0.4 KiB  dist/client/assets/rolldown-runtime-QTnfLwEv.js
       0.4 KiB  dist/client/assets/error-text-URNEoF6b.js
       0.4 KiB  dist/client/assets/useMatch-i8-xg83V.js
       0.3 KiB  dist/client/assets/utils-DtbVXzXx.js
       0.3 KiB  dist/client/assets/format-locale-CucXOsuu.js
       0.3 KiB  dist/client/assets/jsx-runtime-By8HlURe.js
       0.3 KiB  dist/client/assets/dist-wf_75G_M.js
       0.3 KiB  dist/client/assets/reader-locale-CeUeQUY1.js
       0.3 KiB  dist/client/assets/qss-JC7fkHHg.js
       0.3 KiB  dist/client/assets/page-head-BLJOTuaL.js
       0.3 KiB  dist/client/assets/ClientOnly-CTnPRrI8.js
       0.3 KiB  dist/client/assets/signed-in-route-CAIBB9ud.js
       0.2 KiB  dist/client/assets/useNavigate-CZzmch58.js
       0.2 KiB  dist/client/assets/useRouterState-C1UxbrdN.js
       0.2 KiB  dist/client/assets/useSearch-2KudQkUT.js
       0.2 KiB  dist/client/assets/ellipsis-Dw-TxPP1.js
       0.2 KiB  dist/client/assets/useRouter-CI6lzJu4.js
       0.1 KiB  dist/client/assets/chevron-right-BJcjsBNR.js
       0.1 KiB  dist/client/assets/not-found-i5RsCZif.js
       0.1 KiB  dist/client/assets/own-key-Dmr7B1jV.js
       0.1 KiB  dist/client/assets/refresh-after-write-BCMPRWUC.js
       0.1 KiB  dist/client/assets/query-keys-DQ_pMCo4.js
       0.1 KiB  dist/client/assets/surface-DVJJgA6P.js
       0.1 KiB  dist/client/assets/root-DLTE-HSj.js

First-paint budget exceeded. Either code-split the addition behind a dynamic import,
or raise the ceiling in scripts/check-bundle-size.mjs in a commit that states why.
JS: 208.0 KiB / 208 KiB — OVER BUDGET
CSS: 21.8 KiB / 40 KiB — ok
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/9f8eabe0-77ed-4bc1-982f-a1f1b79401db' before making global git config changes
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
