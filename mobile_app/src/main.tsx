import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import {ForumView} from "./forum"
const Main: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Start dev</Text>
      <ForumView />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Main };
