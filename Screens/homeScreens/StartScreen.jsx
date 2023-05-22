import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../nestedScreens/PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { authSignOut } from "../../Redux/operations";

const NestedScreen = createStackNavigator();

const StartScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOut());
  };

  // console.log(route);
  return (
    <NestedScreen.Navigator
      initialRouteName="Posts"
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
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: "Posts",
          headerRight: () => (
            <TouchableOpacity
              style={{
                width: 24,
                marginRight: 16,
              }}
              onPress={signOut}
              // onPress={() => navigation.navigate("Login")}
            >
              <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default StartScreen;
