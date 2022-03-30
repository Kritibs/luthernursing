import React , {useState, useEffect} from 'react';
import BlogCard from './BlogCard.js';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

const BlogDisplay = ({isAuthenticated, is_admin}) => {
	const [blogs, setBlogs] = useState([]);
	useEffect(() => {
		    async function fetchData() {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/blogs/blogs-list/`)
		      res
			.json()
		.then(res => setBlogs(res))
		.catch(err => console.log(err, 'error...'))
		    }

	    fetchData();
  },[]);
	return (
		<>
		<div>
		{isAuthenticated && is_admin &&
				<>
			<h3>Add Blogs</h3>
		      <Link to={"/add-blogs"}>
		<FontAwesomeIcon icon={	faPlusCircle} size="4x" style={{ color: "#1976d2"}}/></Link>
				<br/> <br/>
	  <hr/>
</>
	}
		</div>
		<div>

		{blogs.map( blogs =>
			<BlogCard
			key={blogs.id} blog_id= {blogs.id} blog_title={blogs.blog_title} blog_content={blogs.blog_content}
		pub_date={blogs.pub_date}
			/>
			 )}

		</div>
		</>
	); 
}
// }
const mapStateToProps = state => ({
			

	isAuthenticated: state.auth.isAuthenticated,
	is_admin: state.auth.is_admin,


});
export default connect(mapStateToProps) (BlogDisplay);

