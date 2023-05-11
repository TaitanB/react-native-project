import React, { useState } from "react";
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
  Image,
  Dimensions,
} from "react-native";

import ImageBg from "../Components/ImageBg";

import { useNavigation } from "@react-navigation/native";

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onFocusLogin, setOnFocusLogin] = useState(false);
  const [onFocusEmail, setOnFocusEmail] = useState(false);
  const [onFocusPassword, setOnFocusPassword] = useState(false);

  const navigation = useNavigation();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    // console.log(`login: ${login}`);
    // setLogin("");
    // console.log(`email: ${email}`);
    // setEmail("");
    // console.log(`password: ${password}`);
    // setPassword("");
  };

  return (
    <View style={styles.container}>
      <ImageBg>
        <TouchableWithoutFeedback onPress={keyboardHide}>
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
                paddingBottom: isShowKeyboard ? 16 : 45,
                width: Dimensions.get("window").width,
              }}
            >
              <View
                style={{
                  ...styles.photoContainer,
                  left: Dimensions.get("window").width / 2 - 60,
                }}
              >
                <Image style={styles.photo}></Image>
                <Image
                  source={require("../assets/image/add.png")}
                  style={styles.add}
                ></Image>
              </View>
              <View
                style={{
                  ...styles.header,
                  marginTop: isShowKeyboard ? 67 : 92,
                  marginBottom: isShowKeyboard ? 5 : 32,
                }}
              >
                <Text style={styles.headerTitle}>Registration</Text>
              </View>
              <View
                style={{
                  ...styles.inputContainer,
                  borderColor: onFocusLogin ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: onFocusLogin ? "#FFFFFF" : "#F6F6F6",
                }}
              >
                <TextInput
                  style={styles.input}
                  onSubmitEditing={keyboardHide}
                  placeholder="Login"
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setIsShowKeyboard(true), setOnFocusLogin(true);
                  }}
                  onBlur={() => {
                    setOnFocusLogin(false);
                  }}
                  value={login}
                  onChangeText={(value) => setLogin(value.trim())}
                />
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
                  onChangeText={(value) => setPassword(value.trim())}
                />
                <TouchableOpacity>
                  <Text activeOpacity={1} style={styles.show}>
                    Show
                  </Text>
                </TouchableOpacity>
              </View>
              {!isShowKeyboard && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btn}
                    onPress={() => navigation.navigate("Home")}
                  >
                    <Text style={styles.btnTitle}>Sing up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.link}>
                      Already have an account? Sign in
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ffffff",
    // justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "background: rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    position: "relative",
  },
  photoContainer: {
    width: 132,
    height: 120,
    position: "absolute",
    top: -60,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "relative",
  },
  add: {
    position: "absolute",
    right: 0,
    bottom: 14,
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
