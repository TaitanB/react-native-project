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
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";
import { Ionicons } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [onFocusComment, setOnFocusComment] = useState(false);
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickName } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickName });
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          style={{
            ...styles.form,
            marginBottom: isShowKeyboard ? 270 : 10,
          }}
        >
          <SafeAreaView style={styles.container}>
            <FlatList
              data={allComments}
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Text>{item.nickName}</Text>
                  <Text>{item.comment}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
          <View>
            <TextInput
              onChangeText={setComment}
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
          </View>

          <TouchableOpacity style={styles.send} onPress={createPost}>
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
});
