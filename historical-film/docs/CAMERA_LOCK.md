# Blender Camera-Lock Workflow

> **CANONICAL CAMERA ALREADY EXISTS — do not re-solve.** (added 2026-09-15)
> Source of truth: `erebrum-system/sites/aspava/video-tests/2026-07-24/master-85m-78deg/geometri-gercegi/kamera-KANONIK.json`
> (from the `.esp` export; ground truth §7 rule "Kamerayı yeniden fit etme").
> RD/EPSG:28992 `87444.969, 436872.101` · altitude **85 m** · heading **282°** · tilt **78°** · vertical FOV **35°** · roll 0 · **941×1672** · horizon y=272.4.
> Projection check 2026-09-15 with `render_geo.Cam`: church spire top 1 px, ASPAVA roof 5.8 px.
> Build `Camera_Master` from these values. The overlay procedure below is a **validation** step (check proxies against the master), not a solve. The "50–85 mm, start near 65 mm" range below is superseded.


## Goal
Match the reference frame closely enough that all later historical versions inherit the same spatial structure.

This is an image-space match, not a claim of exact photogrammetric recovery from one image.

## Camera Object
Create one camera named:

`Camera_Master`

Once solved, lock:
- location
- rotation
- focal length
- framing

Do not keyframe or modify this camera in era files.

## Initial Setup
1. Set render aspect ratio to the reference frame.
2. Add the reference as camera background.
3. Keep reference scale/crop fixed.
4. Start with simple proxy geometry only.

## Suggested Starting Range
Use only as a starting point, then match visually:
- focal length: roughly 50–85 mm
- start near 65 mm
- camera pitched strongly downward

Final values are determined by overlay alignment, not by these estimates.

## Proxy Objects
Create:
- `BLOCK_FOREGROUND`
- `BLOCK_TARGET_ROW`
- `BLOCK_BACKGROUND`

Then replace `BLOCK_TARGET_ROW` with individual proxies:
- `TR01`
- `TR02`
- `TR03`
- `TR04`
- `TR05_MODERN`
- `TR06`

Use simple boxes and triangular roof prisms. Do not model windows, brickwork, or textures during camera solve.

## Solve Order
1. Correct roll.
2. Match horizon / general vertical orientation.
3. Match target-row baseline.
4. Match target-row scale.
5. Match roof-peak rhythm.
6. Match TR05 parcel boundaries.
7. Match TR06 position.
8. Add square/street plane.
9. Add tree-base markers as secondary anchors.

## Street / Ground Objects
Create:
- `GROUND_SQUARE`
- `STREET_AXIS`
- optional curb-edge guide curves

Use the visible street/square boundaries as perspective constraints.

## Tree Markers
Use simple cylinders only:
- `TREE_01`
- `TREE_02`
- etc.

Tree-base image positions are useful secondary anchors, but vegetation shape itself is not geometry-critical.

## Overlay QA
Render proxies with flat neutral materials and compare against the reference at approximately 50% opacity.

Prioritize alignment of:
- TR05 left edge
- TR05 right edge
- TR06 location
- roof peaks
- row baseline
- square/street boundary
- selected tree bases

Do not chase facade details before these align.

## Adjustment Rule
After the camera is broadly solved:
- if the entire row is wrong, adjust camera
- if only one building is wrong, adjust that building
- do not move the camera to fix a local geometry problem

## File Stages
Recommended Blender files:

1. `SCHIEDAM_MASTER_CAMERA_v01.blend`
   - camera
   - proxies
   - guides

2. `SCHIEDAM_NEUTRAL_MASTER_v01.blend`
   - refined but era-neutral geometry

3. `SCHIEDAM_1891_93_v01.blend`
   - TR05 historical replacement
   - canal/fill layers

## Historical Replacement Rule
For 1891–93:
- hide `TR05_MODERN`
- create `TR05_1892`
- keep it inside the same parcel slot
- do not shift left/right boundaries

## Separate Foreground Layers
Create independent objects/collections for:
- `CANAL_1892`
- `QUAY_1892`
- `FILL_1892`
- `PLANKS_1892`
- `POSTS_1892`
- `WORKERS_1892`
- `HORSE_CART_1892`

This keeps the building geometry independent from the foreground historical action and allows masked AI edits later.
