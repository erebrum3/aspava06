"""Build the single-view image-space target scaffold.

Run bootstrap_master_scene.py first. This uses Camera_Validation_Local, which is
only a local projection helper. It must not be confused with or exported as the
canonical geographic camera owned by erebrum-system.
"""

import bpy
import json
from mathutils import Vector
from pathlib import Path

ROOT_NAME = "HISTORICAL_FILM_VALIDATION_LOCAL"
CAMERA_NAME = "Camera_Validation_Local"
SCAFFOLD_COLLECTION = "06_IMAGE_SPACE_SCAFFOLD"
CALIBRATION_PATH = "//historical-film/blender/calibration/street_image_space_blueprint.json"
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


def pixel_to_camera_local(u, v, camera, render_w, render_h, depth):
    lens = camera.data.lens
    sensor_h = camera.data.sensor_height
    sensor_w = sensor_h * (render_w / render_h)
    sx = ((u / render_w) - 0.5) * sensor_w
    sy = (0.5 - (v / render_h)) * sensor_h
    return Vector(((sx / lens) * depth, (sy / lens) * depth, -depth))


def pixel_to_world(u, v, camera, render_w, render_h, depth):
    return camera.matrix_world @ pixel_to_camera_local(u, v, camera, render_w, render_h, depth)


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
        raise RuntimeError("Run bootstrap_master_scene.py first; local validation root is missing.")

    camera = bpy.data.objects.get(CAMERA_NAME)
    if camera is None or camera.type != 'CAMERA':
        raise RuntimeError("Camera_Validation_Local not found.")

    path = Path(bpy.path.abspath(CALIBRATION_PATH))
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
        obj = make_polygon_object(f"IMG_{b['id']}_SILHOUETTE", full_poly, camera, full_w, full_h, DEPTH_METERS, col)
        obj['building_id'] = b['id']
        obj['target_xL_px'] = b['xL'] + offset_x
        obj['target_xR_px'] = b['xR'] + offset_x
        obj['target_base_y_px'] = b['base_y'] + offset_y
        obj['target_roof_peak_x_px'] = b['roof_peak'][0] + offset_x
        obj['target_roof_peak_y_px'] = b['roof_peak'][1] + offset_y
        obj['status'] = 'IMAGE_SPACE_TARGET_ONLY'

    for name, crop_xy in data.get('anchors', {}).items():
        full_xy = [crop_xy[0] + offset_x, crop_xy[1] + offset_y]
        anchor = make_anchor(f"IMG_ANCHOR_{name}", full_xy, camera, full_w, full_h, DEPTH_METERS, col)
        anchor['target_x_px'] = full_xy[0]
        anchor['target_y_px'] = full_xy[1]

    col['purpose'] = 'Single-view pixel QA only; not geographic camera truth.'
    col['depth_m'] = DEPTH_METERS
    print("Image-space scaffold created for Camera_Validation_Local.")


if __name__ == '__main__':
    main()
