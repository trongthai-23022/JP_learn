import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/system';
import logoEZ from '../../assets/images/logoEZ.png';
import '../../assets/styles/common/NavBar.css';
import { useSelector } from 'react-redux';
import { restoreAuthState } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const StyledAppBar = styled(AppBar)`
  background-color: #6667AB;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 18px;
  margin-right: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = (user) => {

  console.log(user);
  const logout = () => {
    localStorage.removeItem('jwtToken');
    //reload lại trang
    window.location.reload();


  };

  return (
    <StyledAppBar position="relative">
      <Toolbar className="navbar">
        <div className="navbar__logo">
          <Link to="/">
            <img src={logoEZ} alt="logo" style={{ width: "60px", padding: "5px" }} />
          </Link>
        </div>
        <div className="navbar__links">
          <StyledLink to="/">Tra cứu</StyledLink>
          <StyledLink to="/myword/0">Từ vựng của tôi</StyledLink>
        </div>

        <div className="navbar__actions" style={{ marginLeft: "auto" }}>
          {user.user!==null ? (
            <>
              <span style={{ marginRight: "10px" }}>{user?.name}</span>
              <Button  color="inherit" onClick={logout}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/signin" color="inherit">
                Đăng nhập
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                Đăng ký
              </Button>
            </>
          )}

        </div>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
