import React , {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Redirect, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {verify} from '../actions/auth';

const Activate= ({verify}) => {
	const [verified, setVerified] = useState(false);
	const {uid, token}= useParams();
	const verify_account =e => {
		verify(uid, token)
		setVerified(true);
	}
	if (verified){

		window.location.href=`${process.env.REACT_APP_API_URL}/Home`
		
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
					<h1> Verify your Account </h1>
					<Button onClick={verify_account} variant="contained">Verify Account</Button>
					</Box>
					</Grid>
				);
		}
export default connect(null, {verify})(Activate);
