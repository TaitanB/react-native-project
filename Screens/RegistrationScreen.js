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
  Image,
} from "react-native";

export default function RegistrationScreen({ setGoTo }) {
  //   console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onFocusLogin, setOnFocusLogin] = useState(false);
  const [onFocusEmail, setOnFocusEmail] = useState(false);
  const [onFocusPassword, setOnFocusPassword] = useState(false);

  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

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

    console.log(`login: ${login}`);
    setLogin("");
    console.log(`email: ${email}`);
    setEmail("");
    console.log(`password: ${password}`);
    setPassword("");
  };

  const goToLoginScreen = () => {
    setGoTo(false);
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
            paddingBottom: isShowKeyboard ? 16 : 45,
            width: dimensions,
          }}
        >
          <View style={{ ...styles.photoContainer, left: dimensions / 2 - 60 }}>
            <Image style={styles.photo}></Image>
            <Image
              source={require("../assets/image/add.png")}
              style={styles.add}
            ></Image>
          </View>
          <View style={styles.header}>
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
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.btn,
              display: isShowKeyboard ? "none" : "flex",
            }}
            onPress={keyboardHide}
          >
            <Text style={styles.btnTitle}>Sing up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: isShowKeyboard ? "none" : "flex",
            }}
            activeOpacity={0.7}
            onPress={goToLoginScreen}
          >
            <Text style={styles.link}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    backgroundColor: "background: rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 45,
    position: "relative",
  },
  photoContainer: {
    width: 132,
    height: 120,
    position: "absolute",
    top: -60,
    // left: "38%",
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
    marginBottom: 33,
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
    // ...Platform.select({
    //   ios: {
    //     backgroundColor: "transparent",
    //     borderColor: "#f0f8ff",
    //   },
    //   android: {
    //     backgroundColor: "#4169e1",
    //     borderColor: "transparent",
    //   },
    // }),
  },
  btnTitle: {
    // color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
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
