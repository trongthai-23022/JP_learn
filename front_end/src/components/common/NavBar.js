import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/common/NavBar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__logo">
                <img alt="logo" />
            </div>
            <div className="navbar__links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
            </div>
        </div>
    );
}

export default Navbar;