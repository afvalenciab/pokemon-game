import React from 'react';
import snorlax from '../assets/static/Pokemon_snorlax.svg';
import '../assets/styles/Footer.scss';

const Footer = (props) => {
  const { hanldeClickRestart, statusGame, handleClickPlay } = props;
  
  return (
    <footer className={`home--options ${statusGame==='stop' ? 'is-active': ''}`}>
      <div className='pokeball'>
        <button className='button--play' onClick={handleClickPlay} >Jugar</button>
        <button className='button--restart' onClick={hanldeClickRestart} >Reiniciar</button>
      </div>
      <figure>
        <img src={snorlax} alt='pokemon snorlax' />
      </figure>
    </footer>
  );
};

export default Footer;
