import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { changeAvatar } from "../Redux/operations";
import uploadAvatarToStorage from "./uploadAvatar";

const defaultAvatar = "../assets/image/avatar.jpg";

export function AvatarContainer() {
  const dispatch = useDispatch();
  const { userAvatar } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState(userAvatar);

  const avatarAddHandler = async () => {
    // No permissions request is necessary for launching the image library
    const imageFromGallery = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!imageFromGallery.canceled) {
      setAvatar(imageFromGallery.assets[0].uri);

      const avatarURL = await uploadAvatarToStorage(
        imageFromGallery.assets[0].uri
      );

      dispatch(changeAvatar(avatarURL));
    }
  };

  const avatarDeleteHandler = () => {
    setAvatar(null);
    dispatch(changeAvatar(null));
  };

  return (
    <View style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source={avatar ? { uri: avatar } : require(defaultAvatar)}
      />

      {/* Кнопка Добавить/Удалить аватар */}
      <TouchableOpacity
        style={styles.avatarButton}
        activeOpacity={0.8}
        onPress={!avatar ? avatarAddHandler : avatarDeleteHandler}
      >
        <Ionicons
          name="add-circle-outline"
          size={25}
          color={"#FF6C00"}
          style={avatar && styles.avatarRemoveIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 132,
    height: 120,
    position: "absolute",
    top: -60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatarButton: {
    position: "absolute",
    right: 0,
    bottom: 14,
  },
  avatarRemoveIcon: {
    position: "absolute",
    right: -5,
    bottom: 8,
    transform: [{ rotate: "45deg" }],
  },
});
