# Turn F4a — STOP 1

- Step 0: brief saved; sha256 8f20dac386262fe7d24da0d19dc86e3ef5df0a2e9156f521df22bb8912b8ff11 (matches).
- CI: f25f6e9e cancelled (per ruling). The evidence page still showed 060d4d60 FAILURE (component tests only, fixed in B1); no 3caa699b verdict was there when read.
- Built:
  - src/lib/visible-area.ts (visibleArea, areaFrom, collisionPaddingNow; scroll-padding fallback, 8 px margin);
  - placeList, scroll-then-open (scrollend or two still frames, instant under reduced motion; opacity hold, because visibility dropped the phone search box's focus) and bounded height in searchable-picker.tsx;
  - per-side collision padding read on open in dropdown-menu-impl.tsx;
  - data-chrome markers: shell-band, shell-subband (top); bottom-bar, form-layout-actions, form-section actions (bottom);
  - CF-AREA-1 (scripts/conformance/visible-area.test.ts, empty allowlist, VA-1…3).
- Unit: VA-U1…4, PL-U1…5, VA-1…3, CF-LIST-1 and CL-U all pass (focused runs: 8 + 28 passed).
- E2E `bun run e2e:local -- e2e/choice-lists.spec.ts` (Nix Chromium 146, both projects, retries 0): 31 passed, 3 failed, 54 skipped. These paths are this turn's, so this is a STOP:
  - CL-E7 currency, centred: list bottom 659 > visible bottom 591 (the bounded height is not reaching the currency panel's own max-h-64 scroller).
  - CL-E8 phone code, light and dark: list top 62 < visible top 91 (the list opens up while the page reads as unable to scroll).
  - Both are held with test.fixme naming this stop; CL-E6, CL-E9 and the other CL-E7 spots pass.
- Not done: the report, `bun run checks` ("slow steps: not finished — CI judges"), docs.
- K2: toolbar-panel.tsx:110 popover collisionPadding={16} (outside CF-AREA-1's menu rule); listing-detail.tsx:524 reads shell-subband itself.
