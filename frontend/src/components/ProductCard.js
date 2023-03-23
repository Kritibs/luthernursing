import * as React from 'react';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import {connect} from 'react-redux';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen} from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';

const ProductCard = ({isAuthenticated, is_admin, product_id,product_image, product_name, product_price, pub_date, product_author}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={product_image}
        alt={product_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
	  {product_name}
        </Typography>
        <Typography variant="h6" color="text.primary">
	  ${product_price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
	  published_date: {pub_date}<br/>
	  published_by: {product_author}
        </Typography>
      </CardContent>
      <CardActions>
		{isAuthenticated && is_admin &&
			<>
 <Link to={"/edit-product/"+ product_id + '/'}>
		<FontAwesomeIcon icon={	faPen} size="1x" style={{ color: "#1976d2"}}/>
	</Link>

 <Link to={"/delete-product/"+ product_id + '/'}>
		<FontAwesomeIcon icon={	faTrash} size="1x" style={{ color: "#1976d2"}}/></Link>
			</>
		}
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => ({
			

	isAuthenticated: state.auth.isAuthenticated,
	is_admin: state.auth.is_admin,


});
export default connect(mapStateToProps) (ProductCard);

