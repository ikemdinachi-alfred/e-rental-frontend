import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowLogoutModal(true); // Show the logout confirmation modal
    };

    const confirmLogout = () => {
        ApiService.logout();
        navigate('/home');
        setShowLogoutModal(false); // Close the modal
        setMenuOpen(false); // Close the menu
    };

    const cancelLogout = () => {
        setShowLogoutModal(false); // Close the modal
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuItemClick = () => {
        setMenuOpen(false); // Close the menu when a link is clicked
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home" onClick={handleMenuItemClick}>Synergy x-Rentals</NavLink>
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
                    <NavLink to="/home" activeclassname="active" onClick={handleMenuItemClick}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/items" activeclassname="active" onClick={handleMenuItemClick}>
                        Items
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/find-booking" activeclassname="active" onClick={handleMenuItemClick}>
                        Bookings
                    </NavLink>
                </li>
                {isUser && (
                    <li>
                        <NavLink to="/profile" activeclassname="active" onClick={handleMenuItemClick}>
                            Profile
                        </NavLink>
                    </li>
                )}
                {isAdmin && (
                    <li>
                        <NavLink to="/admin" activeclassname="active" onClick={handleMenuItemClick}>
                            Admin
                        </NavLink>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <NavLink to="/login" activeclassname="active" onClick={handleMenuItemClick}>
                            Login
                        </NavLink>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <NavLink to="/register" activeclassname="active" onClick={handleMenuItemClick}>
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

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to log out?</p>
                        <div className="modal-buttons">
                            <button onClick={confirmLogout} className="confirm-button">
                                Yes
                            </button>
                            <button onClick={cancelLogout} className="cancel-button">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
