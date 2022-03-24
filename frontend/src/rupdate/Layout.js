import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {checkAuthenticated, load_user} from '../actions/auth';
import ResponsiveAppBar from '../components/ResponsiveAppBar.js';
import Footer from '../components/Footer.js';

const Layout = (props) => {
	useEffect(() => {
		props.checkAuthenticated();
		props.load_user();
	}, []);
	return (
		<div> 
		<ResponsiveAppBar />
		{props.children}
		<Footer />
		</div>
	);
};
export default connect(null, {checkAuthenticated, load_user}) (Layout);
