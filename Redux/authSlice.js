import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  userName: null,
  userEmail: null,
  userAvatar: null,
  stateChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userEmail: payload.userEmail,
      userAvatar: payload.userAvatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),

    updateAvatar: (state, { payload }) => ({
      ...state,
      userAvatar: payload.userAvatar,
    }),

    authOut: () => state,
  },
});

export const { updateUserProfile, authStateChange, authOut, updateAvatar } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
