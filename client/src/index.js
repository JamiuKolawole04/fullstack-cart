import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import "./styles/index.css";
import App from "./App";
import productReducer, { productsFecth } from "./redux/features/productSlice";
import { productsApi } from "./redux/features/productApi";
import cartReducer, { getTotals } from "./redux/features/cartSlice";
import authReducer, { loadUser } from "./redux/features/authSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

// dispatch data on loading app
store.dispatch(productsFecth());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
