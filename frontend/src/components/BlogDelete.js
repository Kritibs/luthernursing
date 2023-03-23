import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useParams} from 'react-router-dom';
import axios from 'axios';

const BlogDelete= () => {
	const {id}= useParams();

	// const [errors, setErrors] = useState({});
	const handleSubmit =e => {
		e.preventDefault()
		    let url = `${process.env.REACT_APP_API_URL}/blogs/delete-blog/${id}/`
		    axios.delete(url,{
		      headers: {
			'content-type': 'multipart/form-data',
			'Authorization':`JWT ${localStorage.getItem('access')}`,
			'Accept':'application/json'
		      }
		    })
		.catch(err=>{
			// setErrors({['errormsg']:err.response.data.detail})
			console.log(err);

		}
		);
		window.location.href=`${process.env.REACT_APP_API_URL}/Blogs`
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
					<Button onClick={handleSubmit} variant="contained">Delete the Blog</Button>
					</div>

					</Box>
					</Grid>
				);
}
export default BlogDelete;
