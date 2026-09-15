"""Bootstrap the Schiedam historical-film master scene in Blender.

Run inside Blender's Scripting workspace. The script creates a non-destructive
master collection containing:
- Camera_Master (2:3 portrait, 65 mm starting lens)
- TR01..TR06 proxy buildings
- PLOT_SLOT / right-neighbour metadata
- A01..A08 alignment anchors
- GROUND_SQUARE proxy
- TREE_01..TREE_04 marker cylinders
- dedicated 1891-93 collections for later canal-fill work

The dimensions below are placeholders for camera matching. They are deliberately
simple. Fit them to the reference image before adding architectural detail.
"""

import bpy
import math
from mathutils import Vector

ROOT_NAME = "HISTORICAL_FILM_MASTER"
REFERENCE_IMAGE_PATH = ""  # Optional absolute path to the aerial master image.
RESET_GENERATED_ROOT = True

RENDER_X = 1024
RENDER_Y = 1536
LENS_MM = 65.0
SENSOR_WIDTH_MM = 36.0

# Placeholder world-space layout. Keep IDs stable; change only dimensions/positions.
BUILDINGS = [
    {"id": "TR01", "x": -11.0, "w": 3.2, "d": 6.0, "h": 6.0, "roof": 2.2, "lock": "HARD"},
    {"id": "TR02", "x": -7.8,  "w": 3.0, "d": 6.0, "h": 6.1, "roof": 2.4, "lock": "HARD"},
    {"id": "TR03", "x": -4.8,  "w": 3.1, "d": 6.0, "h": 6.0, "roof": 2.3, "lock": "HARD"},
    {"id": "TR04", "x": -1.7,  "w": 3.3, "d": 6.2, "h": 6.2, "roof": 2.1, "lock": "HARD"},
    {"id": "TR05", "x":  1.8,  "w": 3.8, "d": 6.4, "h": 7.0, "roof": 2.0, "lock": "FOOTPRINT"},
    {"id": "TR06", "x":  5.4,  "w": 3.0, "d": 5.8, "h": 5.3, "roof": 1.8, "lock": "HARD"},
]

ANCHORS = {
    "A01_LEFT_ROW_START": (-12.6, 0.0, 0.0),
    "A02_LEFT_ROOF_RHYTHM": (-7.8, 0.0, 8.5),
    "A03_PLOT_LEFT": (-0.1, 0.0, 0.0),
    "A04_PLOT_CENTER": (1.8, 0.0, 0.0),
    "A05_PLOT_RIGHT": (3.7, 0.0, 0.0),
    "A06_RIGHT_NEIGHBOUR_DOOR": (5.4, -3.05, 1.1),
    "A07_RIGHT_NEIGHBOUR_ROOF": (5.4, 0.0, 7.1),
    "A08_ROW_END": (6.9, 0.0, 0.0),
}

TREE_MARKERS = [
    (-9.0, -7.5, 0.0),
    (-3.5, -8.3, 0.0),
    (2.3, -8.0, 0.0),
    (6.0, -7.0, 0.0),
]


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
        if parent is None:
            bpy.context.scene.collection.children.link(col)
        else:
            parent.children.link(col)
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
    # Triangular prism aligned along Y.
    mesh = bpy.data.meshes.new(f"{name}_MESH")
    x0, x1 = -width / 2.0, width / 2.0
    y0, y1 = -depth / 2.0, depth / 2.0
    verts = [
        (x0, y0, 0), (x1, y0, 0), (0, y0, roof_height),
        (x0, y1, 0), (x1, y1, 0), (0, y1, roof_height),
    ]
    faces = [
        (0, 1, 2), (3, 5, 4),
        (0, 3, 4, 1),
        (1, 4, 5, 2),
        (2, 5, 3, 0),
    ]
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

    # Camera: intentionally a starting point, not a solved camera.
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
    cam["rule"] = "Unlock only during camera-match. Re-lock after alignment."
    scene.camera = cam

    add_reference_image(ref_col)

    for spec in BUILDINGS:
        body = add_cube(
            f"{spec['id']}_BODY",
            (spec['x'], 0.0, spec['h'] / 2.0),
            (spec['w'], spec['d'], spec['h']),
            geo_col,
        )
        body["building_id"] = spec["id"]
        body["preserve_level"] = spec["lock"]
        body["historical_action"] = (
            "REPLACE_WITH_MODEST_2_STOREY_HOUSE" if spec["id"] == "TR05"
            else "PRESERVE_GEOMETRY"
        )
        if spec["id"] == "TR05":
            body["role"] = "PLOT_SLOT"
        elif spec["id"] == "TR06":
            body["role"] = "RIGHT_NEIGHBOUR"
        else:
            body["role"] = "TARGET_ROW"

        roof = add_gable_roof(
            f"{spec['id']}_ROOF",
            spec['x'], spec['w'], spec['d'], spec['h'], spec['roof'], geo_col
        )
        roof["building_id"] = spec["id"]
        roof["preserve_level"] = spec["lock"]

    # Plot slot outline: use as the immutable footprint reference for historical replacements.
    plot = next(item for item in BUILDINGS if item["id"] == "TR05")
    plot_slot = add_cube(
        "PLOT_SLOT_REFERENCE",
        (plot["x"], 0.0, 0.08),
        (plot["w"], plot["d"], 0.16),
        anchor_col,
    )
    plot_slot.display_type = 'WIRE'
    plot_slot["rule"] = "Historical TR05 geometry must remain inside this footprint."

    for name, loc in ANCHORS.items():
        anchor = add_empty(name, loc, anchor_col)
        anchor["lock"] = "HARD"

    ground = add_cube("GROUND_SQUARE", (0.0, -7.0, -0.15), (28.0, 16.0, 0.3), ground_col)
    ground.display_type = 'WIRE'
    ground["preserve_level"] = "HARD_SHAPE_AFTER_MATCH"

    for idx, loc in enumerate(TREE_MARKERS, start=1):
        bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=0.14, depth=4.0, location=(loc[0], loc[1], 2.0))
        tree = bpy.context.object
        tree.name = f"TREE_{idx:02d}_MARKER"
        link_only(tree, tree_col)
        tree["role"] = "PERSPECTIVE_ANCHOR_ONLY"

    root["workflow"] = "CAMERA_MATCH -> GEOMETRY_LOCK -> NEUTRAL_MASTER -> ERA_TRANSFORMS"
    root["do_not_detail_yet"] = True

    print("Historical Film master scene created.")
    print("Next: unlock Camera_Master temporarily and fit proxies to the master reference.")


if __name__ == "__main__":
    setup_scene()
