
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './component/home/HomePage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';

function App() {
  return (
   <BrowserRouter>
   <div className='App'>
    <Navbar></Navbar>
    <div className="content">
    <FooterComponent></FooterComponent> 
   <Routes>
    {/*Public Routes */}
    <Route exact path='/home' element={<HomePage></HomePage>} />
    <Route exact path='/login' element={<LoginPage></LoginPage>} />
    <Route exact path='/register' element={<RegisterPage></RegisterPage>} />


  
    {/* Fallback Route */}
    <Route path="*" element={<Navigate to="/login" />} />       
   </Routes>
   </div>
   
   </div>
   </BrowserRouter>
  );
}

export default App;
