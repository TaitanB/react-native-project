import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MapScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={{}}>Map</Text>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
});
