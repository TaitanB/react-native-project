import React, { useState, useEffect } from "react";
import { Keyboard, Text, TextInput, StyleSheet, View } from "react-native";

const KeyboardMetrics = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      console.log("Keyboard Shown");
      console.log(Keyboard.metrics().height);
      setKeyboardHeight(Keyboard.metrics().height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      console.log("Keyboard Hidden");
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholder="Click here…"
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={style.status}>{keyboardHeight}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding: 10,
    textAlign: "center",
  },
});

export default KeyboardMetrics;
