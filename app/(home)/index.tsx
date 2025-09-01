import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedFlatList } from "@/components/ThemedFlatList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [data, setData] = React.useState([]);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const { top: insetTop, bottom: insetBottom } = useSafeAreaInsets();
  const inputRef = React.useRef<TextInput>(null);
  const borderColor = useThemeColor({}, "border");

  const onPressMenuButton = () => {};

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={insetTop + insetBottom}
      >
        <ThemedFlatList
          contentContainerStyle={{ flex: 1 }}
          data={data}
          renderItem={({ item }) => <></>}
          scrollEventThrottle={16}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ThemedText>무슨 생각을 하고 계신가요?</ThemedText>
            </View>
          }
        />
        <ThemedView
          style={[
            styles.footer,
            { borderTopColor: borderColor },
            { paddingBottom: isInputFocused ? 12 : insetBottom },
          ]}
        >
          <ThemedView style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              autoFocus={true}
              style={styles.input}
              placeholder={"무슨 생각을 하고 계신가요?"}
              placeholderTextColor={"#a6a5a5"}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <Pressable style={[styles.submitButton]}>
              <FontAwesome name="paper-plane" size={20} color="#0d0d0d" />
            </Pressable>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#181818",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  appName: {
    marginLeft: 20,
    color: "white",
    fontWeight: 700,
    fontSize: 16,
  },
  scrollInfo: {
    color: "#a6a5a5",
    fontSize: 12,
    marginTop: 4,
  },
  emptyContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
  },
  inputWrapper: {
    borderRadius: 100,
    paddingLeft: 20,
    paddingVertical: 8,
    paddingRight: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 18,
    fontWeight: 600,
    color: "white",
  },
  submitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
