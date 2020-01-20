import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { updateLifeBarPokemon } from '../actions';
import { PlayerContext } from '../context/context';
import '../assets/styles/Game.scss';

const Game = props => {
  const { name, picture, pictureDefault, lifeBar, moves, updateLifeBarPokemon } = props;
  const player = useContext(PlayerContext);
  const lengthMoves = moves ? moves.length : 0;
  const [movesPokemon, setMovesPokemon] = useState({
    move: moves ? moves[Math.floor(Math.random()*(lengthMoves - 0))] : 0
  });

  const [animationImg, setAnimationImg] = useState({
     className: 'img--pokemon'
  });

  const style = {
    background: `linear-gradient(90deg, green ${lifeBar}%, #fff 0%)`
  };

  const handleClickAttack = (event) => {
    event.preventDefault();

    setAnimationImg({
      className: 'img--pokemon movePokemon'
    });

    setTimeout(() => {
      updateLifeBarPokemon({
        lessLife: (movesPokemon.move.power * 2) / 10,
        player
      });
  
      const randomPower = Math.floor(Math.random()*(lengthMoves - 0));
      setMovesPokemon({
        move: moves[randomPower]
      });
      
      setAnimationImg({
        className: 'img--pokemon'
      });
    }, 1000);
  };

  return (
    <section className='home--game'>
      <h2>{name}</h2>
      <div className='game--item'>
        <figure>
          <img key={lifeBar} className={animationImg.className} src={picture ? picture : pictureDefault} alt='Pokemon' />
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
