import React from 'react';
import logo from '../assets/static/Pokemon_logo.svg';
import '../assets/styles/Header.scss';

const Header = () => {
  return (
    <header className='home--title'>
      <figure>
        <img src={logo} alt='Pokemon Logo' />
      </figure>
    </header>
  );
};

export default Header;
