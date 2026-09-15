"""Report local image-space pixel alignment error for target-row proxies.

This validator is intentionally NOT a canonical-camera solver. It measures how
well the local scaffold matches the stored pixel targets under
Camera_Validation_Local. The canonical geographic camera remains in erebrum-system.
"""

import bpy
import math
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector

CAMERA_NAME = "Camera_Validation_Local"
IDS = ["LT01", "LT02", "LT03", "LT04", "LT05", "PLOT01", "RN01"]


def to_pixel(scene, camera, world):
    co = world_to_camera_view(scene, camera, world)
    w = scene.render.resolution_x * scene.render.resolution_percentage / 100.0
    h = scene.render.resolution_y * scene.render.resolution_percentage / 100.0
    return co.x * w, (1.0 - co.y) * h


def local_to_world(obj, xyz):
    return obj.matrix_world @ Vector(xyz)


def front_body_measurements(scene, camera, body):
    x0 = -body.dimensions.x / 2.0
    x1 = body.dimensions.x / 2.0
    yf = -body.dimensions.y / 2.0
    z0 = -body.dimensions.z / 2.0
    p_left = local_to_world(body, (x0, yf, z0))
    p_right = local_to_world(body, (x1, yf, z0))
    lpx = to_pixel(scene, camera, p_left)
    rpx = to_pixel(scene, camera, p_right)
    return {"xL": lpx[0], "xR": rpx[0], "base_y_left": lpx[1], "base_y_right": rpx[1]}


def front_roof_peak(scene, camera, roof):
    if not roof.data or len(roof.data.vertices) < 3:
        return None
    world = roof.matrix_world @ roof.data.vertices[2].co
    return to_pixel(scene, camera, world)


def fmt(v):
    return f"{v:+7.2f}"


def main():
    scene = bpy.context.scene
    camera = bpy.data.objects.get(CAMERA_NAME)
    if camera is None:
        raise RuntimeError("Camera_Validation_Local not found. Run bootstrap_master_scene.py first.")

    sq_errors = []
    print("\n=== LOCAL IMAGE-SPACE PROXY ALIGNMENT ===")
    print("ID       dXL     dXR    dBASE   dPEAKX  dPEAKY    RMS")
    print("---------------------------------------------------------")

    for bid in IDS:
        body = bpy.data.objects.get(f"{bid}_BODY")
        roof = bpy.data.objects.get(f"{bid}_ROOF")
        if body is None or roof is None:
            print(f"{bid:<7} missing body/roof")
            continue

        m = front_body_measurements(scene, camera, body)
        peak = front_roof_peak(scene, camera, roof)
        if peak is None:
            print(f"{bid:<7} missing roof peak")
            continue

        txl = float(body.get("target_xL_px", 0.0))
        txr = float(body.get("target_xR_px", 0.0))
        tbase = float(body.get("target_base_y_px", 0.0))
        tpx = float(body.get("target_roof_peak_x_px", 0.0))
        tpy = float(body.get("target_roof_peak_y_px", 0.0))
        actual_base = (m["base_y_left"] + m["base_y_right"]) / 2.0
        errs = [m["xL"]-txl, m["xR"]-txr, actual_base-tbase, peak[0]-tpx, peak[1]-tpy]
        rms = math.sqrt(sum(e*e for e in errs) / len(errs))
        sq_errors.extend(e*e for e in errs)

        body["alignment_rms_px"] = rms
        body["alignment_dXL_px"] = errs[0]
        body["alignment_dXR_px"] = errs[1]
        body["alignment_dBASE_px"] = errs[2]
        body["alignment_dPEAKX_px"] = errs[3]
        body["alignment_dPEAKY_px"] = errs[4]

        print(f"{bid:<7} {fmt(errs[0])} {fmt(errs[1])} {fmt(errs[2])} {fmt(errs[3])} {fmt(errs[4])}  {rms:7.2f}")

    if sq_errors:
        global_rms = math.sqrt(sum(sq_errors) / len(sq_errors))
        print("---------------------------------------------------------")
        print(f"GLOBAL LOCAL-SCAFFOLD RMS: {global_rms:.2f} px")
        print("Targets: <=5 px ordinary boundaries; <=3 px PLOT01/RN01 where visible.")
        print("This score does not validate or alter the canonical geographic camera.")

    print("===============================================\n")


if __name__ == "__main__":
    main()
