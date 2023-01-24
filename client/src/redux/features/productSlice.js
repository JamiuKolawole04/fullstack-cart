import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getProductsApi, createProductApi } from "../../api";

const initialState = {
  items: [],
  status: null,
  error: null,
  createStatus: null,
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

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values, { rejectWithValue }) => {
    try {
      const products = await createProductApi(values);
      return products;
    } catch (err) {
      toast.error(err.response?.data?.message, {
        position: "bottom-left",
      });
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

    // products create requests
    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.createStatus = "success";
      // action is returned from the requested data
      //   console.log(action);
      state.items.push(action.payload.savedProduct);
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
