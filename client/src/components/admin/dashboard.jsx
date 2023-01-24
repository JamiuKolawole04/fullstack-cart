import { Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Nabvar } from "../nabvar";

export const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) return <p>Access Denied.</p>;
  return (
    <Fragment>
      <Nabvar />
      <StyledDashboard>
        <SideNav>
          <h3>Quick Link</h3>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active" : "link-inactive"
            }
            to="summary"
          >
            Summary
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "link-active" : "link-inactive"
            }
            to="products"
          >
            Products
          </NavLink>
        </SideNav>
        <Content>
          <Outlet />
        </Content>
      </StyledDashboard>
    </Fragment>
  );
};

const StyledDashboard = styled.section`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }
  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;
