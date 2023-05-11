import { ImageBackground, StyleSheet, Dimensions } from "react-native";

export default function ImageBg({ children }) {
  return (
    <ImageBackground
      style={styles.imageBg}
      source={require("../assets/image/photo-bg.png")}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: "flex-end",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
