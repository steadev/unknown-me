import React from "react";

import ScreenContainer from "@/components/ScreenContainer";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Slot } from "expo-router";

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  return (
    <ScreenContainer>
      <Slot />
    </ScreenContainer>
  );
}
