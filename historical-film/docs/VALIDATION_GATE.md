# Historical Film — Pre-Merge Validation Gate

Do not merge `historical-film-masterframe` into `main` until all required gates below pass.

## G0 — Source-of-truth split
- [x] Canonical geographic camera belongs to `erebrum-system`.
- [x] `aspava06/historical-film` is film-specific calibration / mask / era-workflow only.
- [x] Local Blender scaffold is explicitly non-canonical.

## G1 — Calibration semantics
- [x] Source frame: 941×1672.
- [x] AOI bottom includes PLOT01 lower façade: y=1090.
- [x] Row façade-ground contact: y=1082.
- [x] Warm-light match-cut anchor is separate: (362,1062).
- [x] PLOT01 approximate visible bounds: x=312..398.
- [x] RN01 approximate visible bounds: x=398..429.

## G2 — Canonical-camera validation
Required in the geographic source pipeline, without re-fitting camera:
- [ ] Canonical camera imported from the recorded source file.
- [ ] 941×1672 render confirmed.
- [ ] Church-spire projection reproduces prior check (~1 px tolerance / documented result).
- [ ] ASPAVA roof projection reproduces prior check (~5.8 px documented result or better without camera change).
- [ ] No camera values changed to fix local row errors.

## G3 — Local image-space QA
Run local Blender helpers:
1. `bootstrap_master_scene.py`
2. `build_image_space_scaffold.py`
3. fit local proxies only
4. `validate_proxy_alignment.py`

Targets:
- [ ] ordinary visible boundaries ≤5 px
- [ ] PLOT01 ≤3 px where visible
- [ ] RN01 ≤3 px where visible
- [ ] roof-peak y ≤5 px
- [ ] occluded edges documented as approximate rather than over-fitted

## G4 — 1891–93 edit-chain QA
Close-up series only:
- [ ] Pass 1 changes only PLOT01 older-house region.
- [ ] Pass 2 changes only street/canal region.
- [ ] Pixels outside masks restored exactly from source.
- [ ] PLOT01 replacement remains inside the locked slot.
- [ ] Warm window lands on / transitions through the approved light anchor.
- [ ] No claim of an archival 1891 aerial frame.

## G5 — Final branch decision
Only after G2–G4 pass:
- [ ] create/review PR to `main`
- [ ] keep `erebrum-system` as geometry/camera authority
- [ ] keep `aspava06` as film-delivery authority

Until these gates pass, continue work on `historical-film-masterframe` and leave `main` unchanged.
