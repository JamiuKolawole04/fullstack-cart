import axios from "../utils/axios";

export const getProductsApi = async () => {
  const { data } = await axios({
    method: "GET",
    url: `/products`,
  });

  return data;
};

export const createProductApi = async (post) => {
  const { data } = await axios({
    method: "POST",
    url: `products`,
    data: post,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const registerUserApi = async (post) => {
  const { data } = await axios({
    method: "POST",
    url: `/auth/register`,
    data: post,
  });

  return data;
};

export const loginUserApi = async (post) => {
  const { data } = await axios({
    method: "POST",
    url: `/auth/login`,
    data: post,
  });

  return data;
};

export const getUserStatsApi = async () => {
  const { data } = await axios({
    method: "GET",
    url: `/user/stats`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const getOrderStatsApi = async () => {
  const { data } = await axios({
    method: "GET",
    url: `/order/stats`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const getIcomeStatsApi = async () => {
  const { data } = await axios({
    method: "GET",
    url: `/order/income/stats`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const getWeekSalesApi = async () => {
  const { data } = await axios({
    method: "GET",
    url: `/order/week-sales`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};
