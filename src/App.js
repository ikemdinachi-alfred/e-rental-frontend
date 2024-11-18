
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './component/home/HomePage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import Navbar from './component/common/Navbar';

function App() {
  return (
   <BrowserRouter>
   <div className='App'>
    <Navbar></Navbar>
   <Routes>
    {/*Public Routes */}
    <Route exact path='/home' element={<HomePage></HomePage>} />
    <Route exact path='/login' element={<LoginPage></LoginPage>} />
    <Route exact path='/register' element={<RegisterPage></RegisterPage>} />

  
          
   </Routes>
   </div>
   </BrowserRouter>
  );
}

export default App;
