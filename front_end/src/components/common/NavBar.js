import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/system';
import logoEZ from '../../assets/images/logoEZ.png';
import '../../assets/styles/common/NavBar.css';

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

const Navbar = () => {
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
          <StyledLink to="/myword">Từ vựng của tôi</StyledLink>
        </div>
        <div className="navbar__actions" style={{ marginLeft: "auto" }}>
          <Button component={Link} to="/" color="inherit">
            Đăng nhập
          </Button>
          <Button component={Link} to="/" color="inherit">
            Đăng ký
          </Button>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
