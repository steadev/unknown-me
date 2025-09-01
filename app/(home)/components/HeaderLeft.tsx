import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";

export const HeaderLeft = () => {
  const navigation = useNavigation();
  const drawerIconColor = useThemeColor({}, "drawerIcon");
  const onPressMenuButton = () => {
    (navigation as any).toggleDrawer();
  };

  return (
    <Pressable style={{ marginLeft: 12 }} onPress={onPressMenuButton}>
      <MaterialIcons name="sort" size={24} color={drawerIconColor} />
    </Pressable>
  );
};
