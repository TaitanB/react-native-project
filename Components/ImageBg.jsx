import { ImageBackground, StyleSheet } from "react-native";
import { useDimensionsScreen } from "../hooks/useDimensionsScreen";

export default function ImageBg({ children }) {
  const width = useDimensionsScreen().width;
  const height = useDimensionsScreen().height;

  return (
    <ImageBackground
      style={{ ...styles.imageBg, width: width, height: height }}
      source={require("../assets/image/photo-bg.png")}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    // resizeMode: "cover",
    flex: 1,
    justifyContent: "flex-end",
  },
});
