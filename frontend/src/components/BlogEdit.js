import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import Success from "./Success.js";
import axios from "axios";

const BlogEdit = () => {
  const initialFormData = Object.freeze({
    blog_title: "",
    blog_content: "",
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
      await fetch(`${process.env.REACT_APP_API_URL}/blogs/blog-detail/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          updateFormData({
            ...formData,
            ["blog_title"]: data.blog_title,
            ["blog_content"]: data.blog_content,
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
    e.preventDefault();
    if (validation()) {
      let form_data = new FormData();
      form_data.append("blog_title", formData.blog_title);
      form_data.append("blog_content", formData.blog_content);
      let url = `${process.env.REACT_APP_API_URL}/blogs/update-blog/${id}/`;
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        })
        .catch((err) => console.log(err));
    }
    nextStep();
  };
  const validation = () => {
    let activeItem = formData;
    let isValid = true;

    if (!activeItem["blog_title"]) {
      isValid = false;
      setErrors({ ["blog_title"]: "Please enter the Blog title." });
    }
    if (!activeItem["blog_content"]) {
      isValid = false;
      setErrors({ ["blog_content"]: "Please enter the Blog content" });
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
                name="blog_title"
                label="Blog title"
                onChange={handleChange}
                value={formData.blog_title}
              />
            </div>

            <div>{errors.blog_title}</div>
            <div>
              <TextField
                required
                name="blog_content"
                onChange={handleChange}
                value={formData.blog_content}
                multiline
                label="Blog Content"
              />
            </div>
            <div>{errors.blog_content}</div>
            <div>
              <Button onClick={handleSubmit} variant="contained">
                Update Blog
              </Button>
            </div>
          </Box>
        </Grid>
      );
    case 2:
      return <Success message={errors.errormsg} />;
    default:
      <></>;
  }
};
export default BlogEdit;
