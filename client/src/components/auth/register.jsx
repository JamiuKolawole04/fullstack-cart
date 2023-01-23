import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../redux/features/authSlice";
import { Nabvar } from "../nabvar";
import { StyledForm } from "./styledForm";

export const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);
  return (
    <Fragment>
      <Nabvar />
      <StyledForm onSubmit={handleSubmit}>
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
          onChange={({ target }) =>
            setUser({ ...user, password: target.value })
          }
        />
        <button>
          {auth.registerStatus === "pending" ? (
            <p>Submitting...</p>
          ) : (
            "Register"
          )}
        </button>

        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null}
      </StyledForm>
    </Fragment>
  );
};
