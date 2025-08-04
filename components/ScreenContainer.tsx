import React, { PropsWithChildren } from "react";
import { ThemedView } from "./ThemedView";

const ScreenContainer = ({ children }: PropsWithChildren) => {
  return <ThemedView style={{ flex: 1 }}>{children}</ThemedView>;
};
export default ScreenContainer;
