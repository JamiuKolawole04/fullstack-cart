import { Outlet, useNavigate } from "react-router-dom";
import { Fragment } from "react";

import { AdminHeaders, PrimaryButton } from "./commonStyled";

export const Products = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <AdminHeaders>
        Products
        <PrimaryButton
          onClick={() => navigate("/admin/products/create-products")}
        >
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </Fragment>
  );
};
