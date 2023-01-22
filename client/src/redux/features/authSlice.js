import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import { registerUserApi } from "../../api";

const initialState = {
  // defaults to null when token is not present
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  _id: null,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(values);
      localStorage.setItem("token", data.access_token);

      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        };
      }
    },

    logOutUser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: localStorage.getItem("token"),
        name: null,
        email: null,
        _id: null,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload.access_token);
        return {
          ...state,
          token: action.payload.access_token,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      console.log(action);
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload.message,
      };
    });
  },
});

export const { loadUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
