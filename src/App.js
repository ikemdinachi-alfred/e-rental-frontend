
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './component/home/HomePage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import { AdminRoute } from './service/guard';
import AdminPage from './component/admin/AdminPage';
import AddItemPage from './component/admin/addItemPage';

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

    {/* Admin Routes */}
    <Route path='/admin' element={<AdminRoute element={<AdminPage/>}/>} />
    <Route path="/admin/add-item"
              element={<AdminRoute element={<AddItemPage />} />}
            />
  
    {/* Fallback Route */}
    <Route path="*" element={<Navigate to="/login" />} />       
   </Routes>
   </div>
   
   </div>
   </BrowserRouter>
  );
}

export default App;
