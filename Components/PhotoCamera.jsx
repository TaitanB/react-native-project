// import React, { useState, useEffect } from "react";
// import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
// // import { TouchableOpacity } from "react-native-gesture-handler";
// import { MaterialIcons } from "@expo/vector-icons";
// import * as Location from "expo-location";

// export default function PhotoCamera() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   const [photo, setPhoto] = useState(null);

//   const takePhoto = async () => {
//     const { uri } = await cameraRef.takePictureAsync();
//     const location = await Location.getCurrentPositionAsync();
//     // console.log("latitude", location.coords.latitude);
//     // console.log("longitude", location.coords.longitude);
//     setPhoto(uri);
//     console.log("photo uri ", uri);
//   };

//   const sendPhoto = () => {
//     navigation.navigate("PostsScreen", { photo });
//   };

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();

//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type} ref={setCameraRef}>
//         <View style={styles.photoView}>
//           {photo && (
//             <View style={styles.takePhotoContainer}>
//               <Image
//                 source={{ uri: photo }}
//                 style={{ height: 200, width: 200, borderRadius: 10 }}
//               />
//             </View>
//           )}
//         </View>
//         <TouchableOpacity
//           style={styles.flipContainer}
//           onPress={() => {
//             setType(
//               type === Camera.Constants.Type.back
//                 ? Camera.Constants.Type.front
//                 : Camera.Constants.Type.back
//             );
//           }}
//         >
//           <Text style={styles.flipText}>Flip</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.photoButton}
//           onPress={takePhoto}
//           // onPress={async () => {
//           //   if (cameraRef) {
//           //     const { uri } = await cameraRef.takePictureAsync();
//           //     await MediaLibrary.createAssetAsync(uri);
//           //   }
//           // }}
//         >
//           <MaterialIcons
//             name="camera-alt"
//             size={24}
//             style={{ color: "#bdbdbd" }}
//           />
//         </TouchableOpacity>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   cameraView: {
//     flex: 1,
//     width: "100%",
//     maxHeight: 240,
//     // height: 240,
//     marginTop: 32,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#e8e8e8",
//     backgroundColor: "#f6f6f6",
//     overflow: "hidden",
//   },

//   camera: {
//     flex: 1,
//   },

//   photoView: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   flipContainer: {
//     position: "absolute",
//     top: 8,
//     left: 8,
//     borderRadius: 8,
//     borderColor: "#fff",
//     borderWidth: 1,
//     padding: 5,
//   },

//   flipText: {
//     color: "#fff",
//     fontSize: 10,
//     lineHeight: 12,
//   },

//   photoButton: {
//     backgroundColor: "#ffffff",
//     borderRadius: 50,
//     width: 60,
//     height: 60,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
