import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Nabvar, Cart, Home, NotFound } from "./components";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
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
