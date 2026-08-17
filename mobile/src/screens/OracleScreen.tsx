import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { ScreenShell } from "../components/ScreenShell";
import { queueMissionOrders } from "../state/missionOrders";
import { OrbitPreset } from "../physics/orbital";
import { colors, radius, spacing } from "../theme";

const AGENT_URL = "https://www.orbitalsimulatorhub.com/api/asi-agent";

type AgentAction =
  | { type: "deploy"; preset: OrbitPreset; count: number }
  | { type: "simulate"; play?: boolean; speed?: number };

type ChatMessage = { role: "user" | "oracle"; text: string; queued?: string };

const SUGGESTIONS = [
  "Deploy an ISS orbit and a GPS orbit so I can compare",
  "How fast would I orbit at 1,000 km?",
  "Why don't geostationary satellites move in the sky?",
];

export function OracleScreen({ onOpenSimulator }: { onOpenSimulator: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "oracle",
      text: "ORACLE online, Commander. I run real orbital mechanics and can deploy satellites straight into this app's simulator. What's the mission?",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const feedRef = useRef<ScrollView>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    setBusy(true);
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);

    const history = messages
      .slice(-8)
      .map((m) => ({ role: m.role === "oracle" ? "assistant" : "user", content: m.text }));

    try {
      const res = await fetch(AGENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = (await res.json()) as { reply?: string; error?: string; actions?: AgentAction[] };
      if (!res.ok || data.error) {
        setMessages((prev) => [...prev, { role: "oracle", text: `⚠ ${data.error ?? "Telemetry lost — try again."}` }]);
      } else {
        let queued: string | undefined;
        const deployments = (data.actions ?? [])
          .filter((a): a is Extract<AgentAction, { type: "deploy" }> => a.type === "deploy")
          .flatMap((a) => Array.from({ length: Math.min(5, a.count) }, () => a.preset));
        if (deployments.length > 0) {
          const play = (data.actions ?? []).some((a) => a.type === "simulate" && a.play !== false);
          queueMissionOrders({ deployments, play: play || true });
          queued = deployments.join(" · ");
        }
        setMessages((prev) => [...prev, { role: "oracle", text: data.reply ?? "", queued }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "oracle", text: "⚠ Communication blackout. ORACLE needs an internet connection to reach Mission Control." },
      ]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => feedRef.current?.scrollToEnd({ animated: true }));
    }
  }

  return (
    <ScreenShell title="Oracle" subtitle="ASI Mission Control · real physics · live deployments">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={feedRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.feed}
          onContentSizeChange={() => feedRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, i) => (
            <View key={i} style={[styles.bubble, msg.role === "user" ? styles.userBubble : styles.oracleBubble]}>
              {msg.role === "oracle" && <Text style={styles.bubbleLabel}>ORACLE</Text>}
              <Text style={styles.bubbleText}>{msg.text}</Text>
              {msg.queued && (
                <Pressable onPress={onOpenSimulator} style={styles.executeButton}>
                  <Text style={styles.executeText}>🛰 EXECUTE IN SIMULATOR · {msg.queued}</Text>
                </Pressable>
              )}
            </View>
          ))}
          {busy && (
            <View style={[styles.bubble, styles.oracleBubble, styles.busyRow]}>
              <ActivityIndicator size="small" color={colors.cyan} />
              <Text style={[styles.bubbleText, { color: colors.cyanBright }]}> computing trajectory…</Text>
            </View>
          )}
          {messages.length <= 1 && (
            <View style={styles.suggestions}>
              {SUGGESTIONS.map((s) => (
                <Pressable key={s} style={styles.suggestionChip} onPress={() => send(s)}>
                  <Text style={styles.suggestionText}>{s}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Transmit to Mission Control…"
            placeholderTextColor={colors.textFaint}
            editable={!busy}
            onSubmitEditing={() => send(input)}
            returnKeyType="send"
          />
          <Pressable
            style={[styles.sendButton, { opacity: busy || !input.trim() ? 0.5 : 1 }]}
            onPress={() => send(input)}
            disabled={busy || !input.trim()}
          >
            <Text style={styles.sendText}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  feed: { padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.lg },
  bubble: {
    maxWidth: "90%",
    borderRadius: radius.md,
    borderWidth: 1,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  oracleBubble: {
    alignSelf: "flex-start",
    backgroundColor: colors.panel,
    borderColor: colors.panelBorder,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(34,211,238,0.12)",
    borderColor: "rgba(34,211,238,0.35)",
    borderTopRightRadius: 4,
  },
  bubbleLabel: {
    color: colors.cyanBright,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  bubbleText: { color: colors.text, fontSize: 14, lineHeight: 20 },
  busyRow: { flexDirection: "row", alignItems: "center" },
  executeButton: {
    marginTop: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.green,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: "rgba(52,211,153,0.1)",
    alignSelf: "flex-start",
  },
  executeText: { color: colors.green, fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  suggestions: { gap: spacing.sm, marginTop: spacing.md },
  suggestionChip: {
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.4)",
    backgroundColor: "rgba(167,139,250,0.08)",
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: "flex-start",
  },
  suggestionText: { color: colors.violet, fontSize: 13 },
  inputRow: {
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.panelBorder,
  },
  input: {
    flex: 1,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.panelBorder,
    borderRadius: radius.sm,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "rgba(34,211,238,0.15)",
    borderWidth: 1.5,
    borderColor: colors.cyan,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: { color: colors.cyanBright, fontSize: 16, fontWeight: "800" },
});
