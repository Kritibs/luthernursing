import React, {useState, useEffect} from 'react';

class Students extends React.Component {
	constructor(props){
		super(props);
		this.state={
			students:[],
		};
	}
	render(){
	return (
		<div>
		<h1> Students List</h1>
		</div>); 
}
}
export default Students;

