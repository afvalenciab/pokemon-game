import React from 'react';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import '../assets/styles/Winner.scss';
import en from '../lang/en';
import es from '../lang/es';

counterpart.registerTranslations('es', es);
counterpart.registerTranslations('en', en);

const Winner = (props) => {
  const { name, pictureDefault, hanldeClickRestart, lang } = props;
  counterpart.setLocale(lang ? lang : 'es');

  return (
    <div className="overlay__winner">
      <section className="winner__container">
        <Translate content='winner' component='h1' />
        <figure>
          <img src={pictureDefault} alt={name}/>
        </figure>
        <p>{name}</p>
        <Translate component='button' content='newGame' onClick={hanldeClickRestart} />
      </section>
    </div>
  );
};

export default Winner;
