import React , {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Redirect, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset_password_confirm } from '../actions/auth';
import Success from './Success.js';
import axios from 'axios';

const ProductDelete= () => {
	const {id}= useParams();

	const [errors, setErrors] = useState({});
	const handleSubmit =e => {
		e.preventDefault()
		    let url = `${process.env.REACT_APP_API_URL}/products/delete-product/${id}/`
		    axios.delete(url,{
		      headers: {
			'content-type': 'multipart/form-data',
			'Authorization':`JWT ${localStorage.getItem('access')}`,
			'Accept':'application/json'
		      }
		    })
		.catch(err=>
			setErrors({['errormsg']:err.response.data.detail})
		);
		window.location.href=`${process.env.REACT_APP_API_URL}/Products`
	}
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
					<Button onClick={handleSubmit} variant="contained">Delete the Product</Button>
					</div>

					</Box>
					</Grid>
				);
}
export default ProductDelete;
