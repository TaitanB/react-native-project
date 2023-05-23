import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import LoginScreen from "../Screens/authScreens/LoginScreen";
import RegistrationScreen from "../Screens/authScreens/RegistrationScreen";
import StartScreen from "../Screens/homeScreens/StartScreen";
import CreatePostsScreen from "../Screens/homeScreens/CreatePostsScreen";
import ProfileScreen from "../Screens/homeScreens/ProfileScreen";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  const navigation = useNavigation();
  console.log(isAuth);

  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <Tabs.Navigator
      initialRouteName="StartScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "CreatePosts") {
            iconName = "plus";
          } else if (route.name === "StartScreen") {
            iconName = "grid";
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarItemStyle: {
          borderRadius: 20,
          marginHorizontal: 10,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#21212180",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveBackgroundColor: "#ffffff",
        tabBarStyle: [
          {
            height: 58,
            paddingTop: 9,
            paddingBottom: 9,
            paddingHorizontal: 60,
            borderTopWidth: 1,
            borderTopColor: "#BDBDBD",
            display: route.name === "CreatePosts" ? "none" : "flex",
          },
        ],
        tabBarShowLabel: false,
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
      <Tabs.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerTitle: "Create post",
          headerLeft: () => (
            <TouchableOpacity
              style={{ width: 24, marginLeft: 16 }}
              onPress={() => navigation.navigate("Posts")}
            >
              <Ionicons name="arrow-back" size={24} color="#21212180" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};
