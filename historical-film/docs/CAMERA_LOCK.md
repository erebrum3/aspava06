# Blender Camera-Lock Workflow

> **CANONICAL CAMERA ALREADY EXISTS — do not re-solve.**
>
> Source of truth: `erebrum-system/sites/aspava/video-tests/2026-07-24/master-85m-78deg/geometri-gercegi/kamera-KANONIK.json`
>
> Canonical values: RD/EPSG:28992 `87444.969, 436872.101` · altitude **85 m** · heading **282°** · tilt **78°** · vertical FOV **35°** · roll **0°** · render **941×1672** · horizon y≈272.4.
>
> The 2026-09-15 projection check recorded approximately **1 px** error at the church-spire top and **5.8 px** at the ASPAVA roof. Treat overlay as validation, not as permission to re-fit the camera.

## Source-of-truth split

- `erebrum-system` owns the canonical geographic camera and city geometry.
- `aspava06/historical-film` owns film-specific masks, image-space calibration, plot-slot rules, era briefs and render/edit workflow.
- Do not create a second competing canonical camera inside `aspava06`.

## What is locked

The canonical camera is immutable for the aerial/master geometry chain:
- geographic position
- altitude
- heading
- tilt
- roll
- vertical FOV
- render resolution / framing

Do not keyframe, re-fit or visually nudge these values to repair a local building mismatch. A local mismatch is corrected in local geometry or in the image-space calibration layer.

## Validation targets

Current image-space targets for the target row are:
- `LT01..LT05`
- `PLOT01`
- `RN01`
- row ground-contact line: **y=1082** in the 941×1672 master
- `PLOT01` approximate visible bounds: **x=312..398**
- `RN01` approximate visible bounds: **x=398..429**
- warm-light match-cut anchor: **(362, 1062)**

`y=1082` is the **row ground-contact / facade-groundline target**. It is not the warm-light anchor and should not be described as the light-window centre.

## Validation order

1. Load/import the canonical camera from the geographic source pipeline.
2. Confirm render resolution is exactly 941×1672.
3. Render the neutral/proxy geometry without changing the camera.
4. Compare against the master frame at approximately 50% opacity.
5. Check global landmarks first (church, skyline / known georeferenced anchors).
6. Check target-row roof rhythm.
7. Check row ground-contact line at y=1082.
8. Check `PLOT01` x=312..398 and `RN01` x=398..429.
9. Check street/square boundary.
10. If a local feature misses, modify local geometry or calibration — **never the canonical camera**.

## Pixel QA thresholds

Before architectural detailing:
- global landmark check: use the existing canonical-camera projection tolerances
- ordinary target-row boundaries: aim for ≤5 px
- `PLOT01` and `RN01`: aim for ≤3 px where the source is not occluded
- roof-peak y: aim for ≤5 px

Where trees or occlusion hide an edge, record the target as approximate rather than forcing false precision.

## Local Blender scaffold

The scripts under `historical-film/blender/scripts/` may use a local image-space validation scaffold for quick single-view work. That scaffold is **not** the geographic camera source of truth. It exists only to:
- visualize calibrated silhouettes
- test masks
- measure projected pixel error
- prototype era-local replacements

Do not export its local world coordinates as camera truth.

## Historical close-up scope

The 1891–93 plot replacement and canal-fill masks belong to the **street-level close-up chain**, not to a claimed 1891 aerial reconstruction. In that close-up chain:
- `PLOT01` = older modest house in 1891–93
- from 1907 onward the later building mass may appear
- camera/framing for each approved close-up master remains fixed through its era transitions

## Era-layer separation

Keep foreground historical action separate from building geometry:
- `CANAL_1892`
- `QUAY_1892`
- `FILL_1892`
- `PLANKS_1892`
- `POSTS_1892`
- `WORKERS_1892`
- `HORSE_CART_1892`

This allows masked AI edits and source restoration without contaminating locked façades.
