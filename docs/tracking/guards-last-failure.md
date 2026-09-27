# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36286417751
- Commit: `43e1b2f8eb084896701c953719dee5095ecfcec7`
- Attempt: 2
- Written (UTC): 2026-09-27T02:04:43.043Z

## i18n used-on map is fresh (U4i ②) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
@@ -3732,6 +3736,18 @@
       "/post",
       "/post/$listingId"
     ],
+    "post.price.basisFixed": [
+      "/post",
+      "/post/$listingId"
+    ],
+    "post.price.commissionHelp": [
+      "/post",
+      "/post/$listingId"
+    ],
+    "post.price.commissionLabel": [
+      "/post",
+      "/post/$listingId"
+    ],
     "post.price.currencyFailed": [
       "/post",
       "/post/$listingId"
@@ -3861,6 +3877,10 @@
       "/post",
       "/post/$listingId"
     ],
+    "post.review.pricePer": [
+      "/post",
+      "/post/$listingId"
+    ],
     "post.review.publish": [
       "/post",
       "/post/$listingId"
@@ -4234,6 +4254,12 @@
       "/post",
       "/post/$listingId"
     ],
+    "price.commission": [
+      "/",
+      "/c/$slug",
+      "/post",
+      "/post/$listingId"
+    ],
     "price.contact": [
       "/",
       "/c/$slug",
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/fc2ee792-f878-48be-93bf-c2e452e78b11' before making global git config changes
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
