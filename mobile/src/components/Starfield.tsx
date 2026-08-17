import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

import { colors } from "../theme";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const { width: W, height: H } = Dimensions.get("window");

function makeStars(count: number): Star[] {
  const palette = [colors.cyanBright, colors.violet, "#ffffff", colors.cyan];
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    size: 1 + Math.random() * 2.4,
    color: palette[i % palette.length],
    duration: 1200 + Math.random() * 2600,
    delay: Math.random() * 2000,
  }));
}

function TwinklingStar({ star }: { star: Star }) {
  const opacity = useRef(new Animated.Value(Math.random() * 0.6 + 0.2)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: star.duration,
          delay: star.delay,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.15,
          duration: star.duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, star]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: star.x,
        top: star.y,
        width: star.size,
        height: star.size,
        borderRadius: star.size / 2,
        backgroundColor: star.color,
        opacity,
      }}
    />
  );
}

/** Full-screen animated twinkling starfield used behind every 2D screen. */
export function Starfield({ count = 60 }: { count?: number }) {
  const stars = useRef(makeStars(count)).current;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {stars.map((star, i) => (
        <TwinklingStar key={i} star={star} />
      ))}
    </View>
  );
}
