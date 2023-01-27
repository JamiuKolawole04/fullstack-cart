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

export const EditProductApi = async (post) => {
  const { data } = await axios({
    method: "PUT",
    url: `products/${post.product._id}`,
    data: post,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const deletProductApi = async (id) => {
  const { data } = await axios({
    method: "DELETE",
    url: `products/${id}`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const getProductApi = async (id) => {
  const { data } = await axios({
    method: "GET",
    url: `/products/${id}`,
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

export const getOrdersApi = async () => {
  const { data } = await axios({
    method: "GET",
    url: `/order/?new=true`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const getOrderApi = async (id) => {
  const { data } = await axios({
    method: "GET",
    url: `/order/${id}`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const editOrdersApi = async (values, newOrder) => {
  const { data } = await axios({
    method: "PUT",
    url: `/order/${values.id}`,
    data: newOrder,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const getUsersApi = async () => {
  const { data } = await axios({
    method: "GET",
    url: `/user`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const getUserApi = async (id) => {
  const { data } = await axios({
    method: "GET",
    url: `/user/${id}`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};

export const deleteUsersApi = async (id) => {
  const { data } = await axios({
    method: "DELETE",
    url: `/user/${id}`,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return data;
};
