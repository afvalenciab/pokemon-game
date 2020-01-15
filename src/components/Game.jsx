import React from 'react';
import '../assets/styles/Game.scss';
import snorlax from '../assets/static/Pokemon_snorlax.svg';

const Game = () => {

  const style = {
    background: `linear-gradient(90deg, green ${90}%, #fff 0%)`
  };

  return (
    <section className='home--game'>
      <h2>Snorlax</h2>
      <div className='game--item'>
        <figure>
          <img src={snorlax} alt='Pokemon' />
        </figure>
        <div className='info--game'>
          <div className='game--life'>
            <div className='life--bar' style={style}></div>
            <p>100%</p>
          </div>
          <p>
            <span className='span'>Ataque: </span> Thunder
          </p>
          <p>
            <span className='span'>power:</span> 120
          </p>
        </div>
      </div>
      <button>Atacar</button>
    </section>
  );
};

export default Game;
