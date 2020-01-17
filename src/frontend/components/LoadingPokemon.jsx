import React from 'react';
import '../assets/styles/LoadingPokemon.scss';

const LoadingPokemon = () => {
  return (
    <section className="loading">
      <div className="loading__container">
        <div className="circle__up"></div>
        <div className="circle__center"></div>
        <div className="circle__down"></div>
      </div>
    </section>
  );
};

export default LoadingPokemon;
