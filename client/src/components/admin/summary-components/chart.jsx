import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getWeekSalesApi } from "../../../api";

export const Chart = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const compare = (a, b) => {
    if (a._id < b._id) return 1;

    if (a._id > b._id) return -1;

    return 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getWeekSalesApi();
      response?.income.sort(compare);

      const newData = response?.income.map((item) => {
        const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        return {
          day: DAYS[item._id - 1],
          amount: item.total / 100,
        };
      });

      setSales(newData);
      try {
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //   const data = [
  //     {
  //       day: "Page A",
  //       amount: 4000,
  //     },
  //     {
  //       day: "Page B",

  //     },
  // {
  //   name: "Page C",
  //   uv: 2000,
  //   pv: 9800,
  //   amt: 2290,
  // },
  // {
  //   name: "Page D",
  //   uv: 2780,
  //   pv: 3908,
  //   amt: 2000,
  // },
  // {
  //   name: "Page E",
  //   uv: 1890,
  //   pv: 4800,
  //   amt: 2181,
  // },
  // {
  //   name: "Page F",
  //   uv: 2390,
  //   pv: 3800,
  //   amt: 2500,
  // },
  // {
  //   name: "Page G",
  //   uv: 3490,
  //   pv: 4300,
  //   amt: 2100,
  // },
  //   ];
  return (
    <Fragment>
      {isLoading ? (
        <Loader>Loading chart...</Loader>
      ) : (
        <StyledChart>
          <h3>Last 7 Days Earnings(US $)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </StyledChart>
      )}
    </Fragment>
  );
};

const StyledChart = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 2rem;
  padding: 1rem;
  border: 2px solid rgba(48, 51, 78, 0.2);
  border-radius: 4px;

  h3 {
    margin-bottom: 1rem;
  }
`;

const Loader = styled.p`
  margin-top: 2rem;
`;
