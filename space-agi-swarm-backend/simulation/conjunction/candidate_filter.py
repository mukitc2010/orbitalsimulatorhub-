import numpy as np
from scipy.spatial import cKDTree
from ..utils.constants import R_EARTH


def altitude_shell_index(r_eci: np.ndarray, shell_thickness_m: float) -> int:
    alt = float(np.linalg.norm(r_eci) - R_EARTH)
    if alt < 0:
        alt = 0.0
    return int(alt // shell_thickness_m)


def build_shell_buckets(positions: np.ndarray, shell_thickness_m: float) -> dict:
    shells = {}
    for i in range(positions.shape[0]):
        s = altitude_shell_index(positions[i], shell_thickness_m)
        shells.setdefault(s, []).append(i)
    return {k: np.array(v, dtype=np.int32) for k, v in shells.items()}


def candidate_pairs_shell_kdtree(
    positions: np.ndarray,
    shell_thickness_m: float,
    screen_radius_m: float,
) -> list:
    buckets = build_shell_buckets(positions, shell_thickness_m)
    pairs = set()

    for s, idxs in buckets.items():
        pos_s = positions[idxs]
        tree_s = cKDTree(pos_s)

        neigh_lists = tree_s.query_ball_tree(tree_s, r=screen_radius_m)
        for a_local, neigh in enumerate(neigh_lists):
            i = int(idxs[a_local])
            for b_local in neigh:
                j = int(idxs[int(b_local)])
                if i < j:
                    pairs.add((i, j))

        if (s + 1) in buckets:
            idxs2 = buckets[s + 1]
            pos2 = positions[idxs2]
            tree2 = cKDTree(pos2)
            cross = tree_s.query_ball_tree(tree2, r=screen_radius_m)
            for a_local, neigh in enumerate(cross):
                i = int(idxs[a_local])
                for b_local in neigh:
                    j = int(idxs2[int(b_local)])
                    if i < j:
                        pairs.add((i, j))
                    else:
                        pairs.add((j, i))

    return sorted(pairs)
