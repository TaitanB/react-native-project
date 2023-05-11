import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
// import MapScreen from "./MapScreen";
// import CommentsScreen from "./CommentsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Tabs.Navigator
        initialRouteName="PostsSceen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Profile") {
              iconName = "user";
            } else if (route.name === "CreatePosts") {
              iconName = "plus";
            } else if (route.name === "Posts") {
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
              display:
                route.name === "CreatePosts" ||
                route.name === "Comments" ||
                route.name === "Map"
                  ? "none"
                  : "flex",
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
          name="Posts"
          component={PostsScreen}
          options={({ route }) => ({
            headerTitle: "Posts",
            headerShown:
              route.name === "Map" || route.name === "Comment" ? false : true,
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
          })}
        />
        {/* <Tabs.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerTitle: "Map",
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
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
