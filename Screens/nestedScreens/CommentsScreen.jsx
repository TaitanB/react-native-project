import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  FlatList,
  Image,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [onFocusComment, setOnFocusComment] = useState(false);
  const { postId, uri } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { userName, userAvatar } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const submitComment = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    try {
      await addDoc(collection(doc(db, "posts", postId), "comments"), {
        comment,
        userName,
        date,
        userAvatar,
        time,
      });
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  const createComment = () => {
    submitComment();
    keyboardHide();
    setComment("");
  };

  // const getAllComments = async () => {
  //   try {
  //     console.log("getAllComments");
  //     await onSnapshot(
  //       collection(doc(collection(db, "posts"), postId), "comments"),
  //       (data) => {
  //         setAllComments(
  //           data.docs.map((doc) => ({
  //             ...doc.data(),
  //             id: doc.id,
  //           }))
  //         );
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("useEffect getAllComments");
  //   getAllComments();
  // }, []);

  useEffect(() => {
    const getAllComments = () => {
      onSnapshot(
        collection(doc(collection(db, "posts"), postId), "comments"),
        (data) => {
          const commentsData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setAllComments(commentsData);
        }
      );
    };

    getAllComments();
  }, [allComments.length]);

  console.log(allComments);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <Image style={styles.photo} source={{ uri }} />
          <FlatList
            data={allComments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={
                  item.userName === userName
                    ? { alignItems: "flex-end" }
                    : { alignItems: "flex-start" }
                }
              >
                <View
                  style={[
                    styles.commentContainer,
                    item.userName === userName
                      ? { backgroundColor: "rgba(0, 0, 225, 0.1)" }
                      : { backgroundColor: "rgba(0, 225, 0, 0.1)" },
                  ]}
                >
                  <Image
                    style={{
                      borderRadius: 50,
                      width: 28,
                      height: 28,
                      marginRight: 6,
                      marginBottom: 5,
                    }}
                    source={{ uri: item.userAvatar }}
                  />
                  <Text>{item.userName}: </Text>
                  <Text>{item.comment}</Text>
                  <Text style={styles.date}>
                    {item.date} - {item.time}
                  </Text>
                </View>
              </View>
            )}
          />
        </SafeAreaView>
        <View
          style={{
            ...styles.form,
            marginBottom: isShowKeyboard ? 270 : 10,
          }}
        >
          <TextInput
            value={comment}
            onChangeText={(value) => setComment(value)}
            placeholder="Comment..."
            placeholderTextColor={"#BDBDBD"}
            onFocus={() => {
              setIsShowKeyboard(true), setOnFocusComment(true);
            }}
            onBlur={() => setOnFocusComment(false)}
            style={{
              ...styles.input,
              borderColor: onFocusComment ? "#FF6C00" : "#E8E8E8",
            }}
          />
          <TouchableOpacity style={styles.send} onPress={createComment}>
            <Ionicons name="arrow-up-circle" size={34} color="#FF6C00" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-end",
  },
  photo: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
  },
  form: {
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    marginTop: 32,
    padding: 15,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    lineHeight: 20,
    color: "#212121",
  },
  send: {
    width: 34,
    height: 34,
    position: "absolute",
    right: 8,
    bottom: 14,
  },
  commentContainer: {
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
    marginHorizontal: 5,
  },
});
