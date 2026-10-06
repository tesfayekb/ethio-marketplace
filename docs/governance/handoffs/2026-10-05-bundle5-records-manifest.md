# Records turn manifest — 2026-10-05 bundle 5 close

Written by the supervisor; committed by the same docs-only turn. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte (the section already begins with the blank line that separates it from the file's last line); the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE — everything from the line `Numbering: next free INC-438.` to the end of the file is deleted (that line, the blank line, the `Watch list …` paragraph) and the carrier section is written in its place; the RESULT row hashes the whole file after the edit. This manifest has no self-hash.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 34050 | `8a1c8c64f8bb1b2b7a86c95d16634b5871b48aae15ba73e300240ea4bde5d443` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 803686 | `9cb08995efc487763f2d32c5aaba85686f745b0f0bc35425f5927d440e20937a` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 11308 | `0e6c3209bad8d34ea6b9870785d96a7298587e9419608ef46b9f0c93df4a97d5` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 444867 | `ac9ff940d4587aa740de1f87c2135cd39a78976d103978c4d08292e6a88d4d8f` |
| `docs/governance/system-state.md` | REPLACE | 25521 | `3ba33f5dddc3f605c134adbe912563bdf8ba83579eedd5d2e7ac8a619a9c6b8d` |
| `AGENTS.md` | REPLACE | 2864 | `15982968b8425e77fbcecf72d9a8d839ad75c27c97c1a515e9253991ff6837e2` |
| `docs/tracking/action-tracker.md` | REPLACE | 19624 | `7866c621f3532613ec6cd27f23a19861034ba193de5365c309b701a79942470b` |
| `roadmap.md` | REPLACE | 5539 | `90920914f18b1f296cbdffe71b402b8a3c2b7488d1b198ef20f6c12724fbc887` |
| `docs/governance/handoffs/2026-10-05-bundle5-close-handover.md` | NEW | 13780 | `dd124fad7d78b6118e00583402126cf5e1098a07a2bc9378893e176217814c30` |
| `docs/_changelog.md` | APPEND | 301 | `fb1bc64cfaf59d55a81c026ac1f974efb263a54819478bed8092853f11bf19ab` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 258885 | `0b74fae7175a1ab7043db7eeb4566b98476cfd6279113160375de6aaa07fd455` |

