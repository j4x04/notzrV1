
import React from 'react';
import './navbar.css';

import { NavLink } from 'react-router-dom';


function Navbar() {
  return (
    <div className="navbar">
    <a className = "left" href="/catalogue">Home</a>
    <a href="/upload">Upload</a>
    <a className = "login" href="/Infopage">Login</a>
    </div>
  );
}
export default Navbar;