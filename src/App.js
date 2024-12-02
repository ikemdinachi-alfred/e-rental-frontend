
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './component/home/HomePage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import { AdminRoute, ProtectedRoute } from './service/guard';
import AdminPage from './component/admin/AdminPage';
import AddItemPage from './component/admin/addItemPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';
import ItemDetailsPage from './component/bookings_items/ItemDetailsPage';
import AllItemsPage from './component/bookings_items/AllItemsPage';
import FindBookingPage from './component/bookings_items/FindBookingPage';
import ManageItemPage from './component/admin/ManageItemPage';
import EditItemPage from './component/admin/EditItemPage';
import EditBookingPage from './component/admin/EditBookingPage';
import ManageBookingsPage from './component/admin/ManageBookingsPage';

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
    <Route path="/items" element={<AllItemsPage/>} />
    <Route path="/find-booking" element={<FindBookingPage />} />


   {/* Protected Routes*/}
   <Route path="/item-details-book/:itemId"
   element={<ProtectedRoute element={<ItemDetailsPage />} />}
   />

   <Route path='/profile'
   element={<ProtectedRoute Route element={<ProfilePage/>} />}
   />
    <Route path='/edit-profile'
   element={<ProtectedRoute element={<EditProfilePage/>} />}
   />
   
    {/* Admin Routes */}
    <Route path='/admin' element={<AdminRoute element={<AdminPage/>}/>} />
    <Route path="/admin/add-items"
      element={<AdminRoute element={<AddItemPage />} />}
    />
     <Route path="/admin/manage-items"
        element={<AdminRoute element={<ManageItemPage />} />}
    />
    <Route path="/admin/edit-item/:itemId"
        element={<AdminRoute element={<EditItemPage />} />}
    />
    <Route path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            />
            <Route path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
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
