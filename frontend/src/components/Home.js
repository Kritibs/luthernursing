import React from 'react';

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

