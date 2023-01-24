import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import { registerUserApi, loginUserApi } from "../../api";

const initialState = {
  // defaults to null when token is not present
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  _id: null,
  isAdmin: false,
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(values);
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
          isAdmin: user.isAdmin,
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
        isAdmin: false,
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
          isAdmin: user.isAdmin,
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

    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload.access_token);
        return {
          ...state,
          token: action.payload.access_token,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          loginStatus: "success",
        };
      } else {
        return state;
      }
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      console.log(action);
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload.message,
      };
    });
  },
});

export const { loadUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
