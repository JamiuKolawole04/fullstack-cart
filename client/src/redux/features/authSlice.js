import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { registerUserApi } from "../../api";

const initialState = {
  token: localStorage.getItem("toke"),
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
      const data = registerUserApi(values);
      console.log(data);
      localStorage.setItem("token", data.access_token);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        return { ...state, token: action.payload };
      } else {
        return state;
      }
    });

    builder.addCase(registerUser.rejected);
  },
});

export default authSlice.reducer;
