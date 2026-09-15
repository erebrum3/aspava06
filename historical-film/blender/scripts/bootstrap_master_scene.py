"""Bootstrap the geometry-locked Schiedam historical-film master scene.

The master aerial is 941x1672. The script uses the exact source resolution and
stores first-pass image-space targets on every target-row proxy. These targets
are calibration guides, not surveyed geometry: trees and occlusion hide some
parcel edges, so final alignment must be refined by overlay.
"""

import bpy
from mathutils import Vector

ROOT_NAME = "HISTORICAL_FILM_MASTER"
REFERENCE_IMAGE_PATH = ""  # Set to the local absolute path of the 941x1672 master image.
RESET_GENERATED_ROOT = True

RENDER_X = 941
RENDER_Y = 1672
LENS_MM = 65.0
SENSOR_WIDTH_MM = 36.0
PIXEL_TO_PROXY_X = 0.08  # Relative scaffold scale only; not a real-world measurement.
MASTER_PLOT_CENTER_PX = 355.0

# First-pass calibration extracted from the supplied master frame.
# IDs intentionally describe role rather than assuming historical parcel identity.
BUILDINGS = [
    {"id": "LT01",   "xL": 52,  "xR": 102, "peak": (79, 925),  "base_y": 1062, "h": 6.2, "roof": 2.0, "lock": "HARD"},
    {"id": "LT02",   "xL": 102, "xR": 151, "peak": (126, 922), "base_y": 1062, "h": 6.2, "roof": 2.1, "lock": "HARD"},
    {"id": "LT03",   "xL": 151, "xR": 201, "peak": (176, 922), "base_y": 1062, "h": 6.2, "roof": 2.1, "lock": "HARD"},
    {"id": "LT04",   "xL": 201, "xR": 250, "peak": (226, 920), "base_y": 1062, "h": 6.2, "roof": 2.1, "lock": "HARD"},
    {"id": "LT05",   "xL": 250, "xR": 312, "peak": (280, 919), "base_y": 1062, "h": 6.4, "roof": 2.2, "lock": "HARD"},
    {"id": "PLOT01", "xL": 312, "xR": 398, "peak": (354, 946), "base_y": 1062, "h": 7.0, "roof": 2.0, "lock": "FOOTPRINT"},
    {"id": "RN01",   "xL": 398, "xR": 429, "peak": (414, 963), "base_y": 1062, "h": 5.3, "roof": 1.5, "lock": "HARD"},
]

AOI_PX = (45, 905, 435, 1072)
ROW_BASELINE_PX = ((48, 1061), (425, 1061))


def px_center_to_world_x(xL, xR):
    return (((xL + xR) / 2.0) - MASTER_PLOT_CENTER_PX) * PIXEL_TO_PROXY_X


def px_width_to_world(xL, xR):
    return (xR - xL) * PIXEL_TO_PROXY_X


