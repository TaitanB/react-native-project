import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import ImageBg from "../../Components/ImageBg";
import { authSignOut } from "../../Redux/operations";
import { AvatarContainer } from "../../Components/Avatar";

export default function ProfileScreen() {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, userName } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOut());
  };

  useEffect(() => {
    getUserPosts();
    console.log("userPosts", userPosts);
  }, []);

  const getUserPosts = async () => {
    const posts = query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(posts, (data) => {
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  return (
    <View style={styles.container}>
      <ImageBg>
        <View
          style={{ ...styles.profile, width: Dimensions.get("window").width }}
        >
          <AvatarContainer />
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={signOut}
          >
            <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>{userName}</Text>
          <FlatList
            style={styles.list}
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Image source={{ uri: item.photo }} style={styles.image} />
                <Text style={styles.descr}>{item.description}</Text>
                <View style={styles.itemContainer}>
                  <View style={styles.iconContainer}>
                    <Feather
                      style={styles.commentIcon}
                      name="message-circle"
                      size={24}
                      color="#BDBDBD"
                      // onPress={() => {
                      //   navigation.navigate("Comments", {
                      //     postId: item.id,
                      //     comment: item.comment,
                      //     uri: item.photoURL,
                      //   });
                      // }}
                    />
                    <Text>0</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Feather name="thumbs-up" size={24} color="#BDBDBD" />
                    <Text>0</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>{item.locationName}</Text>
                    <Feather
                      style={styles.locationIcon}
                      name="map-pin"
                      size={24}
                      color="#BDBDBD"
                      // onPress={() => {
                      //   navigation.navigate("Map", {
                      //     location: item.location,
                      //     locationName: item.locationName,
                      //   });
                      // }}
                    />
                  </View>
                </View>
              </View>
            )}
          />
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

  logoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
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
  list: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  postContainer: {
    flex: 1,
    marginBottom: 32,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f6f6f6",
  },
  descr: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "medium",
    lineHeight: 19,
    color: "#212121",
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
