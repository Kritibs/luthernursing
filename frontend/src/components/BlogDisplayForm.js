import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Success from "./Success.js";
import axios from "axios";

var data = {};
class BlogDisplayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      errors: {},
      accounts: [],
      blogs: [],
      errormsg: "",
      activeItem: {
        blog_title: "",
        blog_content: "",
      },
      editing: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };
  handleChange = (name) => (e) => {
    data[name] = e.target.value;
    console.log(data);
    this.setState({
      activeItem: data,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validation()) {
      let form_data = new FormData();
      form_data.append("blog_title", this.state.activeItem.blog_title);
      form_data.append("blog_content", this.state.activeItem.blog_content);

      let url = `${process.env.REACT_APP_API_URL}/blogs/add-blog`;
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        })
        .catch((err) =>
          this.setState({
            errormsg: err.response.data.detail,
          })
        );
      this.nextStep();
    }
  };
  validation = () => {
    let activeItem = this.state.activeItem;
    let errors = {};
    let isValid = true;

    if (!activeItem["blog_title"]) {
      isValid = false;
      errors["blog_title"] = "Please enter the Blog title.";
    }
    if (!activeItem["blog_content"]) {
      isValid = false;
      errors["blog_content"] = "Please enter the Blog content";
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  };

  render() {
    const { step } = this.state;
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
                  id="blog_title"
                  label="Blog title"
                  onChange={this.handleChange("blog_title")}
                  defaultValue={this.state.activeItem.blog_title}
                />
              </div>

              <div>{this.state.errors.blog_name}</div>
              <div>
                <TextField
                  required
                  id="blog_content"
                  onChange={this.handleChange("blog_content")}
                  multiline
                  defaultValue={this.state.activeItem.blog_price}
                  label="Blog Content"
                />
              </div>
              <div>{this.state.errors.blog_content}</div>
              <div>
                <Button onClick={this.handleSubmit} variant="contained">
                  Submit
                </Button>
              </div>
            </Box>
          </Grid>
        );
      case 2:
        return <Success message={this.state.errormsg} />;
      default:
        return <></>;
    }
  }
}
export default BlogDisplayForm;
