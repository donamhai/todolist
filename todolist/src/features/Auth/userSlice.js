import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FireBase from "../../config/firebase";
import StorageKeys from "../../constants/storage-keys";

export const register = createAsyncThunk("user/register", async (payload) => {
  //call api to register
  const data = await FireBase.auth().createUserWithEmailAndPassword(
    payload.email,
    payload.password
  );

  // save data to local storage
  localStorage.setItem(
    StorageKeys.TOKEN,
    data.user.multiFactor.user.accessToken
  );
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  //   call api to login
  const data = await FireBase.auth().signInWithEmailAndPassword(
    payload.email,
    payload.password
  );

  //   save data to local storage
  localStorage.setItem(
    StorageKeys.TOKEN,
    data.user.multiFactor.user.accessToken
  );
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logout(state) {
      // clear local storage
      FireBase.auth().signOut();
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { logout } = actions;
export default reducer;
