import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Nabvar, Cart, Home, NotFound } from "./components";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Nabvar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
