import React from "react";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HeaderLeft } from "./components/HeaderLeft";

export default function HomeLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const drawerIconColor = useThemeColor({}, "drawerIcon");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerLabel: "Unknown Me",
          drawerLabelStyle: { color: textColor },
          drawerItemStyle: { backgroundColor: "transparent" },
          headerStyle: {
            backgroundColor: backgroundColor,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "New Chat",
            title: "Unknown Me",
            headerLeft: (props) => <HeaderLeft />,
            drawerIcon: (props) => (
              <IconSymbol
                name="square.and.pencil"
                color={drawerIconColor}
                size={props.size}
              />
            ),
          }}
        />
      </Drawer>
      {/* <Slot /> */}
    </GestureHandlerRootView>
  );
}
