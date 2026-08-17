import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { GlassCard } from "../components/GlassCard";
import { ScreenShell } from "../components/ScreenShell";
import {
  EARTH_RADIUS_KM,
  getEscapeVelocityKmS,
  getOrbitalPeriodMinutes,
  getOrbitalSpeedKmS,
} from "../physics/orbital";
import { colors, spacing } from "../theme";

const NEWTON_LAWS = [
  {
    title: "1st Law — Inertia",
    color: colors.cyan,
    text: "An object keeps moving in a straight line at constant speed unless a force acts on it. A satellite would fly off into deep space if gravity didn't constantly bend its path into an orbit.",
  },
  {
    title: "2nd Law — F = ma",
    color: colors.violet,
    text: "Force equals mass times acceleration. The same thruster burn accelerates a small CubeSat far more than a massive space station.",
  },
  {
    title: "3rd Law — Action & Reaction",
    color: colors.magenta,
    text: "For every action there is an equal and opposite reaction. Rockets throw hot exhaust backwards; the exhaust pushes the rocket forwards — no air needed.",
  },
];

/** Live calculator: type an altitude, get speed / period / escape velocity. */
function OrbitCalculator() {
  const [altitudeText, setAltitudeText] = useState("400");
  const altitude = Math.max(0, parseFloat(altitudeText) || 0);
  const r = EARTH_RADIUS_KM + altitude;
  const speed = getOrbitalSpeedKmS(r);
  const period = getOrbitalPeriodMinutes(r);
  const escape = getEscapeVelocityKmS(r);

  return (
    <GlassCard accent={colors.green} style={styles.card}>
      <Text style={[styles.cardTitle, { color: colors.green }]}>⚙ ORBIT CALCULATOR</Text>
      <Text style={styles.calcLabel}>Altitude above Earth (km)</Text>
      <TextInput
        style={styles.input}
        value={altitudeText}
        onChangeText={setAltitudeText}
        keyboardType="numeric"
        placeholder="400"
        placeholderTextColor={colors.textFaint}
      />
      <View style={styles.resultRow}>
        <View style={styles.result}>
          <Text style={styles.resultValue}>{speed.toFixed(2)}</Text>
          <Text style={styles.resultLabel}>orbital speed (km/s)</Text>
        </View>
        <View style={styles.result}>
          <Text style={styles.resultValue}>
            {period >= 600 ? (period / 60).toFixed(1) + " h" : period.toFixed(1) + " min"}
          </Text>
          <Text style={styles.resultLabel}>orbital period</Text>
        </View>
        <View style={styles.result}>
          <Text style={styles.resultValue}>{escape.toFixed(2)}</Text>
          <Text style={styles.resultLabel}>escape vel. (km/s)</Text>
        </View>
      </View>
      <Text style={styles.formula}>v = √(μ/r) · T = 2π√(a³/μ) · vₑ = √(2μ/r)</Text>
    </GlassCard>
  );
}

export function LearnScreen() {
  return (
    <ScreenShell title="Learn" subtitle="Newton's laws & the math of orbits">
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <OrbitCalculator />
        {NEWTON_LAWS.map((law) => (
          <GlassCard key={law.title} accent={law.color} style={styles.card}>
            <Text style={[styles.cardTitle, { color: law.color }]}>{law.title}</Text>
            <Text style={styles.cardText}>{law.text}</Text>
          </GlassCard>
        ))}
        <GlassCard style={styles.card}>
          <Text style={styles.cardTitle}>WHY DON'T SATELLITES FALL?</Text>
          <Text style={styles.cardText}>
            They do — constantly! A satellite in orbit is in free-fall toward Earth, but it moves
            sideways so fast (7.66 km/s for the ISS) that the ground curves away beneath it at the
            same rate it falls. Falling forever, missing forever: that's an orbit.
          </Text>
        </GlassCard>
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingBottom: 40 },
  card: { marginBottom: spacing.md },
  cardTitle: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  cardText: { color: colors.textDim, fontSize: 13, lineHeight: 20 },
  calcLabel: { color: colors.textDim, fontSize: 12, marginBottom: spacing.xs },
  input: {
    borderWidth: 1,
    borderColor: colors.panelBorder,
    borderRadius: 10,
    color: colors.cyanBright,
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "rgba(3, 6, 22, 0.6)",
  },
  resultRow: { flexDirection: "row", marginTop: spacing.md, gap: spacing.sm },
  result: { flex: 1, alignItems: "center" },
  resultValue: { color: colors.text, fontSize: 16, fontWeight: "800" },
  resultLabel: { color: colors.textFaint, fontSize: 9, marginTop: 2, textAlign: "center" },
  formula: {
    color: colors.textFaint,
    fontSize: 11,
    marginTop: spacing.md,
    textAlign: "center",
    letterSpacing: 1,
  },
});
