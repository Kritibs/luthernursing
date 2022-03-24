import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar.js';
import ProductDisplay from './components/ProductDisplay.js';
import ProductEdit from './components/ProductEdit.js';
import ProductDelete from './components/ProductDelete.js';
import StudentEdit from './components/StudentEdit.js';
import StudentDelete from './components/StudentDelete.js';
import ProductDisplayForm from './components/ProductDisplayForm.js';
import BlogDisplay from './components/BlogDisplay.js';
import BlogDetail from './components/BlogDetail.js';
import BlogEdit from './components/BlogEdit.js';
import BlogDelete from './components/BlogDelete.js';
import BlogDisplayForm from './components/BlogDisplayForm.js';
import Home from './components/Home.js';
import Students from './components/Students.js';
import SignUp from './components/SignUp.js';
import LogIn from './components/LogIn.js';
import Activate from './components/Activate.js';
import ResetPassword from './components/ResetPassword.js';
import ResetPasswordConfirm from './components/ResetPasswordConfirm.js';
import { Routes, Route, BrowserRouter,Navigate, useParams} from "react-router-dom";
import props from 'prop-types';
import {Provider, connect} from 'react-redux';
import store from './store';
import Layout from './rupdate/Layout.js';
import RequireAuth from './privateroutes/RequireAuth.js';

function App() {
  return (
    <div className="App">
	  <Provider store={store}>
		<Layout />
		<Routes>
			<Route exact path="/" element={<BlogDisplay/>}/>
			<Route path="Home" element={<BlogDisplay/>}/>
			<Route path="Products" element={<ProductDisplay/>}/>
			<Route path="blog-detail/:id" element={<BlogDetail/>}/>
			<Route path="Blogs" element={<BlogDisplay/>}/>
			<Route path="Students" element={<Students/>}/>
			<Route path="add-products" element={
			  <RequireAuth redirectTo="/LogIn">
			    <ProductDisplayForm />
			  </RequireAuth>
			}
			/>
			<Route path="edit-product/:id" element={
			  <RequireAuth redirectTo="/LogIn">
			    <ProductEdit/>
			  </RequireAuth>
			}
			/>
			<Route path="delete-product/:id" element={
			  <RequireAuth redirectTo="/LogIn">
			    <ProductDelete/>
			  </RequireAuth>
			}
			/>
			<Route path="add-blogs" element={
			  <RequireAuth redirectTo="/LogIn">
			    <BlogDisplayForm />
			  </RequireAuth>
			}
			/>
			<Route path="edit-blog/:id" element={
			  <RequireAuth redirectTo="/LogIn">
			    <BlogEdit/>
			  </RequireAuth>
			}
			/>
			<Route path="delete-blog/:id" element={
			  <RequireAuth redirectTo="/LogIn">
			    <BlogDelete/>
			  </RequireAuth>
			}
			/>
			<Route path="delete-account/:id" element={
			  <RequireAuth redirectTo="/LogIn">
			    <StudentDelete/>
			  </RequireAuth>
			}
			/>
			<Route path="SignUp" element={<SignUp/>} />
			<Route path="LogIn" element={<LogIn />} />
			<Route path="ResetPassword" element={<ResetPassword />} />
			<Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
			<Route path="activate/:uid/:token" element={<Activate />} />
		</Routes>
	 </Provider> 
    </div>
  );
}


export default App; 
