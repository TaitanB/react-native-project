import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import PostsScreen from "../Screens/homeScreens/PostsScreen";
import MapScreen from "../Screens/nestedScreens/MapScreen";
import CommentsScreen from "../Screens/nestedScreens/CommentsScreen";
import { authSignOut } from "../Redux/operations";

const NestedStack = createStackNavigator();

const Home = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOut());
  };

  return (
    <View style={styles.container}>
      <NestedStack.Navigator
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
          headerShown:
            route.name === "Map" || route.name === "Comments" ? false : true,
        })}
      >
        <NestedStack.Screen
          name="Posts"
          component={PostsScreen}
          options={({ route }) => ({
            headerTitle: "Posts",
            headerRight: () => (
              <TouchableOpacity
                style={{ width: 24, marginRight: 16 }}
                onPress={signOut}
              >
                <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
              </TouchableOpacity>
            ),
          })}
        />
        {/* <NestedStack.Screen
          name="Map"
          component={MapScreen}
          options={({ route }) => ({})}
        />
        <NestedStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{}}
        /> */}
      </NestedStack.Navigator>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
