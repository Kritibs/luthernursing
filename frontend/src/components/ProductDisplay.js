import React  from 'react';
import ProductCard from './ProductCard.js';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class ProductDisplay extends React.Component {
	constructor(props){
		super(props);
		this.state={
			products:[],
		};
	}
	componentDidMount(){
		fetch('http://127.0.0.1:8000/products/products-list')
		.then(res => res.json())
		.then(data => {
			this.setState({
				products:data,
			});
		})
			
		.catch(err => console.log(err, 'error...'))
	}
	render(){
		const{products}=this.state;
	return (
		<div>
		<Grid container spacing={10}
		style={{padding: '24px'}}
		>
		{products.map( products =>
			<Grid key={products.id} item
			xs={12} sm={6} md={4} lg={4} xl={3}
			>
			<ProductCard
			key={products.id} product_image={products.product_image} product_name={products.product_name}
			product_price={products.product_price}
			pub_date={products.pub_date}
			product_author={products.product_author}
			/>
			</Grid> )}
		</Grid>
		      <Link to={"/add-products"}>
		<FontAwesomeIcon icon={	faPlusCircle} size="4x" style={{ color: "#1976d2", position: "absolute", bottom: "0", right: "0", paddingRight :"10px", marginRight:"10px", marginBottom: "10px", paddingBottom :"10px"}}/></Link>
		</div>); 
}
}
export default ProductDisplay;

