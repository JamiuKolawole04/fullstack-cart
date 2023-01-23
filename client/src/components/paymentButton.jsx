import { useSelector } from "react-redux";

import axios from "../utils/axios";

export const PaymentButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios({
      method: "POST",
      url: `/create-checkout-session`,
      data: {
        cartItems,
        userId: user._id,
      },
    })
      .then((res) => {
        if (res.data.url) {
          window.location.assign(res.data.url);
        }
      })
      .catch((err) => console.log(err));
  };

  return <button onClick={() => handleCheckout()}>Check Out</button>;
};
