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
} from "./components";
import { Register } from "./components";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
