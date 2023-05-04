import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onFocusEmail, setOnFocusEmail] = useState(false);
  const [onFocusPassword, setOnFocusPassword] = useState(false);

  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      // console.log(dimensions);
      setDimensions(window.width);
    });
    return () => subscription?.remove();
  });

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    // console.log(`email: ${email}`);
    // setEmail("");
    // console.log(`password: ${password}`);
    // setPassword("");
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={styles.imageBg}
          source={require("../assets/image/photo-bg.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 111,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Sing in</Text>
              </View>
              <View
                style={{
                  ...styles.inputContainer,
                  borderColor: onFocusEmail ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: onFocusEmail ? "#FFFFFF" : "#F6F6F6",
                }}
              >
                <TextInput
                  style={styles.input}
                  onSubmitEditing={keyboardHide}
                  placeholder="Email"
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setIsShowKeyboard(true), setOnFocusEmail(true);
                  }}
                  onBlur={() => {
                    setOnFocusEmail(false);
                  }}
                  value={email}
                  onChangeText={(value) => setEmail(value.trim())}
                />
              </View>
              <View
                style={{
                  ...styles.inputContainer,
                  borderColor: onFocusPassword ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: onFocusPassword ? "#FFFFFF" : "#F6F6F6",
                }}
              >
                <TextInput
                  style={styles.input}
                  onSubmitEditing={keyboardHide}
                  placeholder="Password"
                  placeholderTextColor={"#BDBDBD"}
                  secureTextEntry={true}
                  onFocus={() => {
                    setIsShowKeyboard(true), setOnFocusPassword(true);
                  }}
                  onBlur={() => {
                    setOnFocusPassword(false);
                  }}
                  value={password}
                  onChangeText={(value) => setEmail(value.trim())}
                />
                <TouchableOpacity>
                  <Text activeOpacity={1} style={styles.show}>
                    Show
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  ...styles.btn,
                  display: isShowKeyboard ? "none" : "flex",
                }}
                onPress={() => {
                  navigation.navigate("Home");
                  keyboardHide;
                }}
              >
                <Text style={styles.btnTitle}>Sing in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  display: isShowKeyboard ? "none" : "flex",
                }}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.link}>Don't have an account? Sign up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#ffffff",
    position: "relative",
    justifyContent: "flex-end",
  },
  imageBg: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  form: {
    backgroundColor: "background: rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    position: "relative",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontFamily: "Roboto-500",
    fontStyle: "normal",
    fontWeight: "medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  inputContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    position: "relative",
  },
  input: {
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontWeight: "regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  show: {
    marginTop: 16,
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontWeight: "regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    color: "#1B4371",
    position: "absolute",
    right: 3,
    bottom: 3,
  },
  btn: {
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: "#FF6C00",
    padding: 16,
    marginTop: 27,
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontWeight: "regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  link: {
    marginTop: 16,
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontWeight: "regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});