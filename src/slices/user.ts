import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    refreshToken: localStorage.getItem("xdref"),
    authToken: localStorage.getItem("xdaut"),
    loading: true,
  },
  reducers: {
    loginUser: (state, action) => {
      const { access, refresh } = action.payload;
      state.authToken = access;
      state.refreshToken = refresh;
      localStorage.setItem("xdref", refresh);
      localStorage.setItem("xdaut", access);
    },
    logoutUser: (state) => {
      state.authToken = null;
      state.refreshToken = null;
      localStorage.removeItem("xdref");
      localStorage.removeItem("xdaut");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
