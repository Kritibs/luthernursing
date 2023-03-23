import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Success from "./Success.js";
import axios from "axios";
import { useParams } from "react-router-dom";

const year_options = ["FR", "SO", "JR", "SR", "GR"];
const StudentEdit = () => {
  const initialFormData = Object.freeze({
    email: "",
    first_name: "",
    last_name: "",
    year: "",
  });
  const { id } = useParams();
  const [formData, updateFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const nextStep = () => {
    console.log(step);
    setStep((step) => step + 1);
  };

  useEffect(() => {
    async function fetchData() {
      await fetch(
        `${process.env.REACT_APP_API_URL}/accounts/account-detail/${id}/`
      )
        .then((res) => res.json())
        .then((data) => {
          updateFormData({
            ...formData,
            ["email"]: data.email,
            ["first_name"]: data.first_name,
            ["last_name"]: data.last_name,
            ["year"]: data.year,
          });
          console.log(formData);
        })
        .catch((err) => console.log(err, "error..."));
    }
    fetchData();
  }, [updateFormData]);

  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    if (validation()) {
      let form_data = new FormData();
      form_data.append("email", formData.email);
      form_data.append("first_name", formData.first_name);
      form_data.append("last_name", formData.last_name);
      form_data.append("year", formData.year);
      let url = `${process.env.REACT_APP_API_URL}/accounts/update-account/${id}/`;
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        })
        .catch((err) => setErrors({ ["errormsg"]: err.response.data.detail }));
    }
    nextStep();
  };
  const validation = () => {
    let activeItem = formData;
    let isValid = true;
    if (!activeItem["first_name"]) {
      isValid = false;
      setErrors({ ["first_name"]: "Please enter the First Name." });
    }
    if (!activeItem["last_name"]) {
      isValid = false;
      setErrors({ ["last_name"]: "Please enter the Blog content" });
    }
    if (!activeItem["email"]) {
      isValid = false;
      setErrors({ ["email"]: "Please enter the Email" });
    }
    if (!activeItem["year"]) {
      isValid = false;
      setErrors({ ["year"]: "Please enter the Year" });
    }

    return isValid;
  };
  switch (step) {
    case 1:
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
              <TextField
                required
                type="email"
                name="email"
                label="Email"
                onChange={handleChange}
                value={formData.email}
              />
              <div>{errors.email}</div>
            </div>
            <div>
              <TextField
                required
                name="first_name"
                label="First Name"
                onChange={handleChange}
                value={formData.first_name}
              />
              <div>{errors.first_name}</div>
            </div>
            <div>
              <TextField
                required
                name="last_name"
                label="Last Name"
                onChange={handleChange}
                value={formData.last_name}
              />
              <div>{errors.last_name}</div>
            </div>
            <div>
              <TextField
                required
                select
                name="year"
                label="Year"
                onChange={handleChange}
                value={formData.year}
              >
                {year_options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <div>{errors.year}</div>
            </div>
            <div>
              <Button onClick={handleSubmit} variant="contained">
                Update User
              </Button>
            </div>
          </Box>
        </Grid>
      );
    case 2:
      return <Success message={errors.errormsg} />;
  }
};
export default StudentEdit;
