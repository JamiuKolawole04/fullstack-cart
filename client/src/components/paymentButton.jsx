import axios from "../utils/axios";

export const PaymentButton = ({ cartItems }) => {
  const handleCheckout = () => {
    console.log(cartItems);
  };

  return <button onClick={() => handleCheckout()}>Check Out</button>;
};
