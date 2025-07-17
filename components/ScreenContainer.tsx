import React, { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "./ThemedView";

const ScreenContainer = ({ children }: PropsWithChildren) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ThemedView style={{ flex: 1, paddingTop: top, paddingBottom: bottom }}>
      {children}
    </ThemedView>
  );
};
export default ScreenContainer;
