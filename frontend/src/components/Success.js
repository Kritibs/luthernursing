import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser} from '@fortawesome/free-solid-svg-icons';

class Success extends React.Component{
	render(){
  return (
	  this.props.message?
	  <>
	  <h1> {this.props.message} </h1>

	 <Link to={"/" + this.props.link}>
			Go Back</Link>
	  </>
	:
	  
	  <>
	  <h1> Action is Successful</h1>

	 <Link to={"/Home"}>
			<FontAwesomeIcon icon={	faHouseUser} size="1x" style={{ color: "#1976d2"}}/></Link>
	 </> 
  );
}
}

export default Success;
