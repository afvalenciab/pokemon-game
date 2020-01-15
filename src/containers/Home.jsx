import React from 'react';
import '../assets/styles/Home.scss';
import Header from '../components/Header';
import Player from '../components/Player';
import Game from '../components/Game';
import Footer from '../components/Footer';
import { PlayerContext } from '../context/context';

const Home = () => {
  return (
    <main className='home--container'>
      <Header />
      <section className='player--one'>
        <PlayerContext.Provider value='PlayerOne'>
          <Player/>
        </PlayerContext.Provider>
        {/* <Game /> */}
      </section>
      <section className='player--two'>
        <PlayerContext.Provider value='PlayerTwo'>
          <Player/>
        </PlayerContext.Provider>
        {/* <Game /> */}
      </section>
      <Footer />
    </main>
  );
};

export default Home;
