import { Outlet, useNavigate } from "react-router-dom";
import { Fragment } from "react";

export const Products = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      Products
      <button onClick={() => navigate("/admin/products/create-products")}>
        Create
      </button>
      <Outlet />
    </Fragment>
  );
};
