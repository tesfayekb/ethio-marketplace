# Gap Register — 2026-08-07 deep plan review (DEC-013)

Source: operator-directed full-repo audit (S25). Status column reflects DEC-013 placement.

## Class 1 — Specced but previously unscheduled (now all placed)

| Item                                     | REQ            | Ladder       | DEC-013 placement                                      |
| ---------------------------------------- | -------------- | ------------ | ------------------------------------------------------ |
| RBAC full + panels + audit log           | REQ-030 (+S15) | P2           | Phase R (now)                                          |
| Home feed w/ real listings + ranking     | REQ-023        | P5           | Phase F                                                |
| Search incl. cross-language              | REQ-025        | P5           | Phase F                                                |
| Geo-scope backend (location selector)    | REQ-005        | P5           | Phase F                                                |
| Messaging + block/report                 | REQ-026        | P6           | Phase G                                                |
| My Listings management (edit/renew/sold) | REQ-022        | P4           | Phase B4                                               |
| Translation dashboard                    | REQ-002 S10    | P0 skel + P7 | Phase C3                                               |
| User-content on-demand translation       | REQ-004        | P5-adjacent  | Phase F                                                |
| Notification matrix                      | REQ-031        | P8           | Ladder P8                                              |
| Backups + restore drill + watchdogs      | REQ-032        | P8           | Ladder P8                                              |
| GDPR export/deletion                     | Tier-A list    | P8           | Ladder P8 (Apex donors: export-user-data, delete-user) |
| Per-action rate limiting                 | REQ-038        | —            | First consumer Phase B4 (post action)                  |
| Step-up auth seam                        | REQ-016/030    | P1/P2        | Phase R (seam column); full 2FA at launch-gate         |
| ToS/Privacy v1 pages                     | REQ-034/035    | —            | Phase B4 (pre-counsel per DEC-013 §6)                  |
| Telegram door                            | DEC-012        | named phase  | Unchanged (correctly scheduled)                        |

## Class 2 — Assumed but never specced (now specced or registered)

| Item                                                 | Resolution                              |
| ---------------------------------------------------- | --------------------------------------- |
| PWA mechanics (manifest, SW, offline shell, install) | REQ-039                                 |
| Error monitoring / observability                     | REQ-040                                 |
| Currency-rate source (REQ-018 conversion)            | Provider pick at its spec (operator)    |
| SEO implementation (sitemap, robots, hreflang)       | Scheduled with Phase F/ladder-8 specs   |
| Product analytics                                    | Operator decision at launch-gate review |

## Class 3 — Already adjudicated (no action)

Favorites / saved searches, multi-currency, KYC, disputes, third-party API (Tier-3 deferred, 2026-08-01 gap analysis); payments (archived, DEC-001); storefronts (REQ-008, later phase); CAPTCHA / EXIF / leaked-password / SMTP (launch-gate).
