import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getProductsApi,
  createProductApi,
  deletProductApi,
  EditProductApi,
} from "../../api";

const initialState = {
  items: [],
  status: null,
  error: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
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
      toast.success("product created successfully", {
        position: "top-right",
      });
      return products;
    } catch (err) {
      toast.error(err.response?.data?.message, {
        position: "top-right",
      });
      return rejectWithValue("an error occured");
    }
  }
);

export const productsEdit = createAsyncThunk(
  "products/productsEdit ",
  async (values, { rejectWithValue }) => {
    try {
      const products = await EditProductApi(values);
      toast.success("product edited successfully", {
        position: "top-right",
      });
      return products;
    } catch (err) {
      toast.error(err.response?.data?.message, {
        position: "top-right",
      });
      return rejectWithValue("an error occured");
    }
  }
);

export const productsDelete = createAsyncThunk(
  "products/productsDelete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deletProductApi(id);
      // toast.success("product created successfully", {
      //   position: "top-right",
      // });
      return response.product;
    } catch (err) {
      toast.error(err.response?.data?.message, {
        position: "top-right",
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

    // product edit
    [productsEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productsEdit.fulfilled]: (state, action) => {
      state.editStatus = "success";
      // action is returned from the requested data
      //   console.log(action);
      const updatedProducts = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );

      state.items = updatedProducts;
    },
    [productsEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
      state.error = action.payload;
    },

    // product delete
    [productsDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productsDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "success";
      toast.error("product deleted", {
        position: "top-right",
      });
    },
    [productsDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
