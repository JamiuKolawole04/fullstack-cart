import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { getUserApi } from "../../api";

export const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [updating, setUpdating] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await getUserApi(params.id);

        setUser({
          ...response.user,
          password: "",
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <StyledProfile>
      <ProfileContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>User profile</h3>
            {user.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={({ target }) =>
                setUser({ ...user, name: target.value })
              }
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={({ target }) =>
                setUser({ ...user, email: target.value })
              }
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={({ target }) =>
                setUser({ ...user, password: target.value })
              }
            />

            <button>{updating ? "updating" : "Update Profile"}</button>
          </form>
        )}
      </ProfileContainer>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;
  padding: 2rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3 {
      margin-bottom: 0.5rem;
    }

    label {
      margin-bottom: 0.2rem;
      color: gray;
    }

    input {
      margin-bottom: 1rem;
      outline: none;
      border: none;
      border-bottom: 1px solid gray;
    }
  }
`;

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgba(253, 181, 40, 0.12);
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 1rem;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 1rem;
`;
