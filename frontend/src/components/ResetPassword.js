import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";

let data = {};
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestSent: false,
      activeItem: {
        email: "",
      },
      editing: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name) => (e) => {
    data[name] = e.target.value;
    console.log(data);
    this.setState({
      activeItem: data,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.reset_password(this.state.activeItem.email);
    this.setState({
      requestSent: true,
    });
  };

  render() {
    if (this.state.requestSent) {
      window.location.href = "http://localhost:3000/Home";
    }
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
          <h1> Reset Password</h1>
          <div>
            <TextField
              required
              type="email"
              id="email"
              label="Email"
              onChange={this.handleChange("email")}
              defaultValue={this.state.activeItem.email}
            />
          </div>
          <div>
            <Button onClick={this.handleSubmit} variant="contained">
              Reset Password
            </Button>
          </div>
        </Box>
      </Grid>
    );
  }
}
export default connect(null, { reset_password })(ResetPassword);
