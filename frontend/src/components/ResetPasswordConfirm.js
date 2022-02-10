import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Success from './Success.js';
import axios from 'axios';
import {connect} from 'react-redux';
import {reset_password_confirm} from '../actions/auth';
import { Link, useParams } from 'react-router-dom';
export const Uid= () =>{
  const { uid} = useParams();
	return uid
		
}
export const Token= () =>{
  const { token} = useParams();
	return {token}
		
}
let data={};
class ResetPasswordConfirm extends React.Component {
	constructor(props){
		super(props);
		this.state={
			requestSent:false,
			uid :'',
			token :'', 
			activeItem:{
				new_password:'',
				re_new_password:'',
			},
			editing:false,

		};
		this.handleChange=this.handleChange.bind(this)
		this.handleSubmit=this.handleSubmit.bind(this)
	}
	componentDidMount(){
		this.setState({
			uid:Uid,
			token:Token,
		})
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
		console.log(this.state.uid)
		console.log(this.state.token)
		this.props.reset_password_confirm(this.state.uid, this.state.token, this.state.activeItem.new_password, this.state.activeItem.re_new_password);
		this.setState({
		    requestSent: true
		  })
	}


	render(){
	// if (this.state.requestSent){

	// 	window.location.href='http://localhost:3000/Home'
		
	// }
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
					type="password"
					id="new_password"
					label="New Password"
					onChange={this.handleChange("new_password")}
					defaultValue={this.state.activeItem.new_password}
					/>
					</div>
					<div>
					<TextField
					required
					type="password"
					id="re_new_password"
					label="Confirm New Password"
					onChange={this.handleChange("re_new_password")}
					defaultValue={this.state.activeItem.re_new_password}
					/>
					</div>
					<div>
					<Button onClick={this.handleSubmit} variant="contained">Reset Password</Button>
					</div>
					</Box>
					</Grid>
				);
		}
}
export default connect(null, {reset_password_confirm}) (ResetPasswordConfirm);

