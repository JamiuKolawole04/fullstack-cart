import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getOrderApi } from "../../api";
import { Nabvar } from "../nabvar";

export const Order = () => {
  const params = useParams();

  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const response = await getOrderApi(params.id);
        console.log(response);
        setOrder(response.order);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [params.id]);

  return (
    <Fragment>
      <Nabvar />
      <StyledOrder>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <OrdersContainer>
              <h2>Order Details</h2>

              <p>
                {order.delivery_status === "pending" ? (
                  <Pending>Pending</Pending>
                ) : order.delivery_status === "dispatched" ? (
                  <Dispatched>Dispatched</Dispatched>
                ) : order.delivery_status === "delivered" ? (
                  <Delivered>Delivered</Delivered>
                ) : (
                  "error"
                )}
              </p>

              <h3>Ordered Products</h3>
              <Items>
                {order?.products?.map((product, _i) => (
                  <Item key={_i}>
                    <span>{product.desc}</span>
                    <span>{product.cartQuantity}</span>
                    <span>{"$" + product.price.toLocaleString()}</span>
                  </Item>
                ))}
              </Items>

              <div>
                <h3>Total price</h3>
                <p>{"$" + (order.total / 100).toLocaleString()}</p>
              </div>

              <div>
                <h3>Shipping Details</h3>
                <p>Customer: {order.shipping?.name}</p>
                <p>City: {order.shipping?.address?.city}</p>
                <p>Email: {order?.shippingCustomerDetails?.email}</p>
              </div>
            </OrdersContainer>
          </Fragment>
        )}
      </StyledOrder>
    </Fragment>
  );
};

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;

  h3 {
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;
  padding: 2rem;
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;

    &:first-child {
      font-weight: bold;
    }
  }
`;

const Item = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Pending = styled.span`
  color: rgb(253, 181, 40);
  background: rgba(253, 181, 40, 0.12);
  border: 2px 4px;
  border-radius: 4px;
  font-size: 14px;
`;

const Dispatched = styled.span`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 14px;
`;

const Delivered = styled.span`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 14px;
`;
