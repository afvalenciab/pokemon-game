import React from 'react';
import { connect } from 'react-redux';
import { PlayerContext } from '../context/context';
import Header from '../components/Header';
import Player from '../components/Player';
import Game from '../components/Game';
import Footer from '../components/Footer';
import LoadingPokemon from '../components/LoadingPokemon';
import '../assets/styles/Home.scss';

const Home = props => {
  const {
    pokemonPlayerOne,
    pokemonPlayerTwo,
    loadingPokemonOne,
    loadingPokemonTwo,
  } = props;

  return (
    <main className='home--container'>
      <Header />
      <section className='player--one'>
        <PlayerContext.Provider value='PlayerOne'>
          {!pokemonPlayerOne && !loadingPokemonOne && <Player />}

          {!pokemonPlayerOne && loadingPokemonOne && <LoadingPokemon />}

          {pokemonPlayerOne && !loadingPokemonOne && (
            <Game {...pokemonPlayerOne} />
          )}
        </PlayerContext.Provider>
      </section>
      <section className='player--two'>
        <PlayerContext.Provider value='PlayerTwo'>
          {!pokemonPlayerTwo && !loadingPokemonTwo && <Player />}

          {!pokemonPlayerTwo && loadingPokemonTwo && <LoadingPokemon />}

          {pokemonPlayerTwo && !loadingPokemonTwo && (
            <Game {...pokemonPlayerTwo} />
          )}
        </PlayerContext.Provider>
      </section>
      <Footer />
    </main>
  );
};

const mapStateToProps = state => {
  return {
    pokemonPlayerOne: state.pokemonPlayerOne,
    pokemonPlayerTwo: state.pokemonPlayerTwo,
    loadingPokemonOne: state.loadingPokemonOne,
    loadingPokemonTwo: state.loadingPokemonTwo
  };
};

export default connect(mapStateToProps, null)(Home);
