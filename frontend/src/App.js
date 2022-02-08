import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar.js';
import ProductDisplay from './components/ProductDisplay.js';
import ProductDisplayForm from './components/ProductDisplayForm.js';
import Home from './components/Home.js';
import Students from './components/Students.js';
import SignUp from './components/SignUp.js';
import LogIn from './components/LogIn.js';
import Activate from './components/Activate.js';
import ResetPassword from './components/ResetPassword.js';
import ResetPasswordConfirm from './components/ResetPasswordConfirm.js';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
	  <Provider store={store}>
		<ResponsiveAppBar />
		<Routes>
			<Route path="Home" element={<Home />}/>
			<Route path="Products" element={<ProductDisplay/>}/>
			<Route path="Students" element={<Students/>}/>
			<Route path="add-products" element={<ProductDisplayForm/>} />
			<Route path="SignUp" element={<SignUp/>} />
			<Route path="LogIn" element={<LogIn />} />
			<Route path="ResetPassword" element={<ResetPassword />} />
			<Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
			<Route path="activate/:uid/:token" element={<Activate />} />
		</Routes>
	 </Provider> 
    </div>
  );
}

export default App;
