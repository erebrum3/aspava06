# 11 v2 — Pass A: PLOT01 historical replacement

## Goal
Create the 1891–93 close-up keyframe by changing **only PLOT01**. Do not add canal activity in this pass.

## Source-of-truth split
- Film pixels / framing / mask slot: `aspava06/historical-film` master calibration.
- Historical/geographic claims: `erebrum-system` camera + BAG / archival research.
- Do not force BAG geometry to overwrite the master image's visible pixel geometry.

## Current image-space controls
- Full frame: **941×1672**.
- Row façade-ground contact: **y=1082**.
- Warm-light match-cut anchor: **(362,1062)**.
- PLOT01 visible slot: approximately **x=312..398**.
- PLOT01 silhouette polygon (full-frame pixels):
  - (312,1082)
  - (312,984)
  - (354,946)
  - (398,984)
  - (398,1082)

## Required edit
Inside the PLOT01 edit mask only:
- remove the later/current PLOT01 building appearance;
- create a modest, older, lower two-storey brick house appropriate as a restrained 1891–93 dramatization;
- preserve the exact slot width and alignment in the film master;
- simple pitched roof;
- plain ground floor with one door and one small-paned window;
- exactly one warm illuminated ground-floor window, visually centered near the approved light anchor;
- no sign, number, logo, restaurant identity, neon or modern shopfront;
- no exaggerated picturesque detailing;
- natural muted brick / plaster tones;
- match the source frame's perspective, atmosphere, sharpness and lighting.

## Hard locks
Outside the PLOT01 mask, restore pixels exactly from the source after generation. In particular do not alter:
- LT01–LT05;
- RN01;
- trees;
- street / square;
- skyline;
- camera framing;
- crop;
- exposure / global color balance.

## Explicit non-goals for Pass A
Do not add:
- canal fill;
- workers;
- horse cart;
- planks / posts;
- mud construction scene;
- new pedestrians;
- any global historical transformation.

Those belong to Pass B.

## QA gate before Pass B
Pass A is accepted only if:
1. PLOT01 stays inside its locked slot.
2. The approved warm-light anchor is preserved as the transition target.
3. RN01 and LT01–LT05 are unchanged after exact-source restoration.
4. No pixels outside the mask survive from the AI edit.
5. No modern signage / branding remains inside PLOT01.
6. The result reads as restrained historical reconstruction, not archival fact.

## Status
Use the post-2026-09-15 calibration (groundline 1082, light anchor 362/1062). Older masks based on groundline 1062 are obsolete and must not be reused.
