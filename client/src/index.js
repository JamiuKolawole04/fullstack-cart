import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/index.css";
// import App from "./App";
import productReducer, { productsFecth } from "./redux/features/productSlice";
import { productsApi } from "./redux/features/productApi";
import cartReducer, { getTotals } from "./redux/features/cartSlice";
import authReducer, { loadUser } from "./redux/features/authSlice";
import {
  Cart,
  CheckoutSuccess,
  Dashboard,
  Home,
  Login,
  NotFound,
  Products,
  Register,
  Summary,
  Index,
  CreateProducts,
  ProductList,
  Orders,
  Users,
  Product,
  Order,
  UserProfile,
} from "./components";

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

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Home />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Dashboard />,
    children: [
      {
        path: "products",
        element: <Products />,
        children: [
          {
            index: true,
            element: <ProductList />,
          },
          {
            path: "create-products",
            element: <CreateProducts />,
          },
        ],
      },
      {
        path: "summary",
        element: <Summary />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/order/:id",
    element: <Order />,
  },
  {
    path: "/user/:id",
    element: <UserProfile />,
  },
  {
    path: "/checkout-success",
    element: <CheckoutSuccess />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />

      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>
);