def remove_collection_recursive(collection):
    for child in list(collection.children):
        remove_collection_recursive(child)
    for obj in list(collection.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    bpy.data.collections.remove(collection)


def ensure_collection(name, parent=None):
    col = bpy.data.collections.get(name)
    if col is None:
        col = bpy.data.collections.new(name)
        (bpy.context.scene.collection if parent is None else parent).children.link(col)
    return col


def link_only(obj, collection):
    for col in list(obj.users_collection):
        col.objects.unlink(obj)
    collection.objects.link(obj)


def add_cube(name, location, dimensions, collection):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    link_only(obj, collection)
    return obj


def add_gable_roof(name, x, width, depth, eave_z, roof_height, collection):
    mesh = bpy.data.meshes.new(f"{name}_MESH")
    x0, x1 = -width / 2.0, width / 2.0
    y0, y1 = -depth / 2.0, depth / 2.0
    verts = [
        (x0, y0, 0), (x1, y0, 0), (0, y0, roof_height),
        (x0, y1, 0), (x1, y1, 0), (0, y1, roof_height),
    ]
    faces = [(0, 1, 2), (3, 5, 4), (0, 3, 4, 1), (1, 4, 5, 2), (2, 5, 3, 0)]
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    obj.location = (x, 0.0, eave_z)
    collection.objects.link(obj)
    return obj


def add_empty(name, location, collection, display_type='SPHERE', size=0.35):
    obj = bpy.data.objects.new(name, None)
    obj.empty_display_type = display_type
    obj.empty_display_size = size
    obj.location = location
    collection.objects.link(obj)
    return obj


def look_at(obj, target):
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()


def add_reference_image(collection):
    if not REFERENCE_IMAGE_PATH:
        return None
    try:
        image = bpy.data.images.load(REFERENCE_IMAGE_PATH, check_existing=True)
    except RuntimeError as exc:
        print(f"Reference image could not be loaded: {exc}")
        return None
    obj = bpy.data.objects.new("REF_MASTER_AERIAL", None)
    obj.empty_display_type = 'IMAGE'
    obj.data = image
    obj.empty_display_size = 20.0
    obj.color[3] = 0.65
    obj.show_in_front = True
    collection.objects.link(obj)
    return obj


def attach_pixel_targets(obj, spec):
    obj["target_xL_px"] = spec["xL"]
    obj["target_xR_px"] = spec["xR"]
    obj["target_roof_peak_x_px"] = spec["peak"][0]
    obj["target_roof_peak_y_px"] = spec["peak"][1]
    obj["target_base_y_px"] = spec["base_y"]


def setup_scene():
    scene = bpy.context.scene
    scene.render.resolution_x = RENDER_X
    scene.render.resolution_y = RENDER_Y
    scene.render.resolution_percentage = 100

    if RESET_GENERATED_ROOT:
        old = bpy.data.collections.get(ROOT_NAME)
        if old:
            remove_collection_recursive(old)

    root = ensure_collection(ROOT_NAME)
    camera_col = ensure_collection("00_CAMERA", root)
    ref_col = ensure_collection("01_REFERENCE", root)
    geo_col = ensure_collection("02_GEO_PROXY", root)
    anchor_col = ensure_collection("03_ANCHORS", root)
    ground_col = ensure_collection("04_GROUND", root)
    tree_col = ensure_collection("05_TREE_MARKERS", root)
    era_col = ensure_collection("10_ERA_1891_93", root)
    ensure_collection("CANAL_1891_93", era_col)
    ensure_collection("QUAY_1891_93", era_col)
    ensure_collection("WORKERS_1891_93", era_col)
    ensure_collection("HORSE_CART_1891_93", era_col)

    cam_data = bpy.data.cameras.new("Camera_Master_DATA")
    cam_data.lens = LENS_MM
    cam_data.sensor_width = SENSOR_WIDTH_MM
    cam = bpy.data.objects.new("Camera_Master", cam_data)
    camera_col.objects.link(cam)
    cam.location = (0.0, -32.0, 22.0)
    look_at(cam, (0.0, 0.0, 4.0))
    cam.lock_location = (True, True, True)
    cam.lock_rotation = (True, True, True)
    cam["status"] = "STARTING_CAMERA_NOT_SOLVED"
    cam["master_resolution"] = "941x1672"
    scene.camera = cam

    add_reference_image(ref_col)

    # Shallow depths are deliberate: only the camera-view silhouette matters at this stage.
    for spec in BUILDINGS:
        x = px_center_to_world_x(spec["xL"], spec["xR"])
        w = px_width_to_world(spec["xL"], spec["xR"])
        d = 5.5
        body = add_cube(f"{spec['id']}_BODY", (x, 0.0, spec["h"] / 2.0), (w, d, spec["h"]), geo_col)
        body["building_id"] = spec["id"]
        body["preserve_level"] = spec["lock"]
        body["role"] = "PLOT_SLOT" if spec["id"] == "PLOT01" else ("RIGHT_NEIGHBOUR" if spec["id"] == "RN01" else "LEFT_TERRACE")
        attach_pixel_targets(body, spec)

        roof = add_gable_roof(f"{spec['id']}_ROOF", x, w, d, spec["h"], spec["roof"], geo_col)
        roof["building_id"] = spec["id"]
        roof["preserve_level"] = spec["lock"]
        attach_pixel_targets(roof, spec)

    plot = next(item for item in BUILDINGS if item["id"] == "PLOT01")
    plot_x = px_center_to_world_x(plot["xL"], plot["xR"])
    plot_w = px_width_to_world(plot["xL"], plot["xR"])
    plot_slot = add_cube("PLOT_SLOT_REFERENCE", (plot_x, 0.0, 0.08), (plot_w, 5.5, 0.16), anchor_col)
    plot_slot.display_type = 'WIRE'
    plot_slot["target_xL_px"] = plot["xL"]
    plot_slot["target_xR_px"] = plot["xR"]
    plot_slot["rule"] = "Era-specific PLOT01 replacements must remain inside this slot."

    anchor_specs = {
        "A01_ROW_LEFT": (52, 1062),
        "A02_LT05_ROOF": (280, 919),
        "A03_PLOT_LEFT": (312, 1062),
        "A04_PLOT_CENTER": (355, 1062),
        "A05_PLOT_RIGHT": (398, 1062),
        "A06_RN_CENTER": (414, 1062),
        "A07_RN_ROOF": (414, 963),
        "A08_ROW_RIGHT": (429, 1062),
    }
    for name, (px, py) in anchor_specs.items():
        x = (px - MASTER_PLOT_CENTER_PX) * PIXEL_TO_PROXY_X
        anchor = add_empty(name, (x, -3.0, 0.15 if py >= 1000 else 7.5), anchor_col)
        anchor["target_x_px"] = px
        anchor["target_y_px"] = py
        anchor["lock"] = "HARD_IMAGE_SPACE_TARGET"

    ground = add_cube("GROUND_SQUARE", (4.0, -8.0, -0.15), (32.0, 18.0, 0.3), ground_col)
    ground.display_type = 'WIRE'
    ground["target_row_baseline_px"] = str(ROW_BASELINE_PX)
    ground["preserve_level"] = "HARD_SHAPE_AFTER_MATCH"

    # Perspective markers only; positions are deliberately provisional.
    for idx, loc in enumerate([(-8.0, -8.0, 2.0), (-2.5, -8.5, 2.0), (5.0, -8.0, 2.0), (11.0, -7.5, 2.0)], start=1):
        bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=0.14, depth=4.0, location=loc)
        tree = bpy.context.object
        tree.name = f"TREE_{idx:02d}_MARKER"
        link_only(tree, tree_col)
        tree["role"] = "PERSPECTIVE_ANCHOR_ONLY"

    root["master_image_size"] = "941x1672"
    root["aoi_px"] = str(AOI_PX)
    root["workflow"] = "CAMERA_MATCH -> PIXEL_OVERLAY_CHECK -> GEOMETRY_LOCK -> NEUTRAL_MASTER -> ERA_TRANSFORMS"
    root["calibration_status"] = "FIRST_PASS; REFINE OCCLUDED EDGES BY OVERLAY"

    print("Historical Film calibrated master scaffold created.")
    print("Render resolution is locked to the 941x1672 source master.")
    print("Next: unlock Camera_Master and align proxy boundaries/roof peaks to their target_*_px properties.")


if __name__ == "__main__":
    setup_scene()
