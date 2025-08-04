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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

export default function HomeScreen() {
  const [data, setData] = React.useState([]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ThemedFlatList
        contentContainerStyle={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => <></>}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText>무슨 생각을 하고 계신가요?</ThemedText>
          </View>
        }
      />
      <View style={styles.footer}>
        <View style={styles.inputWrapper}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder={"무슨 생각을 하고 계신가요?"}
            placeholderTextColor={"#a6a5a5"}
          />
          <Pressable style={styles.submitButton}>
            <FontAwesome name="paper-plane" size={20} color="#0d0d0d" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    borderTopColor: "#181818",
    borderTopWidth: 1,
  },
  inputWrapper: {
    borderRadius: 100,
    paddingLeft: 20,
    paddingVertical: 8,
    paddingRight: 8,
    backgroundColor: "#414141",
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
