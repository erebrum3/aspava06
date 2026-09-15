# Blender master-scene workflow

This folder contains the Schiedam historical-film image-space scaffold and validation helpers.

## Source-of-truth rule

The canonical geographic camera is owned by `erebrum-system`, not by this folder. Current canonical values recorded for validation are:
- altitude 85 m
- heading 282°
- tilt 78°
- vertical FOV 35°
- roll 0°
- render 941×1672

Do **not** re-solve or visually nudge the canonical camera from this repo. The local scaffold exists to validate silhouettes, masks and projected pixel targets.

## First run
1. Open Blender → **Scripting**.
2. Open `scripts/bootstrap_master_scene.py`.
3. Set `REFERENCE_IMAGE_PATH` to the local absolute path of the 941×1672 master image.
4. Run the script.
5. Run `build_image_space_scaffold.py`.
6. Switch to camera view (`Numpad 0`).
7. Use `validate_proxy_alignment.py` after local proxy adjustments.

## Target-row IDs
- `LT01..LT05`
- `PLOT01`
- `RN01`

## Current semantic targets
- row ground-contact / façade groundline: **y=1082**
- `PLOT01` visible x bounds: **312..398**
- `RN01` visible x bounds: **398..429**
- warm-light match-cut anchor: **(362,1062)**
- AOI: **(45,905) .. (435,1090)**

The y=1082 groundline and the y=1062 warm-light anchor are intentionally separate targets.

## Validation order
1. Keep the canonical geographic camera immutable in the source geometry pipeline.
2. Use this repo's local scaffold only for image-space QA.
3. Confirm render resolution = 941×1672.
4. Overlay the proxy render with the master frame.
5. Validate roof rhythm and row groundline.
6. Validate `PLOT01` and `RN01` boundaries.
7. Correct local proxy geometry/calibration rather than changing camera truth.
8. Once local image-space error is acceptable, proceed to masks / era-local replacements.

## QA targets
- ordinary boundaries: aim for ≤5 px
- `PLOT01` / `RN01`: aim for ≤3 px where visible
- roof-peak y: aim for ≤5 px

Occluded edges remain approximate. Do not force false precision through trees or hidden parcel boundaries.

## PLOT01 rule
`PLOT01` is a **slot**, not a façade that must survive through time. Era-specific replacements stay inside the same image-space / parcel slot. The later/current mass can be replaced by `PLOT01_1892`, `PLOT01_1907`, etc. without shifting the slot.

## 1891–93 scope
The older-house replacement and canal-fill masks apply to the **street-level close-up series**, not to a claimed 1891 aerial frame. Use separate passes:
1. PLOT01 building replacement
2. street/canal transformation
3. exact-source restoration outside the editable masks

## Recommended file progression
- `SCHIEDAM_VALIDATION_LOCAL_v01.blend`
- `SCHIEDAM_NEUTRAL_MASTER_v01.blend`
- `SCHIEDAM_1891_93_CLOSEUP_v01.blend`

Do not overwrite the source/canonical geographic camera project with era-specific edits.
