import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import { colors, radius, spacing } from "../theme";

interface Props {
  label: string;
  onPress: () => void;
  color?: string;
  active?: boolean;
  small?: boolean;
  style?: ViewStyle | ViewStyle[];
}

/** Pill button that glows in its accent color when active. */
export function NeonButton({ label, onPress, color = colors.cyan, active = true, small, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        small && styles.small,
        {
          borderColor: active ? color : colors.textFaint + "66",
          backgroundColor: active ? color + "22" : "transparent",
          shadowColor: color,
          shadowOpacity: active ? 0.8 : 0,
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          small && styles.labelSmall,
          { color: active ? color : colors.textDim },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1.5,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    elevation: 5,
  },
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  labelSmall: {
    fontSize: 12,
    letterSpacing: 0.8,
  },
});
