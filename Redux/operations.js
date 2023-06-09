import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/config";
import {
  updateUserProfile,
  authStateChange,
  authOut,
  updateAvatar,
} from "./authSlice";

export const authSignUp =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const userAvatar = getState().auth.userAvatar;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user", userCredential.user);

      await updateProfile(userCredential.user, {
        displayName: login,
        photoURL: userAvatar,
      });

      const { displayName, uid, photoURL } = userCredential.user;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        email,
        userAvatar: photoURL,
      };

      console.log("userUpdateProfile =>", userUpdateProfile);

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode == "auth/weak-password") {
        alert("The password is too weak");
      }
      if (errorCode == "auth/email-already-in-use") {
        alert("Already exists an account with the given email address");
      }
      if (errorCode == "auth/invalid-email") {
        alert("Email address is not valid");
      } else {
        alert(errorMessage);
      }
      console.error(error);
    }
  };

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user =>", userCredential.user);

      const { uid, displayName, photoURL } = userCredential.user;
      dispatch(
        updateUserProfile({
          userName: displayName,
          userId: uid,
          email,
          userAvatar: photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Password is invalid for this email address.");
      }
      if (errorCode === "auth/user-not-found") {
        alert("No user with this email address was found.");
      }
      if (errorCode === "auth/user-disabled") {
        alert("The user with this email address is disabled.");
      }
      if (errorCode === "auth/invalid-email") {
        alert("Email address is invalid.");
      } else {
        alert(errorMessage);
      }
      console.error(error);
    }
  };

export const authSignOut = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authOut());
  } catch (error) {
    console.log("error", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        const userUpdateProfile = {
          userName: displayName,
          userId: uid,
          email,
          userAvatar: photoURL,
        };
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    } catch (error) {
      console.log("error", error.message);
      signOut(auth);
      dispatch(authOut());
    }
  });
};

export const changeAvatar =
  (processedAvatarURL) => async (dispatch, getState) => {
    const user = auth.currentUser;
    if (user !== null) {
      await updateProfile(user, {
        photoURL: processedAvatarURL,
      });
    }

    dispatch(updateAvatar({ userAvatar: processedAvatarURL }));
  };
