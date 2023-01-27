import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getTotals, clearCart } from "../redux/features/cartSlice";
import { Nabvar } from "./nabvar";

export const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  return (
    <Fragment>
      <Nabvar />
      <Container>
        <h2>Checkout success</h2>
        <p>Your order might take some time to process</p>
        <p>Check your order status at your profile after about 5mins.</p>
        <p>
          Incase of any queries, contact the support
          <strong>support@onlineshop.com</strong>
        </p>
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;
