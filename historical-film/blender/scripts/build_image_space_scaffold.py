"""Build a camera-locked image-space scaffold for the Schiedam target row.

Purpose
-------
This script does NOT reconstruct true-world geometry. It creates silhouette planes
that project to the calibrated pixel coordinates of the supplied master frame.
Use these planes as a visual target while fitting the real 3D proxy geometry.

Workflow
--------
1. Run bootstrap_master_scene.py first.
2. Run this script.
3. Enter Camera View.
4. Fit the real proxy buildings to the generated image-space silhouettes.
5. Once the proxies match, hide this scaffold and continue with the neutral master.

The scaffold is deliberately single-view. That is useful here because the film's
historical frames must preserve one fixed master camera.
"""

import bpy
import json
from mathutils import Vector
from pathlib import Path

ROOT_NAME = "HISTORICAL_FILM_MASTER"
CAMERA_NAME = "Camera_Master"
SCAFFOLD_COLLECTION = "06_IMAGE_SPACE_SCAFFOLD"

# If running from Blender's Text Editor, set this path manually if needed.
CALIBRATION_PATH = "//historical-film/blender/calibration/street_image_space_blueprint.json"

# Distance of the 2.5D silhouette plane from the camera. Its exact value is not
# important for image alignment as long as all points use the same camera model.
DEPTH_METERS = 30.0


def clear_collection(name):
    col = bpy.data.collections.get(name)
    if col:
        for obj in list(col.objects):
            bpy.data.objects.remove(obj, do_unlink=True)
        for parent in bpy.data.collections:
            if col.name in parent.children:
                parent.children.unlink(col)
        bpy.data.collections.remove(col)


def ensure_collection(name, parent):
    col = bpy.data.collections.get(name)
    if col is None:
        col = bpy.data.collections.new(name)
        parent.children.link(col)
    return col


def resolve_calibration_path():
    p = bpy.path.abspath(CALIBRATION_PATH)
    return Path(p)


def pixel_to_camera_local(u, v, camera, render_w, render_h, depth):
    """Convert top-left-origin render pixels to camera-local XYZ at fixed depth.

    Camera is forced to HORIZONTAL sensor fit so the math stays deterministic.
    """
    lens = camera.data.lens
    sensor_w = camera.data.sensor_width
    sensor_h = sensor_w * (render_h / render_w)

    sx = ((u / render_w) - 0.5) * sensor_w
    sy = (0.5 - (v / render_h)) * sensor_h

    x = (sx / lens) * depth
    y = (sy / lens) * depth
    z = -depth
    return Vector((x, y, z))


def pixel_to_world(u, v, camera, render_w, render_h, depth):
    local = pixel_to_camera_local(u, v, camera, render_w, render_h, depth)
    return camera.matrix_world @ local


def make_polygon_object(name, pixel_polygon, camera, render_w, render_h, depth, collection):
    verts = [pixel_to_world(u, v, camera, render_w, render_h, depth) for u, v in pixel_polygon]
    mesh = bpy.data.meshes.new(f"{name}_MESH")
    mesh.from_pydata([tuple(v) for v in verts], [], [tuple(range(len(verts)))])
    mesh.update()

    obj = bpy.data.objects.new(name, mesh)
    collection.objects.link(obj)
    obj.display_type = 'WIRE'
    obj.show_in_front = True
    obj.hide_render = True
    return obj


def make_anchor(name, pixel_xy, camera, render_w, render_h, depth, collection):
    world = pixel_to_world(pixel_xy[0], pixel_xy[1], camera, render_w, render_h, depth)
    obj = bpy.data.objects.new(name, None)
    obj.empty_display_type = 'SPHERE'
    obj.empty_display_size = 0.18
    obj.location = world
    obj.show_in_front = True
    collection.objects.link(obj)
    return obj


def main():
    scene = bpy.context.scene
    root = bpy.data.collections.get(ROOT_NAME)
    if root is None:
        raise RuntimeError("Run bootstrap_master_scene.py first; HISTORICAL_FILM_MASTER is missing.")

    camera = bpy.data.objects.get(CAMERA_NAME)
    if camera is None or camera.type != 'CAMERA':
        raise RuntimeError("Camera_Master not found.")

    # Keep projection deterministic for pixel-to-ray conversion.
    camera.data.sensor_fit = 'HORIZONTAL'
    camera.data.shift_x = 0.0
    camera.data.shift_y = 0.0

    path = resolve_calibration_path()
    if not path.exists():
        raise RuntimeError(f"Calibration JSON not found: {path}")

    with path.open('r', encoding='utf-8') as f:
        data = json.load(f)

    full_w = int(data['full_frame_size']['width'])
    full_h = int(data['full_frame_size']['height'])
    offset_x = int(data['crop_offset_in_full_frame']['x'])
    offset_y = int(data['crop_offset_in_full_frame']['y'])

    scene.render.resolution_x = full_w
    scene.render.resolution_y = full_h
    scene.render.resolution_percentage = 100

    clear_collection(SCAFFOLD_COLLECTION)
    col = ensure_collection(SCAFFOLD_COLLECTION, root)

    for b in data['buildings']:
        full_poly = [[p[0] + offset_x, p[1] + offset_y] for p in b['silhouette_polygon']]
        obj = make_polygon_object(
            f"IMG_{b['id']}_SILHOUETTE",
            full_poly,
            camera,
            full_w,
            full_h,
            DEPTH_METERS,
            col,
        )
        obj['building_id'] = b['id']
        obj['source'] = 'street_image_space_blueprint.json'
        obj['target_xL_px'] = b['xL'] + offset_x
        obj['target_xR_px'] = b['xR'] + offset_x
        obj['target_base_y_px'] = b['base_y'] + offset_y
        obj['target_roof_peak_x_px'] = b['roof_peak'][0] + offset_x
        obj['target_roof_peak_y_px'] = b['roof_peak'][1] + offset_y
        obj['status'] = 'IMAGE_SPACE_TARGET_DO_NOT_MODEL_FROM_THIS'

    for name, crop_xy in data.get('anchors', {}).items():
        full_xy = [crop_xy[0] + offset_x, crop_xy[1] + offset_y]
        anchor = make_anchor(
            f"IMG_ANCHOR_{name}", full_xy, camera, full_w, full_h, DEPTH_METERS, col
        )
        anchor['target_x_px'] = full_xy[0]
        anchor['target_y_px'] = full_xy[1]
        anchor['lock'] = 'IMAGE_SPACE_HARD_TARGET'

    col['purpose'] = 'Exact single-view pixel target for camera-match and proxy fitting.'
    col['depth_m'] = DEPTH_METERS
    col['do_not_use_as_historical_truth'] = True

    print("Image-space scaffold created.")
    print("Fit 3D proxies to IMG_* silhouettes in Camera View, then hide this collection.")


if __name__ == '__main__':
    main()
