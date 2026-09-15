# Blender master-scene workflow

This folder contains the geometry-locked Schiedam historical-film scaffold.

## First run
1. Open Blender → **Scripting**.
2. Open `scripts/bootstrap_master_scene.py`.
3. Set `REFERENCE_IMAGE_PATH` to the local absolute path of the 941×1672 master image.
4. Run the script.
5. Switch to camera view (`Numpad 0`).

The script creates `HISTORICAL_FILM_MASTER` with:
- `Camera_Master`
- exact source render resolution: 941×1672
- refined target-row proxies `LT01..LT05`, `PLOT01`, `RN01`
- `PLOT_SLOT_REFERENCE`
- A01..A08 image-space anchors
- `GROUND_SQUARE`
- provisional tree perspective markers
- empty 1891–93 canal/quay/worker/cart collections

Pixel calibration lives in `../docs/MASTER_PIXEL_CALIBRATION_941x1672.json` and is also stored as custom `target_*_px` properties on the target-row proxy objects.

## Important rule
The generated geometry is a **camera-match scaffold**, not a finished reconstruction. The starting camera lens/location and world-space proxy dimensions remain provisional. Do not add facade detail, historical props or textures until the silhouette and street geometry match the master by overlay.

## Camera-match order
1. Temporarily unlock `Camera_Master` transforms.
2. Match roll/horizon first.
3. Match pitch.
4. Adjust lens and camera distance together.
5. Align the target-row baseline to y=1082 (measured shop-window sill) in the 941×1672 frame.
6. Fit `LT01..LT05` visible frontage boundaries.
7. Fit `PLOT01` to approx x=312..398.
8. Fit `RN01` to approx x=398..429.
9. Fit roof peaks to the object's `target_roof_peak_*_px` custom properties.
10. Fit square/street geometry and retained tree anchors.
11. Re-lock camera transforms.
12. Overlay render/reference; after this point correct local geometry rather than moving the camera.

## PLOT01 rule
`PLOT01` is a **slot**, not a facade that must survive through time. Era-specific historical replacements stay inside `PLOT_SLOT_REFERENCE`. The later/current mass can be hidden and replaced by `PLOT01_1892`, `PLOT01_1907`, etc., without changing the camera or slot boundaries.

## Calibration caveat
Some facade/parcel boundaries are obscured by trees in the master image. The current pixel values are first-pass visual targets. Refine them only through overlay inspection; do not pretend hidden boundaries are known more precisely than the source supports.

## Recommended file progression
- `SCHIEDAM_MASTER_CAMERA_v01.blend`
- `SCHIEDAM_NEUTRAL_MASTER_v01.blend`
- `SCHIEDAM_1891_93_v01.blend`

Do not overwrite the solved camera file with era-specific changes.
