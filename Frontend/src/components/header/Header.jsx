import React from 'react';
import { GiEarthAmerica } from "react-icons/gi";
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="icon-link">
          <GiEarthAmerica className="icon" />
        </a>
        <h1 className="logo">Eventify IMSET Sousse</h1>
      </div>
    </header>
  );
}

export default Header;
