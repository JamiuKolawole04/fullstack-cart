import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProductsApi } from "../../api";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const productsFecth = createAsyncThunk(
  "products/productsFecth",
  async (id = null, { rejectWithValue }) => {
    try {
      const products = await getProductsApi();
      return products;
    } catch (err) {
      return rejectWithValue("an error occured");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFecth.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFecth.fulfilled]: (state, action) => {
      state.status = "success";
      // action is returned from the requested data
      //   console.log(action);
      state.items = action.payload.products;
    },
    [productsFecth.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
