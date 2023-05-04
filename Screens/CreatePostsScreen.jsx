import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [showKeyboard, setShowKeyboard] = useState(false);

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
          style={{ ...styles.contant, marginBottom: showKeyboard ? -200 : 0 }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.pictureContainer}>
              <TouchableOpacity style={styles.camera} activeOpacity={0.8}>
                <MaterialIcons
                  name="camera-alt"
                  size={24}
                  style={{ color: "#bdbdbd" }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.uploadButton}>Upload a photo</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Title..."
              placeholderTextColor="#BDBDBD"
              style={styles.inputTitle}
            />
            <View>
              <Feather
                name="map-pin"
                size={24}
                color={"#BDBDBD"}
                style={styles.iconLocality}
              />
              <TextInput
                placeholder="Location..."
                placeholderTextColor="#BDBDBD"
                style={styles.inputLocality}
              />
            </View>
            <TouchableOpacity
              style={[styles.publishButton]}
              activeOpacity={0.8}
            >
              <Text style={[styles.publishBtnText]}>Publish</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.deleteBtnContainer}
            activeOpacity={0.8}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  contant: {
    flex: 1,
  },
  pictureContainer: {
    flex: 1,
    maxHeight: 240,
    width: "100%",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  uploadButton: {
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
    marginTop: 8,
    marginBottom: 32,
  },
  inputTitle: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    borderColor: "#e8e8e8",
    borderBottomWidth: 1,
    height: 50,
    marginBottom: 16,
  },
  iconLocality: {
    position: "absolute",
    top: 13,
  },
  inputLocality: {
    position: "relative",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    borderColor: "#e8e8e8",
    borderBottomWidth: 1,
    paddingStart: 28,
    height: 50,
    marginBottom: 32,
  },
  publishButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6",
  },
  publishBtnText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  deleteBtnContainer: {
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    marginBottom: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
