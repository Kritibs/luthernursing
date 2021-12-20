import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar.js';
import ProductDisplay from './components/ProductDisplay.js';
import ProductDisplayForm from './components/ProductDisplayForm.js';
import Home from './components/Home.js';
import Students from './components/Students.js';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
	<ResponsiveAppBar />
	<Routes>
		<Route path="Home" element={<Home />}/>
		<Route path="Products" element={<ProductDisplay/>}/>
		<Route path="Students" element={<Students/>}/>
		<Route path="add-products" element={<ProductDisplayForm/>} />
	</Routes>
	  
    </div>
  );
}

export default App;
