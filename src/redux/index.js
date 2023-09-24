import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    isLogged: false,
    token:
      localStorage.getItem("dataUser") &&
      JSON.parse(localStorage.getItem("dataUser")).token,

    user:
      localStorage.getItem("dataUser") &&
      JSON.parse(localStorage.getItem("dataUser")).user,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogged = true;
    },
    updateUserSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogged = true;
    },
    logoutSuccess: (state, action) => {
      state.user = action.payload;
      state.token = action.payload;
      state.isLogged = false;
    },
    register: (state, action) => {},
  },
});

export const mainStore = configureStore({
  reducer: {
    User: userSlice.reducer,
  },
});
