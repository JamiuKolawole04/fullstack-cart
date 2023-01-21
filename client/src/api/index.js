import axios from "../utils/axios";

export const getProductsApi = async () => {
  const { data } = await axios({
    method: "GET",
    url: `/products`,
  });

  return data;
};
