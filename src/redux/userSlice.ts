import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface userState {
  userData: object | null;
}

const initialState: userState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<object>) => {
      const userState = state;
      userState.userData = action.payload;
    },
    logout: (state) => {
      const userState = state;
      userState.userData = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.userData;
export default userSlice.reducer;
