import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { updateLifeBarPokemon } from '../actions';
import { PlayerContext } from '../context/context';
import '../assets/styles/Game.scss';

const Game = props => {
  const { name, picture, lifeBar, moves, updateLifeBarPokemon } = props;
  const player = useContext(PlayerContext);
  const lengthMoves = moves.length;
  const [movesPokemon, setMovesPokemon] = useState({
    move: moves[Math.floor(Math.random()*(lengthMoves - 0))]
  });

  const style = {
    background: `linear-gradient(90deg, green ${lifeBar}%, #fff 0%)`
  };

  const handleClickAttack = (event) => {
    event.preventDefault();
    updateLifeBarPokemon({
      lessLife: (movesPokemon.move.power * 2) / 10,
      player
    });

    const randomPower = Math.floor(Math.random()*(lengthMoves - 0));
    setMovesPokemon({
      move: moves[randomPower]
    });
  };

  return (
    <section className='home--game'>
      <h2>{name}</h2>
      <div className='game--item'>
        <figure>
          <img src={picture} alt='Pokemon' />
        </figure>
        <div className='info--game'>
          <div className='game--life'>
            <div className='life--bar' style={style}></div>
            <p>{lifeBar}%</p>
          </div>
          <p>
            <span className='span'>Ataque: </span> {movesPokemon.move.name}
          </p>
          <p>
            <span className='span'>power:</span> {movesPokemon.move.power}
          </p>
        </div>
      </div>
      <button onClick={handleClickAttack}>Atacar</button>
    </section>
  );
};

const mapDispatchToProps = {
  updateLifeBarPokemon,
};

export default connect(null,mapDispatchToProps)(Game);
