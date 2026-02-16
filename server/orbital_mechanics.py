#!/usr/bin/env python3
"""
Orbital mechanics calculations using two-body dynamics.
Works with or without poliastro; falls back to basic Keplerian propagation.
"""
import json
import sys
import math

MU_KM3_S2 = 398600.4418  # Earth gravitational parameter
EARTH_RADIUS_KM = 6371.0


def keplerian_to_cartesian(a_km, e, i_deg, raan_deg, argp_deg, nu_deg):
    """Convert Keplerian elements to Cartesian state (position km, velocity km/s)."""
    i = math.radians(i_deg)
    raan = math.radians(raan_deg)
    argp = math.radians(argp_deg)
    nu = math.radians(nu_deg)
    mu = MU_KM3_S2
    a = a_km
    e = max(1e-10, min(e, 1 - 1e-10))
    r_norm = a * (1 - e * e) / (1 + e * math.cos(nu))
    r_pqw = [
        r_norm * math.cos(nu),
        r_norm * math.sin(nu),
        0,
    ]
    v_pqw = [
        -math.sqrt(mu / (a * (1 - e * e))) * math.sin(nu),
        math.sqrt(mu / (a * (1 - e * e))) * (e + math.cos(nu)),
        0,
    ]
    # PQW to ECI rotation
    c_raan, s_raan = math.cos(raan), math.sin(raan)
    c_i, s_i = math.cos(i), math.sin(i)
    c_argp, s_argp = math.cos(argp), math.sin(argp)
    r_x = (c_raan * c_argp - s_raan * s_argp * c_i) * r_pqw[0] + (-c_raan * s_argp - s_raan * c_argp * c_i) * r_pqw[1]
    r_y = (s_raan * c_argp + c_raan * s_argp * c_i) * r_pqw[0] + (-s_raan * s_argp + c_raan * c_argp * c_i) * r_pqw[1]
    r_z = s_argp * s_i * r_pqw[0] + c_argp * s_i * r_pqw[1]
    v_x = (c_raan * c_argp - s_raan * s_argp * c_i) * v_pqw[0] + (-c_raan * s_argp - s_raan * c_argp * c_i) * v_pqw[1]
    v_y = (s_raan * c_argp + c_raan * s_argp * c_i) * v_pqw[0] + (-s_raan * s_argp + c_raan * c_argp * c_i) * v_pqw[1]
    v_z = s_argp * s_i * v_pqw[0] + c_argp * s_i * v_pqw[1]
    return {
        "x": r_x, "y": r_y, "z": r_z,
        "vx": v_x, "vy": v_y, "vz": v_z,
    }


def cartesian_to_keplerian(x, y, z, vx, vy, vz):
    """Convert Cartesian state to Keplerian elements."""
    mu = MU_KM3_S2
    r = math.sqrt(x*x + y*y + z*z)
    v = math.sqrt(vx*vx + vy*vy + vz*vz)
    hx = y * vz - z * vy
    hy = z * vx - x * vz
    hz = x * vy - y * vx
    h = math.sqrt(hx*hx + hy*hy + hz*hz)
    n_x = -hy
    n_y = hx
    n = math.sqrt(n_x*n_x + n_y*n_y)
    e_vec_x = (vy * hz - vz * hy) / mu - x / r
    e_vec_y = (vz * hx - vx * hz) / mu - y / r
    e_vec_z = (vx * hy - vy * hx) / mu - z / r
    e = math.sqrt(e_vec_x*e_vec_x + e_vec_y*e_vec_y + e_vec_z*e_vec_z)
    energy = v*v/2 - mu/r
    if abs(e - 1) < 1e-10:
        a = 1e10
    else:
        a = -mu / (2 * energy)
    i_rad = math.acos(max(-1, min(1, hz / h)))
    raan_rad = math.atan2(n_y, n_x) if n > 1e-10 else 0
    argp_rad = math.atan2(
        e_vec_x * (n_x * math.cos(raan_rad) + n_y * math.sin(raan_rad)) + e_vec_y * (-n_x * math.sin(raan_rad) + n_y * math.cos(raan_rad)),
        e_vec_z * math.sin(i_rad)
    ) if e > 1e-10 and math.sin(i_rad) > 1e-10 else 0
    nu_rad = math.atan2(
        (x * (n_x * math.cos(raan_rad) + n_y * math.sin(raan_rad)) + y * (-n_x * math.sin(raan_rad) + n_y * math.cos(raan_rad))) / (r * math.sin(i_rad)) if math.sin(i_rad) > 1e-10 else 0,
        z / (r * math.cos(i_rad)) if math.cos(i_rad) != 0 else 0
    )
    if e < 1e-10:
        nu_rad = math.atan2(y, x) - raan_rad
    return {
        "semiMajorAxisKm": a,
        "eccentricity": e,
        "inclinationDeg": math.degrees(i_rad),
        "raanDeg": math.degrees(raan_rad) % 360,
        "argPerigeeDeg": math.degrees(argp_rad) % 360,
        "trueAnomalyDeg": math.degrees(nu_rad) % 360,
    }


