import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../theme";
import { Starfield } from "./Starfield";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/** Shared screen chrome: gradient space background, starfield, glowing header. */
export function ScreenShell({ title, subtitle, children }: Props) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.bg, "#071233", colors.bg]}
        style={StyleSheet.absoluteFill}
      />
      <Starfield />
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <View style={styles.headerRule} />
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    color: colors.cyanBright,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 3,
    textTransform: "uppercase",
    textShadowColor: colors.cyan,
    textShadowRadius: 16,
    textShadowOffset: { width: 0, height: 0 },
  },
  subtitle: {
    color: colors.textDim,
    fontSize: 13,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  headerRule: {
    height: 1,
    marginTop: spacing.md,
    backgroundColor: colors.panelBorder,
  },
  body: {
    flex: 1,
  },
});
