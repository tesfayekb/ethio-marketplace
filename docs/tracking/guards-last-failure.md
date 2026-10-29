# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40812371557
- Commit: `5f2c53965d91bc49644449706498b34771b558bb`
- Attempt: 1
- Written (UTC): 2026-10-29T04:04:29.772Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Gitleaks secrets scan — failure

### Evidence lines

```text
Error: Failed to FinalizeArtifact: Unable to make request: ETIMEDOUT
```

### Tail (last 60 lines)

```text
Received 5712911 of 5712911 (100.0%), 15.3 MBs/sec
Cache Size: ~5 MB (5712911 B)
[command]/usr/bin/tar -xf /home/runner/work/_temp/07d12819-bd6b-4097-8f6c-a8bbc16b6997/cache.tzst -P -C /home/runner/work/ethio-marketplace/ethio-marketplace --use-compress-program unzstd
Cache restored successfully
Gitleaks restored from cache
event type: push
gitleaks cmd: gitleaks detect --redact -v --exit-code=2 --report-format=sarif --report-path=results.sarif --log-level=debug --log-opts=--no-merges --first-parent 10e4ec1074c34a0376fdebebe71eef324a6abadf^..5f2c53965d91bc49644449706498b34771b558bb
[command]/tmp/gitleaks-8.24.3/gitleaks detect --redact -v --exit-code=2 --report-format=sarif --report-path=results.sarif --log-level=debug --log-opts=--no-merges --first-parent 10e4ec1074c34a0376fdebebe71eef324a6abadf^..5f2c53965d91bc49644449706498b34771b558bb

    ○
    │╲
    │ ○
    ○ ░
    ░    gitleaks

[90m3:45AM[0m DBG using github.com/wasilibs/go-re2 regex engine
[90m3:45AM[0m DBG no gitleaks config found in path .gitleaks.toml, using default gitleaks config
[90m3:45AM[0m DBG found .gitleaksignore file: .gitleaksignore
[90m3:45AM[0m DBG found .gitleaksignore file: .gitleaksignore
[90m3:45AM[0m DBG executing: /usr/bin/git -C . log -p -U0 --no-merges --first-parent 10e4ec1074c34a0376fdebebe71eef324a6abadf^..5f2c53965d91bc49644449706498b34771b558bb
[90m3:45AM[0m DBG SCM platform parsed from host [36mhost=[0mgithub.com [36mplatform=[0mgithub
[90m3:45AM[0m [32mINF[0m [1m0 commits scanned.[0m
[90m3:45AM[0m DBG Note: this number might be smaller than expected due to commits with no additions
[90m3:45AM[0m [32mINF[0m [1mscanned ~0 bytes (0) in 76.8ms[0m
[90m3:45AM[0m [32mINF[0m [1mno leaks found[0m
Artifact name is valid!
Root directory input is valid!
Beginning upload of artifact content to blob storage
Uploaded bytes 6800
Finished uploading artifact content to blob storage!
SHA256 digest of uploaded artifact zip is ae0f07868b189588de708072754d037aa477b58966a02a4b36a1b455437d3ce3
Finalizing artifact upload
/home/runner/work/_actions/gitleaks/gitleaks-action/v3/dist/index.js:2763
                throw new Error(`Failed to ${method}: ${error.message}`);
                      ^

Error: Failed to FinalizeArtifact: Unable to make request: ETIMEDOUT
If you are using self-hosted runners, please make sure your runner has access to all GitHub endpoints: https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners#communication-between-self-hosted-runners-and-github
    at ArtifactHttpClient.<anonymous> (/home/runner/work/_actions/gitleaks/gitleaks-action/v3/dist/index.js:2763:23)
    at Generator.throw (<anonymous>)
    at rejected (/home/runner/work/_actions/gitleaks/gitleaks-action/v3/dist/index.js:2714:65)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)

Node.js v24.22.1
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/185f6a0d-977e-4f5f-858f-72e6c1d4895f' before making global git config changes
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
