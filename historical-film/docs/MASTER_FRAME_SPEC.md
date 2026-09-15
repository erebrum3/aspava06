# ASPAVA 06 Historical Film — Master Frame Specification

## Objective
Create a geometry-locked master frame for the Schiedam historical reconstruction sequence. The goal is not to generate a visually similar street, but to preserve the same camera, parcel layout, street geometry, roof rhythm, and target-building positions across all eras.

## Core Principle
Treat the source image as a spatial master, not merely as a visual reference.

The production pipeline is:

1. Current-geometry master
2. Neutral cleaned master
3. Era-specific local transformation

Avoid full-frame regeneration after the geometry has been locked.

## Area of Interest
`AOI_MAIN_ROW`

The AOI contains:
- the small square / open street area
- the target house row
- the plot parcel
- the lower lighter right neighbour
- foreground street/canal transformation zone

## Layer Model
- `L0_SKY` — sky and horizon
- `L1_DISTANT_CITY` — distant skyline / secondary urban fabric
- `L2_MID_BLOCKS` — middle-distance blocks
- `L3_TARGET_ROW` — primary house row and plot
- `L4_FOREGROUND` — foreground roofs / canal / fill zone

`L3_TARGET_ROW` is the critical geometry layer.

## Building IDs
Assign target-row buildings from left to right:

- `TR01` — left terrace
- `TR02` — left terrace
- `TR03` — left terrace
- `TR04` — transition house
- `TR05` — PLOT / ASPAVA parcel
- `TR06` — right neighbour
- `TR07+` — optional right-side continuation if needed

## TR05 — Plot Rules
The current modern plot building is not historically preserved. Only its parcel slot matters.

Preserve:
- parcel width
- left boundary
- right boundary
- position in the row
- ground contact / frontage alignment

1891–93 replacement:
- modest older 2-storey brick house
- lower mass than the later modern building
- simple pitched roof
- plain ground floor
- one small-paned window
- one door
- exactly one warm illuminated ground-floor window in the full frame
- no signage, branding, shopfront identity, readable text, or modern details

## TR06 — Right Neighbour Rules
Preserve:
- lower height relative to TR05
- lighter facade character
- visible door
- overall parcel position

Allow period simplification of surface details.

## Geometry Locks
### LOCK_HARD
Must not move unless historical evidence explicitly requires structural change:
- camera transform
- focal length
- framing
- horizon
- parcel boundaries
- main street axis
- square geometry
- target-row baseline
- roof-peak x positions where the building itself remains
- TR05 parcel slot
- TR06 position

### LOCK_SOFT
May change stylistically while keeping geometry:
- window design
- door design
- facade material finish
- roof covering
- surface weathering

### EDITABLE
May change by era:
- signage
- modern street furniture
- canal/fill condition
- workers
- horse/cart
- planks/posts
- mud/water
- vegetation detail

## Anchor Points
Use stable image-space anchors:

- `A01` — left start of target row
- `A02` — first strong roof peak
- `A03` — TR05 left boundary
- `A04` — TR05 centre axis
- `A05` — TR05 right boundary
- `A06` — TR06 door centre
- `A07` — TR06 roof peak
- `A08` — right end of target row

## Quality-Control Rule
Every era frame must be compared against the master by overlay.

Check:
- TR05 left/right boundaries
- TR06 position
- roof-peak rhythm
- target-row baseline
- square/street edge
- major tree base positions where retained

If one building is wrong after the camera is solved, adjust that building's geometry rather than changing the master camera.
