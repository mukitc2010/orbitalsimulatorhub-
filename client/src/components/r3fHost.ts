import type { ComponentType, ReactNode } from "react";
import type { BufferGeometry } from "three";

type LineProps = { geometry: BufferGeometry; children?: ReactNode };
type LineMaterialProps = { color: string; transparent?: boolean; opacity?: number };

/**
 * React 19 types `<line>` as SVG. These aliases still create the R3F host
 * elements, which is what Canvas renders.
 */
export const R3FLine = "line" as unknown as ComponentType<LineProps>;
export const R3FLineMaterial = "lineBasicMaterial" as unknown as ComponentType<LineMaterialProps>;
