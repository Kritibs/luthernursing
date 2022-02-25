import React , {useState, useEffect} from 'react';
import StudentTable from './StudentTable.js';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

const Students = ({isAuthenticated, is_admin}) => {
	const [students, setStudents] = useState([]);
	useEffect(() => {
		    async function fetchData() {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/accounts/accounts-list`)
		      res
			.json()
		.then(res => setStudents(res))
	        .then(console.log(students))
		.catch(err => console.log(err, 'error...'))
		    }

	    fetchData();
  },[]);
	return (
		<div>
		<StudentTable/>
		{isAuthenticated && is_admin &&
		      <Link to={"/SignUp"}>
		<FontAwesomeIcon icon={	faPlusCircle} size="4x" style={{ color: "#1976d2", position: "absolute", bottom: "0", right: "0", paddingRight :"10px", marginRight:"10px", marginBottom: "10px", paddingBottom :"10px"}}/></Link>

	}
		</div>); 
}
// }
const mapStateToProps = state => ({
			

	isAuthenticated: state.auth.isAuthenticated,
	is_admin: state.auth.is_admin,


});
export default connect(mapStateToProps) (Students);


