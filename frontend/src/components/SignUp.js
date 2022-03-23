import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Success from './Success.js';
import axios from 'axios';
import {connect} from 'react-redux';
import {signup} from '../actions/auth';
import {Link} from 'react-router-dom';

var data={};
const year_options = [
	"FR",
	"SO",
	"JR",
	"SR",
	"GR",
];
class SignUp extends React.Component {
	constructor(props){
		super(props);
		this.state={
			step:1,
			accountCreated:false,
			errors: {},	
			activeItem:{
				email:'',
				first_name:'',
				last_name:'',
				year:'',
				password:'',
				re_password:'',
			},
			editing:false,

		};
		this.handleChange=this.handleChange.bind(this)
		this.handleSubmit=this.handleSubmit.bind(this)
	}

	nextStep=()=>{
		const{step}=this.state;
		this.setState({
			step:step+1
		});
	}
	handleChange= name => e => {
		data[name]=e.target.value
		console.log(data)
		this.setState({
			activeItem:data
		});
	}
	handleSubmit = e => {
		e.preventDefault()
		console.log("item", this.state.activeItem)
		if (this.validation()){
			this.props.signup(this.state.activeItem.first_name,this.state.activeItem.last_name,this.state.activeItem.email,this.state.activeItem.year,this.state.activeItem.password,this.state.activeItem.re_password);

		      this.setState({
			accountCreated: true
		      });
				this.nextStep();
		}
	}
	  validation=()=>{
	      let activeItem= this.state.activeItem;
		console.log(activeItem)
	      let errors = {};
	      let isValid = true;
	  
	  
	      if (!activeItem["email"]) {
		isValid = false;
		errors["email"] = "Please enter your email Address.";
	      }
		 if (typeof activeItem["email"] !== "undefined") {
			  
			var pattern =  new RegExp(/(\W|^)[\w.+\-]*@luther\.edu(\W|$)/g);
			if (!pattern.test(activeItem["email"])) {
			  isValid = false;
			  errors["email"] = "Please enter valid email address.";
			}
		      }
	      if (!activeItem["first_name"]) {
		isValid = false;
		errors["first_name"] = "Please enter your First Name.";
	      }
	      if (!activeItem["last_name"]) {
		isValid = false;
		errors["last_name"] = "Please enter your Last Name.";
	      }
	      if (!activeItem["year"]) {
		isValid = false;
		errors["year"] = "Please enter your Academic year.";
	      }
	      if (!activeItem["password"]) {
		isValid = false;
		errors["password"] = "Please enter your Password.";
	      }
	  
	      if (typeof activeItem["password"] !== "undefined" && typeof activeItem["password1"] !== "undefined") {
		  
		if (activeItem["password"] !== activeItem["password1"]) {
		  isValid = false;
		  errors["password1"] = "Passwords don't match.";
		}
	      } 
	  
	      this.setState({
		errors: errors
	      });
	  
	      return isValid;
	  }

	render(){
		const {step}=this.state;
		switch (step) {
			case 1:
				return (
					<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: '100vh' }}
					>
					<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete="off"
					>
					<div>
					<TextField
					required
					type="email"
					id="email"
					label="Email"
					onChange={this.handleChange("email")}
					defaultValue={this.state.activeItem.email}
					/>
					<div>{this.state.errors.email}</div>
					</div>
					<div>
					<TextField
					required
					id="first_name"
					label="First Name"
					onChange={this.handleChange("first_name")}
					defaultValue={this.state.activeItem.first_name}
					/>
					<div>{this.state.errors.first_name}</div>
					</div>
					<div>
					<TextField
					required
					id="last_name"
					label="Last Name"
					onChange={this.handleChange("last_name")}
					defaultValue={this.state.activeItem.last_name}
					/>
					<div>{this.state.errors.last_name}</div>
					</div>
					<div>
					<TextField
					required
					select
					id="year"
					label="Year"
					defaultValue={this.year_options||''}
					onChange={this.handleChange("year")}
					>
					{year_options.map((option) => (
						<MenuItem key={option} value={option}>
						{option}
						</MenuItem>
					))}
					</TextField>
					<div>{this.state.errors.year}</div>
					</div>
					<div>
					<TextField
					required
					type="password"
					id="password"
					label="Password"
					onChange={this.handleChange("password")}
					defaultValue={this.state.activeItem.password}
					/>
					<div>{this.state.errors.password}</div>
					</div>
					<div>
					<TextField
					required
					type="password"
					id="re_password"
					label="Confirm Password"
					onChange={this.handleChange("re_password")}
					defaultValue={this.state.activeItem.password1}
					/>
					<div>{this.state.errors.password1}</div>
					</div>
					<div>
					<Button onClick={this.handleSubmit} variant="contained">Submit</Button>
					</div>
					<div>
					<p className= 'mt-3'>
					Already have an account? <Link to='/LogIn'> Sign Up</Link>
					</p>
					</div>
					</Box>
					</Grid>
				);
			case 2:
				return (<Success message={this.props.errormsg} link={"SignUp"}/>);
	}
	}
}
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	errormsg: state.auth.errormsg,
});
export default connect(mapStateToProps, {signup}) (SignUp);


