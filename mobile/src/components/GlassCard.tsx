import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { colors, radius, spacing } from "../theme";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  accent?: string;
}

/** Frosted glass panel with a neon border — the base surface of the app. */
export function GlassCard({ children, style, accent }: Props) {
  return (
    <View
      style={[
        styles.card,
        accent ? { borderColor: accent + "55", shadowColor: accent } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.panelBorder,
    padding: spacing.lg,
    shadowColor: colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 4,
  },
});
