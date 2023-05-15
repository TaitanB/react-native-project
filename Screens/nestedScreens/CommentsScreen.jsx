import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CommentsScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [onFocusComment, setOnFocusComment] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
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
          <TextInput
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
          <TouchableOpacity
            style={styles.send}
            // onPress={"createComment"}
          >
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
