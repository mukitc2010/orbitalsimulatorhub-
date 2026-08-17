import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Topic } from "../data/topics";
import { colors, radius, spacing } from "../theme";
import { GlassCard } from "./GlassCard";

interface Props {
  topic: Topic;
  onBack: () => void;
}

/** Full-screen reading view for one learning topic. */
export function TopicDetail({ topic, onBack }: Props) {
  return (
    <View style={styles.root}>
      <Pressable onPress={onBack} style={styles.backRow} hitSlop={10}>
        <Text style={[styles.backArrow, { color: topic.color }]}>‹</Text>
        <Text style={styles.backLabel}>ALL TOPICS</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={[styles.heroSymbol, { color: topic.color, textShadowColor: topic.color }]}>
            {topic.symbol}
          </Text>
          <Text style={styles.heroTitle}>{topic.title}</Text>
          <Text style={[styles.heroTagline, { color: topic.color }]}>{topic.tagline}</Text>
        </View>

        <View style={styles.statsRow}>
          {topic.stats.map((stat) => (
            <View key={stat.label} style={[styles.stat, { borderColor: topic.color + "44" }]}>
              <Text style={[styles.statValue, { color: topic.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {topic.sections.map((section) => (
          <View key={section.heading} style={styles.section}>
            <View style={styles.sectionHeadingRow}>
              <View style={[styles.sectionTick, { backgroundColor: topic.color }]} />
              <Text style={styles.sectionHeading}>{section.heading}</Text>
            </View>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}

        <GlassCard accent={topic.color} style={styles.factCard}>
          <Text style={[styles.factLabel, { color: topic.color }]}>☄ DID YOU KNOW?</Text>
          <Text style={styles.factText}>{topic.funFact}</Text>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: 8,
  },
  backArrow: { fontSize: 26, fontWeight: "800", marginTop: -3 },
  backLabel: { color: colors.textDim, fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 40 },
  hero: { alignItems: "center", marginBottom: spacing.lg },
  heroSymbol: {
    fontSize: 44,
    textShadowRadius: 24,
    textShadowOffset: { width: 0, height: 0 },
  },
  heroTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  heroTagline: { fontSize: 13, marginTop: 4, letterSpacing: 0.5, textAlign: "center" },
  statsRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.lg },
  stat: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: 4,
    alignItems: "center",
    backgroundColor: "rgba(3, 6, 22, 0.5)",
  },
  statValue: { fontSize: 15, fontWeight: "800", textAlign: "center" },
  statLabel: { color: colors.textFaint, fontSize: 9, marginTop: 3, textAlign: "center" },
  section: { marginBottom: spacing.lg },
  sectionHeadingRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 6 },
  sectionTick: { width: 4, height: 16, borderRadius: 2 },
  sectionHeading: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
    flex: 1,
  },
  sectionBody: { color: colors.textDim, fontSize: 14, lineHeight: 22 },
  factCard: { marginTop: spacing.xs, marginBottom: spacing.lg },
  factLabel: { fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: spacing.sm },
  factText: { color: colors.text, fontSize: 13, lineHeight: 20, fontStyle: "italic" },
});
