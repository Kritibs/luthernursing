import React , {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset_password_confirm } from '../actions/auth';
import Success from './Success.js';
import axios from 'axios';

const ProductEdit= () => {
	const initialFormData = Object.freeze({
		        product_image:'',
			product_name:'',
			product_price:'',
			pub_date:'',
			product_author:'',
	})
	const {id}= useParams();
	const [formData, updateFormData] = useState(initialFormData);
	const [accounts, setAccounts] = useState([]);
	const [errors, setErrors] = useState({});
	const [step, setStep] = useState(1);

	const nextStep=()=>{
		console.log(step)
		setStep(step=>step+1);
	}

	useEffect(() => {
		    async function fetchData() {
			await fetch(`${process.env.REACT_APP_API_URL}/products/product-detail/${id}/`)
			   .then( res => res.json())
			    .then(data => { 
				    updateFormData({
					    ...formData,
					    ['product_image']:data.product_image,
					    ['product_name']:data.product_name,
					    ['product_price']:data.product_price,
					    ['pub_date']:data.pub_date,
					    ['product_author']:data.product_author,

				    })
				   console.log(formData)
			   })
		.catch(err => console.log(err, 'error...'))
		    }
	    fetchData();
  },[updateFormData]);

	useEffect(() => {
		    async function fetchAccount() {
			await fetch(`${process.env.REACT_APP_API_URL}/accounts/accounts-list`)
			   .then(res => res.json())
			    .then (data => {
				    setAccounts(data)
			   })
		.catch(err => console.log(err, 'error...'))
		    }
	    fetchAccount();
  },[]);
	const handleImageChange = e => updateFormData({...formData, [e.target.name]:e.target.files[0]})

	const handleChange = e =>{
		
		updateFormData({...formData, [e.target.name]: e.target.value});
		console.log(formData)
	}

	const handleSubmit =e => {
		console.log(formData)
		e.preventDefault()
		if (validation()){
		let form_data = new FormData();
		    form_data.append('product_image', formData.product_image, formData.product_image.name);
		    form_data.append('product_name', formData.product_name)
		    form_data.append('product_price', formData.product_price)
		    form_data.append('pub_date', formData.pub_date)
		    form_data.append('product_author', formData.product_author)
		    let url = `${process.env.REACT_APP_API_URL}/products/update-product/${id}/`
		    axios.post(url, form_data, {
		      headers: {
			'content-type': 'multipart/form-data',
			'Authorization':`JWT ${localStorage.getItem('access')}`,
			'Accept':'application/json'
		      }
		    })
		.catch(err=>
			setErrors({['errormsg']:err.response.data.detail})
		);
		}
		nextStep();
	}
	  const validation=()=>{
	      let activeItem= formData;
	      let isValid = true;
	  
	  
	      if (!activeItem["product_image"]) {
		isValid = false;
		setErrors({["product_image"] : "Please upload an image."});
	      }
	      if (!activeItem["product_name"]) {
		isValid = false;
		setErrors({["product_name"] : "Please enter the Product Name."})
	      }
	      if (!activeItem["product_price"]) {
		isValid = false;
		setErrors({["product_price"] : "Please enter the Product Price"});
	      }
	      if (!activeItem["pub_date"]) {
		isValid = false;
		setErrors({["pub_date"] : "Please enter the publish date."})
	      }
	      if (!activeItem["product_author"]) {
		isValid = false;
		setErrors({["product_author"] : "Please enter the Product Author."})
	      }
	  
	  
	  
	      return isValid;
	  }

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
					type="file"
					name="product_image"
					label="Product Image"
					onChange={handleImageChange}
					InputLabelProps={{
						shrink: true,
					}}
					/>
					</div>
					<div>{errors.product_image}</div>
					<div>
					<TextField
					required
					name="product_name"
					label="Product Name"
					onChange={handleChange}
					value={formData.product_name}
					/>
					</div>

					<div>{errors.product_name}</div>
					<div>
					<TextField
					required
					name="product_price"
					type="number"
					onChange={handleChange}
					value={formData.product_price}
					label="Product Price"
					/>
					</div>
					<div>{errors.product_price}</div>
					<div>
					<TextField
					required
					name="pub_date"
					type="date"
					value={formData.pub_date}
					onChange={handleChange}
					label="Published Date"
					InputLabelProps={{
						shrink: true,
					}}
					/>
					</div>
					<div>{errors.pub_date}</div>
					<div>
					<TextField
					required
					select
					name="product_author"
					label="Product Author"
					defaultValue=''
					onChange={handleChange}
					>
					{accounts.map((option) => (
						<MenuItem key={option.email} value={option.id}>
						{option.email}
						</MenuItem>
					))}
					</TextField>
					</div>
					<div>{errors.product_author}</div>
					<div>
					<Button onClick={handleSubmit} variant="contained">Update Product</Button>
					</div>
					</Box>
					</Grid>
				);
			case 2:
				return (<Success message={errors.errormsg} />);
		}
}
export default ProductEdit;
		

