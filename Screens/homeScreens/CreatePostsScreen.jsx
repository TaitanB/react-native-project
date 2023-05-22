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
  Image,
} from "react-native";
import { useSelector } from "react-redux";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import * as Location from "expo-location";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";

import { Feather, MaterialIcons } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [onFocusLocation, setOnFocusLocation] = useState(false);
  const [onFocusDescription, setOnFocusDescription] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const { userId, userName } = useSelector((state) => state.auth);

  console.log(type);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
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

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    // console.log("latitude", location.coords.latitude);
    // console.log("longitude", location.coords.longitude);
    setPhoto(uri);
    console.log("photo uri ", uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("StartScreen");
    setLocationName("");
    setDescription("");
    setPhoto(null);
  };

  const uploadPostToServer = async () => {
    await uploadPhotoToServer();
    const createPost = await addDoc(collection(db, "posts"), {
      photo,
      description,
      location,
      locationName,
      userId,
      userName,
    });

    console.log(createPost);
  };

  const uploadPhotoToServer = async () => {
    if (!photo) return;

    try {
      const response = await fetch(photo);
      const blobFile = await response.blob();
      const id = Date.now();
      // const reference = ref(storage, `images/${id}`);
      // const result = await uploadBytesResumable(reference, blobFile);
      // const processedPhoto = await getDownloadURL(result.ref);
      //? або
      const processedPhoto = await getDownloadURL(ref(storage, `images/${id}`));

      setPhoto(processedPhoto);
    } catch (error) {
      alert("Try again \n", error.message);
    }
  };

  //todo завантаження фото з галереї
  // const uploadPhotoFromGallery = async () => {
  //   let userImage = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [5, 3],
  //     quality: 1,
  //   });
  //   if (!userImage.canceled) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       img: userImage.assets[0].uri,
  //     }));
  //   }
  // };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.cameraView}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <View style={styles.photoView}>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ height: 200, width: 200, borderRadius: 10 }}
                  />
                </View>
              )}
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={styles.flipText}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                <MaterialIcons
                  name="camera-alt"
                  size={24}
                  style={{ color: "#bdbdbd" }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
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
                  onPress={sendPhoto}
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

  cameraView: {
    flex: 1,
    width: "100%",
    maxHeight: 240,
    // height: 240,
    marginTop: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    overflow: "hidden",
  },

  camera: {
    flex: 1,
  },

  // takePhotoContainer: {
  //   position: "absolute",
  //   top: 50,
  //   left: 10,
  //   borderColor: "#fff",
  //   borderWidth: 1,
  //   borderRadius: 10,
  // },

  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  flipContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 8,
    borderColor: "#fff",
    borderWidth: 1,
    padding: 5,
  },

  flipText: {
    color: "#fff",
    fontSize: 10,
    lineHeight: 12,
  },

  photoButton: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
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
