import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export const Budgets = (props) => {
  return <View style={[styles.scene, { backgroundColor: "#ffffff" }]} />;
};
