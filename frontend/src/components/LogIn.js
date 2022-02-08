import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Success from './Success.js';
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, checkAuthenticated, load_user} from '../actions/auth';


let data={};
class LogIn extends React.Component {
	constructor(props){
		super(props);
		this.state={
			errors: {},	
			activeItem:{
				email:'',
				password:'',
			},
			editing:false,

		};
		this.handleChange=this.handleChange.bind(this)
		this.handleSubmit=this.handleSubmit.bind(this)
	}
	componentDidMount(){
		this.props.checkAuthenticated()
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
		this.props.login(this.state.activeItem.email,this.state.activeItem.password);
		console.log(this.props.isAuthenticated)
	if (this.props.isAuthenticated){

		window.location.href='http://localhost:3000/Home'
		
	}
	}


	render(){
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
					type="password"
					id="password"
					label="Password"
					onChange={this.handleChange("password")}
					defaultValue={this.state.activeItem.password}
					/>
					<div>{this.state.errors.password}</div>
					</div>
					<div>
					<Button onClick={this.handleSubmit} variant="contained">Login</Button>
					</div>
					<div>
					<p className= 'mt-3'>
					Don't have an account? <Link to='SignUp'> Sign Up</Link>
					</p>
					<p className= 'mt-3'>
					Forgot your password?<Link to='ResetPassword'> Reset Password</Link>
					</p>
					</div>
					</Box>
					</Grid>
				);
		}
}
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {login,checkAuthenticated,load_user}) (LogIn);

