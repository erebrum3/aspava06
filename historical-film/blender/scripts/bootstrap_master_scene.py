"""Bootstrap the LOCAL image-space validation scaffold for the Schiedam film.

Important: this file does NOT create or solve the canonical geographic camera.
The canonical camera is owned by erebrum-system (85 m / 282 deg / 78 deg /
vertical FOV 35 deg / roll 0 / 941x1672). This script creates a local camera
named Camera_Validation_Local only so masks, proxy silhouettes and pixel targets
can be checked inside a lightweight Blender scene.
"""

import bpy
import math
from mathutils import Vector

ROOT_NAME = "HISTORICAL_FILM_VALIDATION_LOCAL"
VALIDATION_CAMERA_NAME = "Camera_Validation_Local"
REFERENCE_IMAGE_PATH = ""
RESET_GENERATED_ROOT = True

RENDER_X = 941
RENDER_Y = 1672
VFOV_DEG = 35.0
SENSOR_HEIGHT_MM = 36.0
PIXEL_TO_PROXY_X = 0.08
MASTER_PLOT_CENTER_PX = 355.0

CANONICAL_CAMERA = {
    "source": "erebrum-system/sites/aspava/video-tests/2026-07-24/master-85m-78deg/geometri-gercegi/kamera-KANONIK.json",
    "rd_x": 87444.969,
    "rd_y": 436872.101,
    "alt_m": 85.0,
    "heading_deg": 282.0,
    "tilt_deg": 78.0,
    "vfov_deg": 35.0,
    "roll_deg": 0.0,
    "render": "941x1672",
}

BUILDINGS = [
    {"id": "LT01",   "xL": 52,  "xR": 102, "peak": (79, 925),  "base_y": 1082, "h": 6.2, "roof": 2.0, "lock": "HARD"},
    {"id": "LT02",   "xL": 102, "xR": 151, "peak": (126, 922), "base_y": 1082, "h": 6.2, "roof": 2.1, "lock": "HARD"},
    {"id": "LT03",   "xL": 151, "xR": 201, "peak": (176, 922), "base_y": 1082, "h": 6.2, "roof": 2.1, "lock": "HARD"},
    {"id": "LT04",   "xL": 201, "xR": 250, "peak": (226, 920), "base_y": 1082, "h": 6.2, "roof": 2.1, "lock": "HARD"},
    {"id": "LT05",   "xL": 250, "xR": 312, "peak": (280, 919), "base_y": 1082, "h": 6.4, "roof": 2.2, "lock": "HARD"},
    {"id": "PLOT01", "xL": 312, "xR": 398, "peak": (354, 946), "base_y": 1082, "h": 7.0, "roof": 2.0, "lock": "FOOTPRINT"},
    {"id": "RN01",   "xL": 398, "xR": 429, "peak": (414, 963), "base_y": 1082, "h": 5.3, "roof": 1.5, "lock": "HARD"},
]

AOI_PX = (45, 905, 435, 1090)
ROW_GROUNDLINE_Y = 1082
LIGHT_ANCHOR_PX = (362, 1062)


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
    camera_col = ensure_collection("00_LOCAL_VALIDATION_CAMERA", root)
    ref_col = ensure_collection("01_REFERENCE", root)
    geo_col = ensure_collection("02_GEO_PROXY", root)
    anchor_col = ensure_collection("03_ANCHORS", root)
    ground_col = ensure_collection("04_GROUND", root)
    tree_col = ensure_collection("05_TREE_MARKERS", root)
    era_col = ensure_collection("10_ERA_1891_93_CLOSEUP", root)
    for name in ["CANAL_1891_93", "QUAY_1891_93", "WORKERS_1891_93", "HORSE_CART_1891_93"]:
        ensure_collection(name, era_col)

    # Local projection helper only. Matching the canonical vFOV prevents a second
    # competing lens convention while keeping world coordinates intentionally local.
    cam_data = bpy.data.cameras.new(f"{VALIDATION_CAMERA_NAME}_DATA")
    cam_data.sensor_fit = 'VERTICAL'
    cam_data.sensor_height = SENSOR_HEIGHT_MM
    cam_data.lens = SENSOR_HEIGHT_MM / (2.0 * math.tan(math.radians(VFOV_DEG) / 2.0))
    cam = bpy.data.objects.new(VALIDATION_CAMERA_NAME, cam_data)
    camera_col.objects.link(cam)
    cam.location = (0.0, -32.0, 22.0)
    look_at(cam, (0.0, 0.0, 4.0))
    cam.lock_location = (True, True, True)
    cam.lock_rotation = (True, True, True)
    cam["status"] = "LOCAL_IMAGE_SPACE_VALIDATION_ONLY"
    cam["not_canonical_geo_camera"] = True
    cam["canonical_source"] = CANONICAL_CAMERA["source"]
    scene.camera = cam

    add_reference_image(ref_col)

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
    plot_slot["rule"] = "Era-specific PLOT01 replacements stay inside this slot."

    anchor_specs = {
        "A01_ROW_LEFT_GROUND": (52, 1082),
        "A02_LT05_ROOF": (280, 919),
        "A03_PLOT_LEFT_GROUND": (312, 1082),
        "A04_PLOT_CENTER_GROUND": (355, 1082),
        "A05_PLOT_RIGHT_GROUND": (398, 1082),
        "A06_RN_CENTER_GROUND": (414, 1082),
        "A07_RN_ROOF": (414, 963),
        "A08_ROW_RIGHT_GROUND": (429, 1082),
        "A09_WARM_LIGHT": LIGHT_ANCHOR_PX,
    }
    for name, (px, py) in anchor_specs.items():
        x = (px - MASTER_PLOT_CENTER_PX) * PIXEL_TO_PROXY_X
        anchor = add_empty(name, (x, -3.0, 0.15 if py >= 1000 else 7.5), anchor_col)
        anchor["target_x_px"] = px
        anchor["target_y_px"] = py
        anchor["lock"] = "IMAGE_SPACE_TARGET"

    ground = add_cube("GROUND_SQUARE", (4.0, -8.0, -0.15), (32.0, 18.0, 0.3), ground_col)
    ground.display_type = 'WIRE'
    ground["row_groundline_y_px"] = ROW_GROUNDLINE_Y

    for idx, loc in enumerate([(-8.0, -8.0, 2.0), (-2.5, -8.5, 2.0), (5.0, -8.0, 2.0), (11.0, -7.5, 2.0)], start=1):
        bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=0.14, depth=4.0, location=loc)
        tree = bpy.context.object
        tree.name = f"TREE_{idx:02d}_MARKER"
        link_only(tree, tree_col)
        tree["role"] = "PERSPECTIVE_ANCHOR_ONLY"

    root["master_image_size"] = "941x1672"
    root["aoi_px"] = str(AOI_PX)
    root["row_groundline_y_px"] = ROW_GROUNDLINE_Y
    root["warm_light_anchor_px"] = str(LIGHT_ANCHOR_PX)
    root["canonical_camera_source"] = CANONICAL_CAMERA["source"]
    root["workflow"] = "LOCAL_PIXEL_VALIDATION -> MASK_QA -> ERA_LOCAL_EDIT; CANONICAL CAMERA REMAINS IN EREBRUM-SYSTEM"

    print("Local historical-film validation scaffold created.")
    print("Camera_Validation_Local is NOT the canonical geographic camera.")
    print("Do not camera-solve here. Adjust local proxies/calibration only, then validate pixel error.")


if __name__ == "__main__":
    setup_scene()
