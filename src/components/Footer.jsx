import React from 'react';
import '../assets/styles/Footer.scss';
import snorlax from '../assets/static/Pokemon_snorlax.svg';

const Footer = () => {
  return (
    <footer className='home--options'>
      <div className='pokeball'>
        <button className='button--play'>Jugar</button>
        <button className='button--restart'>Reiniciar</button>
      </div>
      <figure>
        <img src={snorlax} alt='pokemon snorlax' />
      </figure>
    </footer>
  );
};

export default Footer;
