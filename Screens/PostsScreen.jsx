import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{"userName"}</Text>
          <Text style={styles.userEmail}>{"userEmail"}</Text>
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
    marginRight: "auto",
  },
  avatar: {
    borderRadius: 16,
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
  },
  userInfo: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: "Roboto-700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-400",
    fontSize: 11,
    lineHeight: 13,
    color: "#21212180",
  },
});
