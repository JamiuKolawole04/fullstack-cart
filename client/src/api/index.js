import axios from "../utils/axios";

export const getProductsApi = async () => {
  const { data } = await axios({
    method: "GET",
    url: `/products`,
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
