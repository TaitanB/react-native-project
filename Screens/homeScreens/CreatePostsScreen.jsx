import React, { useState, useEffect } from "react";
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

import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";

import PhotoCamera from "../../Components/PhotoCamera";

const CreatePostsScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [onFocusLocation, setOnFocusLocation] = useState(false);
  const [onFocusDescription, setOnFocusDescription] = useState(false);

  const [location, setLocation] = useState(null);

  const navigation = useNavigation();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const submitPublish = () => {
    setLocationName("");
    setDescription("");
    console.log(location);
    // console.log(locationName);
    // console.log(description);
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      } catch (error) {
        console.log("Error getting location", error);
      }
    };
    getLocation();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <PhotoCamera />
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.uploadBtn}>Upload a photo</Text>
        </TouchableOpacity>
        <View
          style={{
            ...styles.formCreatePost,
            paddingBottom: isShowKeyboard ? 32 : 9,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              <TextInput
                value={description}
                onChangeText={(value) => setDescription(value.trim())}
                placeholder="Description..."
                placeholderTextColor="#BDBDBD"
                onSubmitEditing={keyboardHide}
                style={{
                  ...styles.inputDescription,
                  borderColor: onFocusDescription ? "#FF6C00" : "#E8E8E8",
                }}
                onFocus={() => {
                  setIsShowKeyboard(true), setOnFocusDescription(true);
                }}
                onBlur={() => {
                  setOnFocusDescription(false);
                }}
              />
              <View>
                <Feather
                  name="map-pin"
                  size={24}
                  color={"#BDBDBD"}
                  style={styles.iconLocation}
                />
                <TextInput
                  value={locationName}
                  onChangeText={(value) => setLocationName(value.trim())}
                  placeholder="Location..."
                  placeholderTextColor="#BDBDBD"
                  onSubmitEditing={keyboardHide}
                  style={{
                    ...styles.inputLocation,
                    borderColor: onFocusLocation ? "#FF6C00" : "#E8E8E8",
                  }}
                  onFocus={() => {
                    setIsShowKeyboard(true), setOnFocusLocation(true);
                  }}
                  onBlur={() => {
                    setOnFocusLocation(false);
                  }}
                />
              </View>
              {!isShowKeyboard && (
                <TouchableOpacity
                  style={styles.publishBtn}
                  activeOpacity={0.7}
                  onPress={() => {
                    submitPublish(), navigation.navigate("Posts");
                  }}
                >
                  <Text style={styles.publishBtnText}>Publish</Text>
                </TouchableOpacity>
              )}
            </View>
            {!isShowKeyboard && (
              <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7}>
                <Feather name="trash-2" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    justifyContent: "flex-end",
  },

  uploadBtn: {
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
    marginTop: 8,
    marginBottom: 32,
  },

  formCreatePost: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },

  inputDescription: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    height: 50,
    marginBottom: 16,
  },

  iconLocation: {
    position: "absolute",
    top: 13,
  },

  inputLocation: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    borderColor: "#e8e8e8",
    borderBottomWidth: 1,
    paddingStart: 28,
    height: 50,
    marginBottom: 32,
  },

  publishBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6",
  },

  publishBtnText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  deleteBtn: {
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
