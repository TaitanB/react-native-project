import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

const PostsScreen = ({ navigation, route }) => {
  const { userName, userEmail } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    console.log("d");
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photoURL }} style={styles.image} />
            <Text style={styles.comment}>{item.comment}</Text>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <Feather
                  style={styles.commentIcon}
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  onPress={() => {
                    navigation.navigate("Comments", {
                      postId: item.id,
                      comment: item.comment,
                      uri: item.photoURL,
                    });
                  }}
                />
                <Text>0</Text>
              </View>
              {/* <View style={styles.iconContainer}>
                <Feather name="thumbs-up" size={24} color="#BDBDBD" />
                <Text>0</Text>
              </View> */}
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>{item.locationName}</Text>
                <Feather
                  style={styles.locationIcon}
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  onPress={() => {
                    navigation.navigate("Map", {
                      location: item.location,
                      locationName: item.locationName,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  postContainer: {
    flex: 1,
    marginBottom: 32,
    borderRadius: 8,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f6f6f6",
  },

  comment: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "medium",
    lineHeight: 19,
    color: "#212121",
  },

  itemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  iconContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },

  commentIcon: { transform: [{ scaleX: -1 }] },
  locationContainer: {
    flexDirection: "row-reverse",
  },

  locationText: {
    marginBottom: 2,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    textDecorationLine: "underline",
    color: "#212121",
  },

  locationIcon: {
    marginRight: 8,
  },
});

export default PostsScreen;
