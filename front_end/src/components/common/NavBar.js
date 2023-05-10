import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/common/NavBar.css';
import logoEZ from '../../assets/images/logoEZ.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <div className="navbar__logo">
                    <img src={logoEZ} alt="logo" />
                </div>
                <Link to="/">Tra cứu</Link>
                <Link to="/lesson">Từ vựng của tôi</Link>
            </div>
            <div className="navbar__actions">
                <Link> Đăng nhập</Link>        
                <Link>Đăng ký</Link>
            </div>
        </div>
    );
}

export default Navbar;
