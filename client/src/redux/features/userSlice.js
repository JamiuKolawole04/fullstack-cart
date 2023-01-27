import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getUsersApi, deleteUsersApi } from "../../api";

const initialState = {
  user: [],
  status: null,
  deleteStatus: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
  try {
    const response = await getUsersApi();

    return response.users;
  } catch (err) {
    console.log(err);
  }
});

export const userDelete = createAsyncThunk("users/userDelete", async (id) => {
  try {
    const response = await deleteUsersApi(id);

    return response.user;
  } catch (err) {
    console.log(err);
    toast.error(err.response.data, {
      position: "bottom-left",
    });
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },

    // user delete
    [userDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [userDelete.fulfilled]: (state, action) => {
      const newUser = state.user.filter(
        (item) => item._id !== action.payload._id
      );

      state.user = newUser;
      state.deleteStatus = "success";
      toast.error("user deleted", {
        position: "bottom-left",
      });
    },
    [userDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default userSlice.reducer;
