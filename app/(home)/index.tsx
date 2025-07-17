import { StyleSheet, View } from "react-native";

import { ThemedFlatList } from "@/components/ThemedFlatList";
import { ThemedText } from "@/components/ThemedText";
import React from "react";

export default function HomeScreen() {
  const [data, setData] = React.useState([]);

  return (
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
});
