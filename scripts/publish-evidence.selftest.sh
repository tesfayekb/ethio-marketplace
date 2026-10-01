#!/usr/bin/env bash
# DEC-098 self-test for scripts/publish-evidence.sh against a temporary bare repo.
# Run: bash scripts/publish-evidence.selftest.sh
set -eu

script="$(cd "$(dirname "$0")" && pwd)/publish-evidence.sh"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
export GIT_CONFIG_GLOBAL="$tmp/gitconfig"
git config --global user.name selftest
git config --global user.email selftest@example.invalid
git config --global init.defaultBranch dev
export PUBLISH_EVIDENCE_RETRY_SLEEP=0

fail() {
  echo "FAIL: $*"
  exit 1
}
pass() { echo "PASS: $*"; }

git init --quiet --bare "$tmp/origin.git"
git clone --quiet "$tmp/origin.git" "$tmp/seed" 2>/dev/null
(
  cd "$tmp/seed"
  mkdir -p docs/tracking
  for f in ci-status guards-last-failure e2e-last-failure flake-ledger nightly-status nightly-last-failure; do
    echo "dev copy of $f" >"docs/tracking/$f.md"
  done
  echo app >app.txt
  git add . && git commit --quiet -m "dev seed"
  git push --quiet origin HEAD:dev HEAD:main
)

git clone --quiet "$tmp/origin.git" "$tmp/ci" 2>/dev/null
cd "$tmp/ci"
dev0="$(git ls-remote origin refs/heads/dev | cut -f1)"
main0="$(git ls-remote origin refs/heads/main | cut -f1)"
head0="$(git rev-parse HEAD)"
count() { git -C "$tmp/origin.git" rev-list --count ci-evidence; }
show() { git -C "$tmp/origin.git" show "ci-evidence:$1"; }

# (a) first call creates ci-evidence seeded from dev
echo "run 1 status" >docs/tracking/ci-status.md
bash "$script" "ci: status [skip ci]" docs/tracking/ci-status.md
[ "$(show docs/tracking/flake-ledger.md)" = "dev copy of flake-ledger" ] || fail "(a) ledger not seeded"
[ "$(show docs/tracking/nightly-last-failure.md)" = "dev copy of nightly-last-failure" ] || fail "(a) nightly not seeded"
[ "$(show docs/tracking/ci-status.md)" = "run 1 status" ] || fail "(a) status not published"
git -C "$tmp/origin.git" cat-file -e ci-evidence:app.txt 2>/dev/null && fail "(a) app file leaked"
[ -z "$(git -C "$tmp/origin.git" merge-base ci-evidence dev || true)" ] || fail "(a) not orphan"
pass "(a) first call created orphan ci-evidence seeded with the six dev files ($(count) commits)"

# (b) same content → no commit
c1="$(count)"
bash "$script" "ci: status [skip ci]" docs/tracking/ci-status.md
[ "$(count)" = "$c1" ] || fail "(b) commit made for unchanged content"
pass "(b) unchanged content made no commit"

# (c) changed content → exactly one commit
echo "run 2 status" >docs/tracking/ci-status.md
bash "$script" "ci: status [skip ci]" docs/tracking/ci-status.md
[ "$(count)" = "$((c1 + 1))" ] || fail "(c) expected exactly one new commit"
[ "$(show docs/tracking/ci-status.md)" = "run 2 status" ] || fail "(c) content not published"
pass "(c) changed content made exactly one commit"

# (e) push rejected once by a competing commit, succeeds on retry, keeps it
git clone --quiet --branch ci-evidence "$tmp/origin.git" "$tmp/rival" 2>/dev/null
c2="$(count)"
echo "run 3 status" >docs/tracking/ci-status.md
export RIVAL="$tmp/rival" MARK="$tmp/raced"
PUBLISH_EVIDENCE_PREPARE='if [ ! -f "$MARK" ]; then touch "$MARK"; cd "$RIVAL" && echo "rival ledger line" >>docs/tracking/flake-ledger.md && git commit --quiet -am rival && git push --quiet origin HEAD:ci-evidence; fi' \
  bash "$script" "ci: status [skip ci]" docs/tracking/ci-status.md | tee "$tmp/e.log"
grep -q "push rejected (attempt 1/3)" "$tmp/e.log" || fail "(e) first push was not rejected"
show docs/tracking/flake-ledger.md | grep -q "rival ledger line" || fail "(e) competing content lost"
[ "$(show docs/tracking/ci-status.md)" = "run 3 status" ] || fail "(e) retry content missing"
[ "$(count)" = "$((c2 + 2))" ] || fail "(e) expected rival + one retry commit"
pass "(e) rejected push succeeded on retry and kept the competing commit"

# (d) dev, main and the current checkout unchanged
[ "$(git ls-remote origin refs/heads/dev | cut -f1)" = "$dev0" ] || fail "(d) dev moved"
[ "$(git ls-remote origin refs/heads/main | cut -f1)" = "$main0" ] || fail "(d) main moved"
[ "$(git rev-parse HEAD)" = "$head0" ] || fail "(d) checkout HEAD moved"
[ "$(git worktree list | wc -l)" = "1" ] || fail "(d) worktree left behind"
pass "(d) dev $dev0 and main $main0 unchanged; checkout untouched"

echo "publish-evidence self-test: ALL PASS"
