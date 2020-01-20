import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setStatusGame } from '../actions';
import { PlayerContext } from '../context/context';
import Header from '../components/Header';
import Player from '../components/Player';
import Game from '../components/Game';
import Footer from '../components/Footer';
import LoadingPokemon from '../components/LoadingPokemon';
import Modal from '../containers/Modal';
import Winner from '../components/Winner';
import '../assets/styles/Home.scss';

const Home = props => {
  const { lang } = props.match ? props.match.params : '';
  const {
    pokemonPlayerOne,
    pokemonPlayerTwo,
    loadingPokemonOne,
    loadingPokemonTwo,
    setStatusGame,
    statusGame,
    currentPlayer
  } = props;

  const [winner, setWinner] = useState({
    pokemon: {}
  });

  const handleRestartGame = () => {
    setStatusGame('stop');
    setWinner({
      pokemon: {}
    });
  };

  const handlePlayGame = () => {
    setStatusGame('game');
  };

  useEffect(() => {
    if (pokemonPlayerOne) {
      if (pokemonPlayerOne.lifeBar <= 0) {
        setWinner({
          pokemon: pokemonPlayerTwo
        });
      }
    }
  }, [pokemonPlayerOne]);

  useEffect(() => {
    if (pokemonPlayerTwo) {
      if (pokemonPlayerTwo.lifeBar <= 0) {
        setWinner({
          pokemon: pokemonPlayerOne
        });
      }
    }
  }, [pokemonPlayerTwo]);

  return (
    <>
      <main className='home--container'>
        <Header />
        <section className='player--one'>
          <PlayerContext.Provider value='PlayerOne'>
            {!pokemonPlayerOne && !loadingPokemonOne && <Player lang={lang} />}

            {!pokemonPlayerOne && loadingPokemonOne && <LoadingPokemon />}

            {pokemonPlayerOne && !loadingPokemonOne && (
              <Game {...pokemonPlayerOne} lang={lang} />
            )}
          </PlayerContext.Provider>
          <div className={`overlay__one ${currentPlayer === 'PlayerOne' ? '' :'is-disable' }`}></div>
        </section>
        <section className='player--two'>
          <PlayerContext.Provider value='PlayerTwo'>
            {!pokemonPlayerTwo && !loadingPokemonTwo && <Player lang={lang} />}

            {!pokemonPlayerTwo && loadingPokemonTwo && <LoadingPokemon />}

            {pokemonPlayerTwo && !loadingPokemonTwo && (
              <Game {...pokemonPlayerTwo} lang={lang} />
            )}
          </PlayerContext.Provider>
          <div className={`overlay__two ${currentPlayer === 'PlayerTwo' ? '' : 'is-disable'}`}></div>
        </section>
        <Footer hanldeClickRestart={handleRestartGame} handleClickPlay={handlePlayGame} statusGame={statusGame} lang={lang}/>
      </main>
      <div className={`overlay__home ${statusGame === 'stop' ? 'is-active':''}`}></div>
      {Object.keys(winner.pokemon).length > 0 && (
        <Modal>
          <Winner {...winner.pokemon} hanldeClickRestart={handleRestartGame} lang={lang} />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    pokemonPlayerOne: state.pokemonPlayerOne,
    pokemonPlayerTwo: state.pokemonPlayerTwo,
    loadingPokemonOne: state.loadingPokemonOne,
    loadingPokemonTwo: state.loadingPokemonTwo,
    statusGame: state.statusGame,
    currentPlayer: state.currentPlayer,
  };
};

const mapDispatchToProps = {
  setStatusGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
