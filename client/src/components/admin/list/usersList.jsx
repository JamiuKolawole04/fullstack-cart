import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { usersFetch, userDelete } from "../../../redux/features/userSlice";

export const UsersList = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(userDelete(id));
  };

  React.useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);

  const rows =
    user &&
    user.map((user, _) => {
      return {
        id: user._id,
        uName: user.name,
        eEmail: user.email,
        isAdmin: user.isAdmin,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "uName",
      headerName: "Name",
      width: 150,
      // params targeting the row column
    },
    { field: "eEmail", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
          </div>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>

            <View onClick={() => navigate(`/user/${params.row.id}`)}>View</View>
          </Actions>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: none;
    padding: 4px 6px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const View = styled.button`
  background-color: rgb(114, 225, 40);
`;

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgba(253, 181, 40, 0.12);
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 14px;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 14px;
`;
