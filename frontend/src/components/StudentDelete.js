import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentDelete = () => {
  const { id } = useParams();
//   const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_API_URL}/accounts/delete-account/${id}/`;
    axios
      .delete(url, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      })
      .catch((err) => console.log(err));
    //   .catch((err) => setErrors({ ["errormsg"]: err.response.data.detail }));
    window.location.href = `${process.env.REACT_APP_API_URL}/Students`;
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Button onClick={handleSubmit} variant="contained">
            Delete the User
          </Button>
        </div>
      </Box>
    </Grid>
  );
};
export default StudentDelete;
