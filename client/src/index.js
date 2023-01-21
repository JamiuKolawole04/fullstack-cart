import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import "./styles/index.css";
import App from "./App";
import productReducer from "./redux/features/productSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
