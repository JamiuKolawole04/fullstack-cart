import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";

import { Widget } from "./summary-components/widget";
import { getOrderStatsApi, getUserStatsApi, getIcomeStatsApi } from "../../api";
import { Chart } from "./summary-components/chart";
import { Transactions } from "./summary-components/transaction";

export const Summary = () => {
  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState([]);
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState([]);

  const compare = (a, b) => {
    if (a._id < b._id) return 1;

    if (a._id > b._id) return -1;

    return 0;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUserStatsApi();

        response?.users.sort(compare);
        setUsers(response.users);
        setUsersPerc(
          (response.users[0].total -
            response.users[0].total / response.users[0].total) *
            100
        );
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getOrderStatsApi();

        response?.orders.sort(compare);
        setOrders(response?.orders);
        setOrdersPerc(
          (response.orders[0].total -
            response.orders[0].total / response.orders[0].total) *
            100
        );
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getIcomeStatsApi();

        response?.income.sort(compare);
        setIncome(response?.income);
        setIncomePerc(
          (response.income[0].total -
            response.income[0].total / response.income[0].total) *
            100
        );
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: usersPerc,
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "rgb(38, 198, 249)",
      bgColor: "rgba(102, 108, 249, 0.12)",
      percentage: ordersPerc,
    },
    {
      icon: <FaChartBar />,
      digits: income[0]?.total ? income[0]?.total : "",
      isMoney: true,
      title: "Earnings",
      color: "rgb(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: incomePerc,
    },
  ];

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>How your shop is performing compared to the previous month</p>
          </Title>
          <WidgetWrapper>
            {data?.map((item, _i) => (
              <Widget key={_i} data={item}></Widget>
            ))}
          </WidgetWrapper>
        </Overview>

        <Chart />
      </MainStats>

      <SideStats>
        <Transactions />
      </SideStats>
    </StyledSummary>
  );
};

const StyledSummary = styled.section`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
