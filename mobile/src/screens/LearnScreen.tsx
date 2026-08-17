import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { GlassCard } from "../components/GlassCard";
import { ScreenShell } from "../components/ScreenShell";
import { TopicDetail } from "../components/TopicDetail";
import { Topic, TOPIC_CATEGORIES, TOPIC_COUNT } from "../data/topics";
import {
  EARTH_RADIUS_KM,
  getEscapeVelocityKmS,
  getOrbitalPeriodMinutes,
  getOrbitalSpeedKmS,
} from "../physics/orbital";
import { colors, radius, spacing } from "../theme";

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

function TopicCard({ topic, onPress }: { topic: Topic; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.topicCard,
            { borderColor: topic.color + "44", opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <View style={[styles.topicSymbolWrap, { backgroundColor: topic.color + "1c" }]}>
            <Text style={[styles.topicSymbol, { color: topic.color }]}>{topic.symbol}</Text>
          </View>
          <View style={styles.topicMeta}>
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <Text style={styles.topicTagline} numberOfLines={1}>
              {topic.tagline}
            </Text>
          </View>
          <Text style={[styles.topicChevron, { color: topic.color }]}>›</Text>
        </View>
      )}
    </Pressable>
  );
}

export function LearnScreen() {
  const [openTopic, setOpenTopic] = useState<Topic | null>(null);

  return (
    <ScreenShell
      title="Learn"
      subtitle={
        openTopic
          ? openTopic.tagline
          : `${TOPIC_COUNT} mission topics · formulas · live calculator`
      }
    >
      {openTopic ? (
        <TopicDetail topic={openTopic} onBack={() => setOpenTopic(null)} />
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <OrbitCalculator />
          {TOPIC_CATEGORIES.map((category) => (
            <View key={category.id} style={styles.category}>
              <Text style={styles.categoryName}>{category.name.toUpperCase()}</Text>
              <View style={styles.topicList}>
                {category.topics.map((topic) => (
                  <TopicCard key={topic.id} topic={topic} onPress={() => setOpenTopic(topic)} />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
  category: { marginTop: spacing.md },
  categoryName: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginBottom: spacing.sm,
  },
  topicList: { gap: spacing.sm },
  topicCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 1,
    borderRadius: radius.md,
    backgroundColor: colors.panel,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  topicSymbolWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  topicSymbol: { fontSize: 20 },
  topicMeta: { flex: 1 },
  topicTitle: { color: colors.text, fontSize: 15, fontWeight: "700" },
  topicTagline: { color: colors.textFaint, fontSize: 11, marginTop: 2 },
  topicChevron: { fontSize: 22, fontWeight: "800" },
});
