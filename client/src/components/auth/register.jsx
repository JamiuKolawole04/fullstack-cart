import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../redux/features/authSlice";

export const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log(auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="name"
        onChange={({ target }) => setUser({ ...user, name: target.value })}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        onChange={({ target }) => setUser({ ...user, email: target.value })}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        onChange={({ target }) => setUser({ ...user, password: target.value })}
      />
      <button>Register</button>
    </form>
  );
};
