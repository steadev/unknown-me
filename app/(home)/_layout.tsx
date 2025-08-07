import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerLabel: "Unknown Me",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Unknown Me",
          }}
        />
      </Drawer>
      {/* <Slot /> */}
    </GestureHandlerRootView>
  );
}