def propagate_dt(x, y, z, vx, vy, vz, dt_seconds):
    """Simple propagation: advance true anomaly using mean motion."""
    el = cartesian_to_keplerian(x, y, z, vx, vy, vz)
    a, e = el["semiMajorAxisKm"], el["eccentricity"]
    n_rad_s = math.sqrt(MU_KM3_S2 / (a * a * a))
    nu_rad = math.radians(el["trueAnomalyDeg"])
    nu_new_rad = nu_rad + n_rad_s * dt_seconds
    nu_new_deg = math.degrees(nu_new_rad) % 360
    return keplerian_to_cartesian(
        a, e, el["inclinationDeg"], el["raanDeg"], el["argPerigeeDeg"], nu_new_deg
    )


def elevation_angle_deg(sat_x, sat_y, sat_z, lat_deg, lon_deg):
    """Elevation angle from ground station to satellite (degrees)."""
    lat = math.radians(lat_deg)
    lon = math.radians(lon_deg)
    # Station position (unit)
    sx = math.cos(lat) * math.cos(lon)
    sy = math.cos(lat) * math.sin(lon)
    sz = math.sin(lat)
    r = math.sqrt(sat_x*sat_x + sat_y*sat_y + sat_z*sat_z)
    if r < 1:
        return -90
    dx = sat_x / r - sx
    dy = sat_y / r - sy
    dz = sat_z / r - sz
    d = math.sqrt(dx*dx + dy*dy + dz*dz)
    if d < 1e-10:
        return 90
    el_rad = math.asin(max(-1, min(1, (sx*dx + sy*dy + sz*dz) / d)))
    return math.degrees(el_rad)


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: orbital_mechanics.py <command> [...]"}))
        sys.exit(1)
    cmd = sys.argv[1].lower()
    try:
        if cmd == "to_cartesian":
            a, e, i, raan, argp, nu = [float(x) for x in sys.argv[2:8]]
            out = keplerian_to_cartesian(a, e, i, raan, argp, nu)
            print(json.dumps(out))
        elif cmd == "to_keplerian":
            x, y, z, vx, vy, vz = [float(x) for x in sys.argv[2:8]]
            out = cartesian_to_keplerian(x, y, z, vx, vy, vz)
            print(json.dumps(out))
        elif cmd == "propagate":
            x, y, z, vx, vy, vz = [float(x) for x in sys.argv[2:8]]
            dt = float(sys.argv[8])
            out = propagate_dt(x, y, z, vx, vy, vz, dt)
            print(json.dumps(out))
        elif cmd == "elevation":
            sx, sy, sz = float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4])
            lat, lon = float(sys.argv[5]), float(sys.argv[6])
            out = {"elevationDeg": elevation_angle_deg(sx, sy, sz, lat, lon)}
            print(json.dumps(out))
        else:
            print(json.dumps({"error": f"Unknown command: {cmd}"}))
            sys.exit(1)
    except Exception as ex:
        print(json.dumps({"error": str(ex)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
