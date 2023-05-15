import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  userName: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authOut: () => state,
  },
});

// export const { updateUserProfile, authStateChange, authOut } =
//   authSlice.actions;
// export const authReducer = authSlice.reducer;
