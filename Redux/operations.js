import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import db from "../firebase/config";
import { auth } from "../firebase/config";
import { authSlice } from "./rootReducer";

const { updateUserProfile, authStateChange, authOut } = authSlice.actions;

export const authSignUp =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user", userCredential.user);

      await updateProfile(userCredential.user, {
        displayName: login,
      });

      const { displayName, uid } = userCredential.user;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
      };

      console.log("userUpdateProfile =>", userUpdateProfile);

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.error("authSignUp__error.message =>", error.message);
      throw error;
    }
  };

export const authSignIn =
  ({ email, password }) =>
  async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user =>", userCredential.user);
    } catch (error) {
      console.error("authSignIn__error.message =>", error.message);
      throw error;
    }
  };

export const authSignOut = () => async (dispatch) => {
  await signOut();
  dispatch(authOut());
};

// ! Спостерігаємо за користувачем → перезавантаження додатку
export const authStateChangeUser = () => async (dispatch) => {
  await onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userName: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
