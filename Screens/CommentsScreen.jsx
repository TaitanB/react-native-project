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
  const [showKeyboard, setShowKeyboard] = useState(false);

  const onFocusCommentInput = () => {
    setShowKeyboard(true);
  };
  const onBlurCommentInput = () => {
    setShowKeyboard(false);
  };
  const hideKeyboard = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View
          style={{
            ...styles.form,
            marginBottom: showKeyboard ? 270 : 10,
          }}
        >
          <TextInput
            placeholder="Comment..."
            placeholderTextColor={"#BDBDBD"}
            onFocus={onFocusCommentInput}
            onBlur={onBlurCommentInput}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.send}
            // onPress={"createComment"}
          >
            <Ionicons name="arrow-up-circle" size={34} color="#FF6C00" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    borderColor: "#E8E8E8",
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
