"use client";

import {
  EffectComposer,
  Bloom,
  SSAO,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function PostFX() {
  return (
    <EffectComposer enableNormalPass>
      <SSAO
        samples={8}
        radius={8}
        intensity={0.4}
        bias={0.025}
        blendFunction={BlendFunction.MULTIPLY}
      />
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
        color="#0a0e17"
      />
      <Noise opacity={0.03} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
