import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard.js';
import Grid from '@mui/material/Grid';

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			products:[],
		};
	}
	render(){
	return (
		<div>
		<h1> Welcome to Luther Nursing Club </h1>
		</div>); 
}
}
export default Home;

