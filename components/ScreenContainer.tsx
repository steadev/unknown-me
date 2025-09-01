import React, { PropsWithChildren } from "react";
import { ThemedSafeAreaView } from "./ThemedSafeAreaView";

const ScreenContainer = ({ children }: PropsWithChildren) => {
  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>{children}</ThemedSafeAreaView>
  );
};
export default ScreenContainer;
