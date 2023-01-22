import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../redux/features/authSlice";
import { StyledForm } from "./styledForm";

export const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);
  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Login</h2>

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
      <button>
        {auth.loginStatus === "pending" ? <p>Submitting...</p> : "Login"}
      </button>

      {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
    </StyledForm>
  );
};
