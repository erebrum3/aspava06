# Exact-source restoration mask workflow

> **Scope (added 2026-09-15):** per the project decisions (09-11 §11, 09-15 K2/K8) there is **no 1891–93 aerial frame**; aerial era frames keep all buildings. The 1891–93 pass and these masks apply to the **street-level close-up master frame** (close-up series 1891–93 → 1907 → 1975). In the close-up chain PLOT01 shows the older house in 1891–93 and the 1906 building from 1907 on.

Goal: keep the supplied master street geometry visually identical outside explicitly editable historical regions.

## Core rule

- **WHITE** in an edit mask = the AI/editor may change pixels.
- **BLACK** = do not trust generated pixels; restore those pixels directly from the original source frame in post.

This is stronger than asking an image model to preserve the scene. It guarantees that unaffected regions remain pixel-identical after compositing.

## 1891-93 pass order

1. Start from the original master frame at 941x1672. Never resize or crop it before masking.
2. Use `mask_edit_plot01.png` to replace only `PLOT01` with the period-plausible older house.
3. Composite the result back onto the original source so every black pixel is source-exact.
4. Use `mask_edit_street_surface.png` for the canal/quay/fill transformation.
5. Composite again against the previous accepted master.
6. Run a final combined pass only if needed, using `mask_edit_1891_93_combined.png`.
7. Use `mask_restore_from_source.png` as the explicit restoration region when assembling the final frame.

## Protected geometry

The following buildings are protected in the 1891-93 pass:

- LT01
- LT02
- LT03
- LT04
- LT05
- RN01

Their facades, roof silhouettes and screen positions must remain source-exact unless a later researched era specification explicitly authorizes a change.

## PLOT01 rule

`PLOT01` is a parcel slot. The building may change historically, but the slot must not drift left/right. The historical replacement must remain inside the calibrated PLOT01 screen footprint unless later evidence justifies a different historical footprint.

## Street surface rule

`STREET_SURFACE_PRIMARY` is deliberately conservative. It covers the visible paved/open area most relevant to the old canal transformation while avoiding unrelated foreground roofs and surrounding buildings. Refine the polygon by overlay if the canal reconstruction needs a wider historical footprint.

## Acceptance gate

A generated frame is not accepted merely because it looks plausible. Accept only when:

- protected regions are restored from source,
- PLOT01 remains inside its calibrated slot,
- RN01 is unchanged,
- no camera crop/zoom/reframe occurred,
- target row alignment remains within the camera-match tolerance,
- the historical edit is restricted to the authorized mask(s).
