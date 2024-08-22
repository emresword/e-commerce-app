import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightModeIcon from '@mui/icons-material/LightMode';
import logo from '../images/image.png';
import '../css/header.css';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';



function Header() {
  const [theme, setTheme] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const changeTheme = () => {
    setTheme(!theme);
    const backgroundColor = !theme ? 'black' : 'white';
    document.body.style.backgroundColor = backgroundColor;
  }

  const { products } = useSelector((store) => store.basket)

  return (
    <div className="header">
      <div className="left-section">
        <img onClick={() => navigate("/")} src={logo} alt="Logo" />
        <h3>Swordman</h3>
      </div>
      <div className="right-section">
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          className="searchField"
          InputProps={{ style: { color: theme ? '#fff' : '#000' } }}
        />
        <Badge onClick={()=>dispatch(setDrawer())} badgeContent={products.length}>
          <ShoppingBasketIcon className="icon" />

        </Badge>

        <div onClick={changeTheme}>
          {theme ? <Brightness3Icon className="icon" /> : <LightModeIcon className="icon" />}
        </div>
     
      </div>
    </div>
  );
}

export default Header;
