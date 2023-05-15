import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../nestedScreens/StartScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator
      initialRouteName="StartScreen"
      screenOptions={({ route }) => ({
        headerTitleStyle: {
          fontFamily: "Roboto-500",
          fontStyle: "normal",
          fontWeight: "medium",
          fontSize: 17,
          lineHeight: 22,
          textAlign: "center",
          letterSpacing: -0.408,
          color: "#212121",
        },
        headerTitleAlign: "center",
        headerStatusBarHeight: 44,
        headerStyle: {
          height: 88,
          borderBottomWidth: 1,
          borderBottomColor: "#BDBDBD",
        },
      })}
    >
      <NestedScreen.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen name="Comment" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
