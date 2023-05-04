import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      initialRouteName="PostsSceen"
      screenOptions={({ route }) => ({
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconName;
        //   if (route.name === "Profile") {
        //     iconName = "person-outline";
        //   } else if (route.name === "CreatePosts") {
        //     iconName = "add";
        //   } else if (route.name === "Posts") {
        //     iconName = "md-grid-outline";
        //   }
        //   return <Ionicons name={iconName} size={size} color={color} />;
        // },
        tabBarItemStyle: {
          borderRadius: 20,
          height: 40,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#21212180",
        tabBarStyle: [
          {
            height: 73,
            paddingTop: 9,
            paddingBottom: 22,
            paddingHorizontal: 60,
            borderTopWidth: 1,
            borderTopColor: "#BDBDBD",
            display:
              route.name === "CreatePosts" ||
              route.name === "Comments" ||
              route.name === "Map"
                ? "none"
                : "flex",
          },
        ],
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarShowLabel: false,
          headerTitle: "Posts",
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
          headerRight: () => (
            <TouchableOpacity
              style={{
                width: 24,
                marginRight: 16,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <MaterialIcons name="logout" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="grid-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarShowLabel: false,
          headerTitle: "Map",
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
          headerLeft: () => (
            <TouchableOpacity
              style={{ width: 24, marginLeft: 16 }}
              onPress={() => navigation.navigate("Posts")}
            >
              <Ionicons name="arrow-back" size={24} color="#21212180" />
            </TouchableOpacity>
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: "Comments",
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
          headerLeft: () => (
            <TouchableOpacity
              style={{ width: 24, marginLeft: 16 }}
              onPress={() => navigation.navigate("Posts")}
            >
              <Ionicons name="arrow-back" size={24} color="#21212180" />
            </TouchableOpacity>
          ),
        }}
      /> */}
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarShowLabel: false,
          headerTitle: "Create a post",
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
          headerLeft: () => (
            <TouchableOpacity
              style={{ width: 24, marginLeft: 16 }}
              onPress={() => navigation.navigate("Posts")}
            >
              <Ionicons name="arrow-back" size={24} color="#21212180" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                ...styles.addIconContainer,
                backgroundColor: focused ? "#ffffff" : "#FF6C00",
              }}
            >
              <Ionicons
                name="add-outline"
                size={size}
                color={color}
                style={{
                  ...styles.addIcon,
                  color: focused ? "#21212180" : "#ffffff",
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconContainer}>
              <Feather name="user" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  addIconContainer: {
    width: 70,
    height: 40,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
