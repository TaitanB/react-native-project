import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import db from "../firebase/config";
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
      const userAvatar = getState().auth.avatar;
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
        avatar: photoURL,
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
          avatar: photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert(
          "Password is invalid for the given email, or the account corresponding to the email does not have a password set"
        );
      }
      if (errorCode === "auth/user-not-found") {
        alert("No user corresponding to the given email");
      }
      if (errorCode === "auth/user-disabled") {
        alert("User corresponding to the given email has been disabled");
      }
      if (errorCode === "auth/invalid-email") {
        alert("Email address is not valid");
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
          avatar: photoURL,
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
    // Проверка: это 'Регистрация' или 'Профиль'. Если 'Регистрация', то user еще не существует...
    if (user !== null) {
      await updateProfile(user, {
        photoURL: processedAvatarURL,
      });
    }
    // Запись в стейт Редакса Аватарки, чтобы при Регистрации 'authSignUpUser' взяла оттуда данные
    dispatch(updateAvatar({ avatar: processedAvatarURL }));
  };
