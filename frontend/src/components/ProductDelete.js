import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const ProductDelete= () => {
	const {id}= useParams();

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
			console.log(err)
			// setErrors({['errormsg']:err.response.data.detail})
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
