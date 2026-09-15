"""Generate deterministic edit masks from the Schiedam image-space blueprint.

White pixels are editable. Black pixels must be restored from the source frame.
This script is intentionally independent of Blender and only requires Pillow.

Usage:
    python historical-film/tools/generate_edit_masks.py \
      historical-film/blender/calibration/street_image_space_blueprint.json \
      ./out_masks
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from PIL import Image, ImageDraw


def to_full(poly, offset_x, offset_y):
    return [(int(x + offset_x), int(y + offset_y)) for x, y in poly]


def save_mask(path: Path, size, polygons):
    img = Image.new("L", size, 0)
    draw = ImageDraw.Draw(img)
    for poly in polygons:
        draw.polygon(poly, fill=255)
    img.save(path)


def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: generate_edit_masks.py <calibration.json> <output_dir>")

    calibration_path = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])
    output_dir.mkdir(parents=True, exist_ok=True)

    data = json.loads(calibration_path.read_text(encoding="utf-8"))
    full_w = int(data["full_frame_size"]["width"])
    full_h = int(data["full_frame_size"]["height"])
    off_x = int(data["crop_offset_in_full_frame"]["x"])
    off_y = int(data["crop_offset_in_full_frame"]["y"])
    size = (full_w, full_h)

    buildings = {b["id"]: b for b in data["buildings"]}
    plot_poly = to_full(buildings["PLOT01"]["silhouette_polygon"], off_x, off_y)

    row_polys = [
        to_full(b["silhouette_polygon"], off_x, off_y)
        for b in data["buildings"]
    ]

    street_crop_poly = data["editable_regions"]["STREET_SURFACE_PRIMARY"]["polygon"]
    street_poly = to_full(street_crop_poly, off_x, off_y)

    protected_ids = data["mask_policy"]["protected_buildings"]
    protected_polys = [
        to_full(buildings[bid]["silhouette_polygon"], off_x, off_y)
        for bid in protected_ids
    ]

    save_mask(output_dir / "mask_edit_plot01.png", size, [plot_poly])
    save_mask(output_dir / "mask_edit_street_surface.png", size, [street_poly])
    save_mask(output_dir / "mask_edit_1891_93_combined.png", size, [plot_poly, street_poly])
    save_mask(output_dir / "mask_target_row_all.png", size, row_polys)
    save_mask(output_dir / "mask_protected_buildings.png", size, protected_polys)

    # Inverse of the combined editable region. Useful for compositing/restoration.
    combined = Image.open(output_dir / "mask_edit_1891_93_combined.png").convert("L")
    inverse = combined.point(lambda p: 255 - p)
    inverse.save(output_dir / "mask_restore_from_source.png")

    print(f"Generated masks in: {output_dir.resolve()}")
    print("Policy: WHITE=editable, BLACK=restore from source")


if __name__ == "__main__":
    main()
