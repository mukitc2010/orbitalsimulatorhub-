import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { HomeScreen } from "./src/screens/HomeScreen";
import { LearnScreen } from "./src/screens/LearnScreen";
import { QuizScreen } from "./src/screens/QuizScreen";
import { SimulatorScreen } from "./src/screens/SimulatorScreen";
import { colors, spacing } from "./src/theme";

type Tab = "home" | "simulator" | "learn" | "quiz";

const TABS: Array<{ key: Tab; icon: string; label: string }> = [
  { key: "home", icon: "◉", label: "Hub" },
  { key: "simulator", icon: "🛰", label: "Simulator" },
  { key: "learn", icon: "∑", label: "Learn" },
  { key: "quiz", icon: "★", label: "Quiz" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
        <StatusBar style="light" />
        <View style={styles.content}>
          {tab === "home" && <HomeScreen onLaunch={() => setTab("simulator")} />}
          {/* Simulator unmounts on tab switch: the GL context is released and
              deployed satellites reset — an ISS-like one is redeployed on return */}
          {tab === "simulator" && <SimulatorScreen />}
          {tab === "learn" && <LearnScreen />}
          {tab === "quiz" && <QuizScreen />}
        </View>
        <View style={styles.tabBar}>
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <Pressable key={t.key} style={styles.tabItem} onPress={() => setTab(t.key)}>
                <Text style={[styles.tabIcon, active && styles.tabIconActive]}>{t.icon}</Text>
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{t.label}</Text>
                {active && <View style={styles.tabGlow} />}
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.bgElevated,
    borderTopWidth: 1,
    borderTopColor: colors.panelBorder,
    paddingVertical: spacing.sm,
  },
  tabItem: { flex: 1, alignItems: "center", paddingVertical: spacing.xs },
  tabIcon: { fontSize: 18, color: colors.textFaint },
  tabIconActive: {
    color: colors.cyanBright,
    textShadowColor: colors.cyan,
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },
  tabLabel: {
    fontSize: 10,
    color: colors.textFaint,
    marginTop: 2,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  tabLabelActive: { color: colors.cyanBright, fontWeight: "700" },
  tabGlow: {
    position: "absolute",
    top: 0,
    width: 32,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.cyan,
    shadowColor: colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
});
