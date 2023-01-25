import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Nabvar,
  Cart,
  Home,
  NotFound,
  Login,
  CheckoutSuccess,
  Dashboard,
  Products,
  Summary,
  Register,
} from "./components";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Nabvar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="checkout-success" element={<CheckoutSuccess />} />
          <Route path="admin">
            <Route index={true} element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="summary" element={<Summary />} />
          </Route>
          {/* <Route path="admin" element={<Dashboard />}>
            <Route path="products" element={<Products />} />
            <Route path="summary" element={<Summary />} />
          </Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
