import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import ImageBg from "../Components/ImageBg";
import { useDimensionsScreen } from "../hooks/useDimensionsScreen";

export default function ProfileScreen() {
  const screenWidth = useDimensionsScreen().width;

  return (
    <View style={styles.container}>
      <ImageBg>
        <View style={{ ...styles.profile, width: screenWidth }}>
          <View
            style={{ ...styles.avatarContainer, left: screenWidth / 2 - 60 }}
          >
            <Image style={styles.avatar}></Image>
            <Image
              source={require("../assets/image/del.png")}
              style={styles.del}
            ></Image>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            // onPress={}
          >
            <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>{"Name"}</Text>
        </View>
      </ImageBg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
    paddingTop: 82,
    paddingHorizontal: 16,
    position: "relative",
  },
  avatarContainer: {
    width: 132,
    height: 120,
    position: "absolute",
    top: -60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  logoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  del: {
    position: "absolute",
    right: -5,
    bottom: 8,
  },
  profileTitle: {
    fontFamily: "Roboto-500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 32,
  },
});
