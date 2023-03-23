import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import { connect } from "react-redux";

function StudentTable({ isAuthenticated, is_admin }) {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/accounts/accounts-list`
      );
      res
        .json()
        .then((res) => setStudents(res))
        .then(console.log(students))
        .catch((err) => console.log(err, "error..."));
    }

    fetchData();
  }, [students]);

  const columns_one = [
    { field: "first_name", headerName: "First name", width: 130 },
    { field: "last_name", headerName: "Last name", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 180,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "year", headerName: "Year", width: 130 },
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() =>
            window.open(
              `${process.env.REACT_APP_API_URL}/delete-account/${params.row.id}`,
              "_self"
            )
          }
          label="Delete"
        />,
      ],
    },
  ];
  const columns_two = [
    { field: "first_name", headerName: "First name", width: 130 },
    { field: "last_name", headerName: "Last name", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 180,
      valueGetter: (params) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "year", headerName: "Year", width: 130 },
  ];

  if (isAuthenticated && is_admin) {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns_one}
          initialState={{ pinnedColumns: { left: ["first_name"] } }}
        />
      </div>
    );
  } else {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns_two}
          initialState={{ pinnedColumns: { left: ["first_name"] } }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  is_admin: state.auth.is_admin,
});
export default connect(mapStateToProps)(StudentTable);
