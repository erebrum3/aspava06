# ASPAVA 06 Historical Film — Master Frame Specification

## Objective
Create a geometry-locked master frame for the Schiedam historical reconstruction sequence. The goal is not to generate a visually similar street, but to preserve the same camera, parcel/roof rhythm, street geometry and target-building positions across all eras.

## Core principle
Treat the supplied 941×1672 image as a spatial master, not merely as a visual reference.

Pipeline:
1. current-geometry master
2. neutral cleaned master
3. era-specific local transformation

Avoid full-frame regeneration after geometry lock.

## Important correction after image inspection
The initial six-proxy `TR01..TR06` scheme was too coarse for an exact match. The visible target row contains five distinct left-terrace roof/frontage units before the plot, plus the plot slot and the small right neighbour. The refined IDs below supersede the preliminary TR naming for camera matching.

## Area of interest
`AOI_MAIN_ROW` — first-pass image-space bounds on the 941×1672 master:
- left: x=45
- top: y=905
- right: x=435
- bottom: y=1072

Coordinates use a top-left origin.

## Refined target-row IDs
- `LT01` — left terrace unit 1, approx x=52..102
- `LT02` — left terrace unit 2, approx x=102..151
- `LT03` — left terrace unit 3, approx x=151..201
- `LT04` — left terrace unit 4, approx x=201..250
- `LT05` — left terrace unit 5, approx x=250..312
- `PLOT01` — Aspava plot slot, approx x=312..398
- `RN01` — lower right neighbour, approx x=398..429

These are image-space calibration segments. Where trees hide the facade or parcel edge, the boundary is an overlay target rather than a claim of surveyed cadastral geometry.

Full calibration data is stored in `MASTER_PIXEL_CALIBRATION_941x1672.json`.

## PLOT01 rules
The later/current plot facade is not the historical invariant. The invariant is its image-space/parcel slot.

Preserve:
- left/right slot boundary
- row position
- frontage alignment
- camera-view footprint

1891–93 replacement:
- modest older 2-storey brick house
- lower mass than the later building
- simple roof
- plain ground floor
- small-paned window and door
- exactly one warm illuminated ground-floor window in the full frame
- no signage, branding, shopfront identity, readable text or modern details

## RN01 rules
Preserve:
- small/lower mass relative to the plot
- lighter facade character
- visible doorway role
- overall position

## Geometry locks
### LOCK_HARD
- master camera after solve
- focal length after solve
- framing and source resolution
- horizon/roll
- target-row baseline
- visible frontage boundaries after overlay refinement
- roof-peak x positions where retained
- PLOT01 slot
- RN01 position
- square/street geometry

### LOCK_SOFT
- window design
- door design
- facade material finish
- roof covering
- weathering

### EDITABLE
- signage
- modern street furniture
- canal/fill condition
- workers
- horse/cart
- planks/posts
- mud/water
- vegetation detail where historically required

## Image-space anchors
First-pass targets:
- `A01_ROW_LEFT` = (52,1062)
- `A02_LT05_ROOF` = (280,919)
- `A03_PLOT_LEFT` = (312,1062)
- `A04_PLOT_CENTER` = (355,1062)
- `A05_PLOT_RIGHT` = (398,1062)
- `A06_RN_CENTER` = (414,1062)
- `A07_RN_ROOF` = (414,963)
- `A08_ROW_RIGHT` = (429,1062)

## Quality-control rule
Every era frame must be overlaid against the 941×1672 master.

Check:
- PLOT01 left/right slot
- RN01 position
- LT01..LT05 frontage rhythm
- roof-peak rhythm
- target-row baseline (~y=1061/1062 in the master)
- square/street edge
- major retained tree bases

Once the camera is solved, fix a local mismatch by editing local geometry rather than moving the master camera.
