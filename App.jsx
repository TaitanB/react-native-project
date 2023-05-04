import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";

SplashScreen.preventAutoHideAsync();

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
});

// import "react-native-gesture-handler";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { StatusBar } from "expo-status-bar";

// import { StyleSheet, View, ImageBackground } from "react-native";
// import React, { useState, useCallback } from "react";

// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// import LoginScreen from "./Screens/LoginScreen";
// import RegistrationScreen from "./Screens/RegistrationScreen";

// SplashScreen.preventAutoHideAsync();

// const MainStack = createStackNavigator(); // вказує на групу навігаторів

// export default function App() {
//   const [goTo, setGoTo] = useState(true);

//   const [fontsLoaded] = useFonts({
//     "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
//     "Roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
//   });

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded) {
//       await SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <View style={styles.container} onLayout={onLayoutRootView}>
//       <ImageBackground
//         style={styles.imageBg}
//         source={require("./assets/image/photo-bg.png")}
//       >
//         <NavigationContainer>
//           <MainStack.Navigator initialRouteName="Login">
//             <MainStack.Screen
//               name="Registration"
//               component={RegistrationScreen}
//             />
//             <MainStack.Screen name="Login" component={LoginScreen} />
//             {/* <MainStack.Screen name="Home" component={Home} /> */}
//           </MainStack.Navigator>
//         </NavigationContainer>
//         {/* {goTo ? (
//           <RegistrationScreen setGoTo={setGoTo} />
//         ) : (
//           <LoginScreen setGoTo={setGoTo} />
//         )} */}
//         <StatusBar style="auto" />
//       </ImageBackground>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   imageBg: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
// });
