import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import moment from "moment";

import { getOrdersApi } from "../../../api";

export const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getOrdersApi();
        setOrders(response?.orders);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledTransaction>
      {isLoading ? (
        <p>Transaction loading...</p>
      ) : (
        <Fragment>
          <h3>Latest Transaction</h3>

          {orders?.map((order, _i) => (
            <Transaction key={_i}>
              <p>{order.shipping.name}</p>
              <p>${(order.total / 100).toLocaleString()}</p>
              <p>{moment(order.createdAt).fromNow()}</p>
            </Transaction>
          ))}
        </Fragment>
      )}
    </StyledTransaction>
  );
};

const StyledTransaction = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 4px;
`;

const Transaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background: rgba(38, 198, 249, 0.12);

  p {
    flex: 1;
  }

  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
