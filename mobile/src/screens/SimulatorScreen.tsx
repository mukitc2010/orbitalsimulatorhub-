import { GLView } from "expo-gl";
import type { ExpoWebGLRenderingContext } from "expo-gl";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GestureResponderEvent,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { GlassCard } from "../components/GlassCard";
import { NeonButton } from "../components/NeonButton";
import {
  EARTH_RADIUS_KM,
  getOrbitalPeriodMinutes,
  getOrbitTemplate,
  getRealWorldLike,
  OrbitalElements,
  OrbitPreset,
} from "../physics/orbital";
import { OrbitalScene, SatelliteTelemetry } from "../three/OrbitalScene";
import { colors, orbitColors, spacing } from "../theme";

interface SatelliteInfo {
  id: string;
  name: string;
  preset: OrbitPreset;
  elements: OrbitalElements;
  color: string;
}

const SPEED_STEPS = [1, 10, 60, 300, 1200, 3600];

let satCounter = 0;

export function SimulatorScreen() {
  const sceneRef = useRef<OrbitalScene | null>(null);
  const [satellites, setSatellites] = useState<SatelliteInfo[]>([]);
  const [paused, setPaused] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(2); // 60x
  const [telemetry, setTelemetry] = useState<SatelliteTelemetry[]>([]);
  const telemetryThrottle = useRef(0);

  // Pending satellites added before the GL context is ready
  const satellitesRef = useRef<SatelliteInfo[]>([]);
  satellitesRef.current = satellites;

  useEffect(() => () => sceneRef.current?.dispose(), []);

  const onContextCreate = useCallback((gl: ExpoWebGLRenderingContext) => {
    // Android recreates the GL context when the app returns from background;
    // dispose the previous scene so its frame loop and GPU resources are freed.
    sceneRef.current?.dispose();
    const scene = new OrbitalScene(gl);
    scene.speedMultiplier = SPEED_STEPS[2];
    scene.onTelemetry = (t) => {
      // Update React state ~4x/sec, not every frame
      const now = Date.now();
      if (now - telemetryThrottle.current > 250) {
        telemetryThrottle.current = now;
        setTelemetry(t);
      }
    };
    sceneRef.current = scene;
    for (const sat of satellitesRef.current) {
      scene.addSatellite(sat.id, sat.elements, sat.color);
    }
    // Start with an ISS-like satellite so the scene is alive immediately
    if (satellitesRef.current.length === 0) {
      addSatellite("LEO", scene);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSatellite = useCallback((preset: OrbitPreset, sceneOverride?: OrbitalScene) => {
    const scene = sceneOverride ?? sceneRef.current;
    satCounter += 1;
    const elements = getOrbitTemplate(preset);
    // Spread satellites of the same preset apart so they don't overlap
    elements.raanDeg = (satCounter * 47) % 360;
    elements.trueAnomalyDeg = (satCounter * 83) % 360;
    const sat: SatelliteInfo = {
      id: `sat-${satCounter}`,
      name: `${preset}-${satCounter}`,
      preset,
      elements,
      color: orbitColors[preset],
    };
    scene?.addSatellite(sat.id, sat.elements, sat.color);
    setSatellites((prev) => [...prev, sat]);
  }, []);

  const removeLast = useCallback(() => {
    setSatellites((prev) => {
      const last = prev[prev.length - 1];
      if (last) sceneRef.current?.removeSatellite(last.id);
      return prev.slice(0, -1);
    });
  }, []);

  const togglePause = useCallback(() => {
    setPaused((p) => {
      const next = !p;
      if (sceneRef.current) sceneRef.current.paused = next;
      return next;
    });
  }, []);

  const cycleSpeed = useCallback(() => {
    setSpeedIndex((i) => {
      const next = (i + 1) % SPEED_STEPS.length;
      if (sceneRef.current) sceneRef.current.speedMultiplier = SPEED_STEPS[next];
      return next;
    });
  }, []);

  // --- Touch controls: one finger orbits the camera, two fingers pinch-zoom ---
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDist = useRef<number | null>(null);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          lastTouch.current = null;
          lastPinchDist.current = null;
        },
        onPanResponderMove: (evt: GestureResponderEvent) => {
          const touches = evt.nativeEvent.touches;
          if (touches.length >= 2) {
            const dx = touches[0].pageX - touches[1].pageX;
            const dy = touches[0].pageY - touches[1].pageY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (lastPinchDist.current != null && lastPinchDist.current > 0) {
              sceneRef.current?.zoomCamera(dist / lastPinchDist.current);
            }
            lastPinchDist.current = dist;
            lastTouch.current = null;
          } else if (touches.length === 1) {
            const { pageX, pageY } = touches[0];
            if (lastTouch.current) {
              sceneRef.current?.orbitCamera(pageX - lastTouch.current.x, pageY - lastTouch.current.y);
            }
            lastTouch.current = { x: pageX, y: pageY };
            lastPinchDist.current = null;
          }
        },
        onPanResponderRelease: () => {
          lastTouch.current = null;
          lastPinchDist.current = null;
        },
      }),
    []
  );

  const selected = satellites[satellites.length - 1];
  const selectedTelemetry = selected ? telemetry.find((t) => t.id === selected.id) : undefined;
  const periodMin = selected ? getOrbitalPeriodMinutes(selected.elements.semiMajorAxisKm) : 0;

  return (
    <View style={styles.root}>
      <View style={styles.canvasWrap} {...panResponder.panHandlers}>
        <GLView style={styles.canvas} onContextCreate={onContextCreate} />

        {/* HUD overlay */}
        <View pointerEvents="none" style={styles.hud}>
          <Text style={styles.hudLine}>
            SATS <Text style={styles.hudValue}>{satellites.length}</Text>
            {"   "}TIME <Text style={styles.hudValue}>×{SPEED_STEPS[speedIndex]}</Text>
            {"   "}
            <Text style={[styles.hudValue, { color: paused ? colors.amber : colors.green }]}>
              {paused ? "❚❚ PAUSED" : "● LIVE"}
            </Text>
          </Text>
          {selected && (
            <Text style={styles.hudLine}>
              <Text style={{ color: selected.color }}>◆ {selected.name}</Text>
              {"  ALT "}
              <Text style={styles.hudValue}>
                {selectedTelemetry ? Math.round(selectedTelemetry.altitudeKm).toLocaleString() : "—"} km
              </Text>
              {"  VEL "}
              <Text style={styles.hudValue}>
                {selectedTelemetry ? selectedTelemetry.speedKmS.toFixed(2) : "—"} km/s
              </Text>
              {"  T "}
              <Text style={styles.hudValue}>{periodMin.toFixed(0)} min</Text>
            </Text>
          )}
          <Text style={styles.hudHint}>drag to orbit · pinch to zoom</Text>
        </View>
      </View>

      {/* Control deck */}
      <GlassCard style={styles.controls}>
        <Text style={styles.controlsLabel}>DEPLOY SATELLITE</Text>
        <View style={styles.row}>
          {(["LEO", "MEO", "GEO"] as OrbitPreset[]).map((preset) => (
            <NeonButton
              key={preset}
              label={`+ ${preset}`}
              small
              color={orbitColors[preset]}
              onPress={() => addSatellite(preset)}
              style={styles.rowButton}
            />
          ))}
        </View>
        <View style={[styles.row, { marginTop: spacing.sm }]}>
          <NeonButton
            label={paused ? "▶ Resume" : "❚❚ Pause"}
            small
            color={paused ? colors.green : colors.amber}
            onPress={togglePause}
            style={styles.rowButton}
          />
          <NeonButton
            label={`⏩ ×${SPEED_STEPS[speedIndex]}`}
            small
            onPress={cycleSpeed}
            style={styles.rowButton}
          />
          <NeonButton
            label="✕ Remove"
            small
            color={colors.danger}
            active={satellites.length > 0}
            onPress={removeLast}
            style={styles.rowButton}
          />
        </View>
        {selected && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.sm }}>
            <Text style={styles.orbitNote}>
              {getRealWorldLike(selected.elements.semiMajorAxisKm - EARTH_RADIUS_KM)} · i=
              {selected.elements.inclinationDeg.toFixed(1)}° · e=
              {selected.elements.eccentricity.toFixed(4)}
            </Text>
          </ScrollView>
        )}
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  canvasWrap: { flex: 1 },
  canvas: { flex: 1 },
  hud: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
  },
  hudLine: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 4,
    textShadowColor: "#000",
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  hudValue: { color: colors.cyanBright, fontWeight: "800" },
  hudHint: { color: colors.textFaint, fontSize: 10, letterSpacing: 1, marginTop: 2 },
  controls: {
    margin: spacing.md,
    marginTop: 0,
    padding: spacing.md,
  },
  controlsLabel: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  row: { flexDirection: "row", gap: spacing.sm },
  rowButton: { flex: 1 },
  orbitNote: { color: colors.textDim, fontSize: 11, letterSpacing: 0.5 },
});
