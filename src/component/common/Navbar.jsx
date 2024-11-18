import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
//import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">E-Rentals</NavLink>
            </div>
            <button
                className="navbar-toggle"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
            >
                ☰
            </button>
            <ul className={`navbar-ul ${menuOpen ? 'dropdown' : ''}`}>
                <li>
                    <NavLink to="/home" activeclassname="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/items" activeclassname="active">
                        Items
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/find-booking" activeclassname="active">
                        Bookings
                    </NavLink>
                </li>
                {isUser && (
                    <li>
                        <NavLink to="/profile" activeclassname="active">
                            Profile
                        </NavLink>
                    </li>
                )}
                {isAdmin && (
                    <li>
                        <NavLink to="/admin" activeclassname="active">
                            Admin
                        </NavLink>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <NavLink to="/login" activeclassname="active">
                            Login
                        </NavLink>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <NavLink to="/register" activeclassname="active">
                            Register
                        </NavLink>
                    </li>
                )}
                {isAuthenticated && (
                    <li onClick={handleLogout} className="logout">
                        Logout
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
