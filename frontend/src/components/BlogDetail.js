import * as React from 'react';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import { faPen} from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import BlogCard from './BlogCard.js';

const BlogDetail = ({isAuthenticated, is_admin}) => {
	const { blog_id,blog_title, blog_content, pub_date}=useLocation().state;
  return (
	  <div>
			<div className="container-fluid">
			  <div className="row content">

			    <div>
				      <h2>{blog_title}</h2>
				      <h5><span className="glyphicon glyphicon-time"></span> Post by Admin, {pub_date}.</h5>
				      <p>{blog_content}</p>


	  </div>
				      <br/><br/>
	  <hr/>
	  </div>
	  </div>
		{isAuthenticated && is_admin &&
			<>
 <Link to={"/edit-blog/"+ blog_id + '/'}>
		<FontAwesomeIcon icon={	faPen} size="2x" style={{ color: "#1976d2"}}/>
	</Link>

 <Link to={"/delete-blog/"+ blog_id + '/'}>
		<FontAwesomeIcon icon={	faTrash} size="2x" style={{ color: "#1976d2"}}/></Link>
			</>
		}
	  </div>
  );
}

const mapStateToProps = state => ({
			

	isAuthenticated: state.auth.isAuthenticated,
	is_admin: state.auth.is_admin,


});
export default connect(mapStateToProps) (BlogDetail);

