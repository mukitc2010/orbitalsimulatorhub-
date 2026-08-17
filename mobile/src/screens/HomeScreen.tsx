import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from "react-native";

import { GlassCard } from "../components/GlassCard";
import { NeonButton } from "../components/NeonButton";
import { Starfield } from "../components/Starfield";
import { colors, spacing } from "../theme";

interface Props {
  onLaunch: () => void;
}

/** Animated concentric orbit rings with a moving satellite dot. */
function OrbitEmblem() {
  const spin = useRef(new Animated.Value(0)).current;
  const spinSlow = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anims = [
      Animated.loop(
        Animated.timing(spin, { toValue: 1, duration: 6000, easing: Easing.linear, useNativeDriver: true })
      ),
      Animated.loop(
        Animated.timing(spinSlow, { toValue: 1, duration: 14000, easing: Easing.linear, useNativeDriver: true })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ),
    ];
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, [spin, spinSlow, pulse]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const rotateSlow = spinSlow.interpolate({ inputRange: [0, 1], outputRange: ["360deg", "0deg"] });
  const planetScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  return (
    <View style={styles.emblem}>
      <Animated.View style={[styles.planet, { transform: [{ scale: planetScale }] }]}>
        <LinearGradient colors={[colors.cyan, "#0b3a6b"]} style={styles.planetFill} />
      </Animated.View>
      <Animated.View style={[styles.orbitRing, styles.ringInner, { transform: [{ rotate }] }]}>
        <View style={[styles.satDot, { backgroundColor: colors.cyanBright }]} />
      </Animated.View>
      <Animated.View style={[styles.orbitRing, styles.ringOuter, { transform: [{ rotate: rotateSlow }] }]}>
        <View style={[styles.satDot, { backgroundColor: colors.violet }]} />
      </Animated.View>
    </View>
  );
}

const STATS: Array<{ value: string; label: string; color: string }> = [
  { value: "7.66", label: "km/s ISS speed", color: colors.cyan },
  { value: "35,786", label: "km GEO altitude", color: colors.amber },
  { value: "92", label: "min per LEO orbit", color: colors.violet },
];

export function HomeScreen({ onLaunch }: Props) {
  return (
    <View style={styles.root}>
      <LinearGradient colors={[colors.bg, "#071233", colors.bg]} style={StyleSheet.absoluteFill} />
      <Starfield count={80} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <OrbitEmblem />
        <Text style={styles.brand}>ORBITAL</Text>
        <Text style={styles.brandSub}>SIMULATOR HUB</Text>
        <Text style={styles.tagline}>
          Launch satellites around a holographic Earth with real orbital mechanics — in the palm of
          your hand.
        </Text>

        <NeonButton label="▶  Launch Simulator" onPress={onLaunch} style={styles.cta} />

        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <GlassCard key={s.label} style={styles.statCard} accent={s.color}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </GlassCard>
          ))}
        </View>

        <GlassCard style={styles.featureCard}>
          <Text style={styles.featureTitle}>◇ REAL PHYSICS ENGINE</Text>
          <Text style={styles.featureText}>
            Every orbit is propagated with Kepler's equation and the vis-viva law — the same math
            NASA mission planners use. LEO, MEO and GEO presets included.
          </Text>
        </GlassCard>
        <GlassCard style={styles.featureCard} accent={colors.violet}>
          <Text style={[styles.featureTitle, { color: colors.violet }]}>◇ LEARN AS YOU FLY</Text>
          <Text style={styles.featureText}>
            Newton's laws, orbital formulas with built-in calculators, space fun facts and a quiz to
            test your astronaut knowledge.
          </Text>
        </GlassCard>
        <GlassCard style={styles.featureCard} accent={colors.magenta}>
          <Text style={[styles.featureTitle, { color: colors.magenta }]}>◇ FULLY OFFLINE 3D</Text>
          <Text style={styles.featureText}>
            The holographic Earth is rendered with procedural GPU shaders — no downloads, no
            network needed. Drag to orbit the camera, pinch to zoom.
          </Text>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { alignItems: "center", padding: spacing.lg, paddingBottom: 40 },
  emblem: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  planet: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    shadowColor: colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 24,
    elevation: 10,
  },
  planetFill: { flex: 1 },
  orbitRing: {
    position: "absolute",
    borderWidth: 1,
    borderColor: colors.panelBorder,
    borderRadius: 999,
    alignItems: "center",
  },
  ringInner: { width: 120, height: 120 },
  ringOuter: { width: 176, height: 176, borderColor: "rgba(167,139,250,0.3)" },
  satDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: -5,
    shadowColor: colors.cyanBright,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  brand: {
    color: colors.text,
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: 10,
    textShadowColor: colors.cyan,
    textShadowRadius: 24,
    textShadowOffset: { width: 0, height: 0 },
  },
  brandSub: {
    color: colors.cyanBright,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 8,
    marginTop: 2,
  },
  tagline: {
    color: colors.textDim,
    fontSize: 14,
    textAlign: "center",
    marginTop: spacing.md,
    lineHeight: 21,
    maxWidth: 320,
  },
  cta: { marginTop: spacing.xl, alignSelf: "stretch" },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xl,
    alignSelf: "stretch",
  },
  statCard: { flex: 1, alignItems: "center", paddingVertical: spacing.md, paddingHorizontal: spacing.sm },
  statValue: { fontSize: 20, fontWeight: "800", letterSpacing: 1 },
  statLabel: { color: colors.textDim, fontSize: 10, marginTop: 4, textAlign: "center" },
  featureCard: { alignSelf: "stretch", marginTop: spacing.md },
  featureTitle: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  featureText: { color: colors.textDim, fontSize: 13, lineHeight: 20 },
});
