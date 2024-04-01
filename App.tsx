import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import CardList from "./src/components/CardList";
import React from "react";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CardList />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
