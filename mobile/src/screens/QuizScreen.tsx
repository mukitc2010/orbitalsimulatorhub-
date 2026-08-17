import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { GlassCard } from "../components/GlassCard";
import { NeonButton } from "../components/NeonButton";
import { ScreenShell } from "../components/ScreenShell";
import { FUN_FACTS, QUIZ } from "../data/content";
import { colors, radius, spacing } from "../theme";

type Phase = "quiz" | "done";

export function QuizScreen() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [factIndex, setFactIndex] = useState(0);

  const question = QUIZ[index];

  const pick = useCallback(
    (i: number) => {
      if (picked != null) return;
      setPicked(i);
      if (i === question.answerIndex) setScore((s) => s + 1);
    },
    [picked, question]
  );

  const next = useCallback(() => {
    setPicked(null);
    if (index + 1 >= QUIZ.length) {
      setPhase("done");
    } else {
      setIndex((i) => i + 1);
    }
  }, [index]);

  const restart = useCallback(() => {
    setPhase("quiz");
    setIndex(0);
    setScore(0);
    setPicked(null);
  }, []);

  const rank = useMemo(() => {
    const pct = score / QUIZ.length;
    if (pct === 1) return "🚀 MISSION COMMANDER";
    if (pct >= 0.75) return "🛰 FLIGHT ENGINEER";
    if (pct >= 0.5) return "👨‍🚀 CADET";
    return "🌍 GROUND CREW";
  }, [score]);

  return (
    <ScreenShell title="Quiz Deck" subtitle="Space facts & astronaut training">
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <GlassCard accent={colors.amber} style={styles.factCard}>
          <Text style={styles.factTitle}>☄ FUN FACT</Text>
          <Text style={styles.factText}>{FUN_FACTS[factIndex]}</Text>
          <NeonButton
            label="Next fact"
            small
            color={colors.amber}
            onPress={() => setFactIndex((i) => (i + 1) % FUN_FACTS.length)}
            style={{ marginTop: spacing.md, alignSelf: "flex-start" }}
          />
        </GlassCard>

        {phase === "quiz" ? (
          <GlassCard style={styles.quizCard}>
            <Text style={styles.progress}>
              QUESTION {index + 1} / {QUIZ.length} · SCORE {score}
            </Text>
            <Text style={styles.question}>{question.question}</Text>
            {question.options.map((option, i) => {
              const isAnswer = i === question.answerIndex;
              const isPicked = picked === i;
              let borderColor: string = colors.panelBorder;
              let textColor: string = colors.text;
              if (picked != null && isAnswer) {
                borderColor = colors.green;
                textColor = colors.green;
              } else if (isPicked && !isAnswer) {
                borderColor = colors.danger;
                textColor = colors.danger;
              }
              return (
                <Pressable
                  key={i}
                  onPress={() => pick(i)}
                  style={[styles.option, { borderColor }]}
                >
                  <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
                </Pressable>
              );
            })}
            {picked != null && (
              <>
                <Text style={styles.explanation}>{question.explanation}</Text>
                <NeonButton
                  label={index + 1 >= QUIZ.length ? "See results" : "Next question"}
                  onPress={next}
                  style={{ marginTop: spacing.md }}
                />
              </>
            )}
          </GlassCard>
        ) : (
          <GlassCard accent={colors.green} style={styles.quizCard}>
            <Text style={styles.doneScore}>
              {score} / {QUIZ.length}
            </Text>
            <Text style={styles.doneRank}>{rank}</Text>
            <Text style={styles.doneText}>
              {score === QUIZ.length
                ? "Perfect flight! You're cleared for launch."
                : "Keep training, astronaut — the simulator is the best teacher."}
            </Text>
            <NeonButton label="Restart quiz" onPress={restart} style={{ marginTop: spacing.lg }} />
          </GlassCard>
        )}
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingBottom: 40 },
  factCard: { marginBottom: spacing.md },
  factTitle: {
    color: colors.amber,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  factText: { color: colors.text, fontSize: 14, lineHeight: 21 },
  quizCard: { marginBottom: spacing.md },
  progress: {
    color: colors.textFaint,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  question: { color: colors.text, fontSize: 16, fontWeight: "700", lineHeight: 23, marginBottom: spacing.md },
  option: {
    borderWidth: 1.5,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: "rgba(3, 6, 22, 0.5)",
  },
  optionText: { fontSize: 14, lineHeight: 19 },
  explanation: {
    color: colors.textDim,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.sm,
    fontStyle: "italic",
  },
  doneScore: {
    color: colors.green,
    fontSize: 48,
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: colors.green,
    textShadowRadius: 20,
    textShadowOffset: { width: 0, height: 0 },
  },
  doneRank: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  doneText: { color: colors.textDim, fontSize: 13, textAlign: "center", marginTop: spacing.sm },
});
