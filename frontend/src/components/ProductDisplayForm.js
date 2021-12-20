import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function ProductDisplayForm(){
	const [accounts, setAccounts] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		fetch('http://127.0.0.1:8000/accounts/accounts-list')
		.then(res => res.json())
		.then(data => {
				setAccounts(data);
		},
		(error) => {
			setError(error);
		}
		)		
	},[])
	return (
<Grid
  container
  spacing={15}
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
		  id="product_image"
		  label="Product Image"
		  InputLabelProps={{
		    shrink: true,
		  }}
		/>
		</div>
		<div>
		<TextField
		  required
		  id="product_name"
		  label="Product Name"
		/>
		</div>
		<div>
		<TextField
		  required
		  id="product_price"
		  type="number"
		  label="Product Price"
		/>
		</div>
		<div>
		<TextField
		  required
		  id="pub_date"
		  type="date"
		  label="Published Date"
		  InputLabelProps={{
		    shrink: true,
		  }}
		/>
		</div>
		<div>
		<TextField
	          select
		  id="product_author"
		  label="Product Author"
		  value={accounts}
		>
		 {accounts.map((option) => (
			    <MenuItem key={option.email} value={option.id}>
			      {option.email}
			    </MenuItem>
			  ))}
		</TextField>
		</div>
		<div>
		<Button variant="contained">Submit</Button>
		</div>
	    </Box>
		</Grid>
	  );
}
export default ProductDisplayForm;

