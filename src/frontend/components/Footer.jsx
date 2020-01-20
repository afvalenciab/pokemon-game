import React from 'react';
import snorlax from '../assets/static/Pokemon_snorlax.svg';
import '../assets/styles/Footer.scss';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import en from '../lang/en';
import es from '../lang/es';

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);

const Footer = (props) => {
  const { hanldeClickRestart, statusGame, handleClickPlay, lang } = props;
  counterpart.setLocale(lang ? lang : 'es');

  return (
    <footer className={`home--options ${statusGame==='stop' ? 'is-active': ''}`}>
      <div className='pokeball'>
        <Translate content='play' component='button' className='button--play' onClick={handleClickPlay} />
        <Translate content='restart' component='button'className='button--restart' onClick={hanldeClickRestart} />
      </div>
      <figure>
        <img src={snorlax} alt='pokemon snorlax' />
      </figure>
    </footer>
  );
};

export default Footer;
