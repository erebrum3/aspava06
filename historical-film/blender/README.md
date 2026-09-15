# Blender master-scene workflow

This folder is for the geometry-locked Schiedam historical-film setup.

## First run

1. Open Blender and switch to **Scripting**.
2. Open `scripts/bootstrap_master_scene.py`.
3. Optional: set `REFERENCE_IMAGE_PATH` to an absolute path for the aerial master image.
4. Run the script.
5. Switch to camera view (`Numpad 0`).

The script creates `HISTORICAL_FILM_MASTER` with:

- `Camera_Master`
- TR01..TR06 proxy bodies and roofs
- `PLOT_SLOT_REFERENCE`
- A01..A08 alignment anchors
- `GROUND_SQUARE`
- tree markers
- empty 1891-93 canal/quay/worker/cart collections

## Important rule

The generated geometry is a **camera-match scaffold**, not a reconstruction. The starting camera and proxy dimensions are placeholders. Do not add façade detail, historical props or textures until the silhouette and street geometry match the master frame.

## Camera-match order

1. Temporarily unlock `Camera_Master` transforms.
2. Match roll/horizon first.
3. Match pitch.
4. Adjust lens and camera distance together.
5. Align target-row ground line.
6. Fit TR01..TR06 widths/heights.
7. Fit roof peaks.
8. Fit `GROUND_SQUARE` and tree markers.
9. Re-lock camera transforms.
10. Overlay a viewport/render against the reference and correct local geometry rather than moving the camera again.

## TR05 / plot rule

TR05 is treated as a **parcel slot**, not as a façade that must survive through time. Its historical replacement must remain inside `PLOT_SLOT_REFERENCE`. The current TR05 mass can later be hidden and replaced by `TR05_1892`, `TR05_1907`, etc., while preserving the same slot and camera.

## File progression

Recommended saved files:

- `SCHIEDAM_MASTER_CAMERA_v01.blend`
- `SCHIEDAM_NEUTRAL_MASTER_v01.blend`
- `SCHIEDAM_1891_93_v01.blend`

Do not overwrite the solved camera file with era-specific changes.
