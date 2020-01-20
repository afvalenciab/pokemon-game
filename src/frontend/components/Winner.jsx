import React from 'react';
import '../assets/styles/Winner.scss';

const Winner = (props) => {
  const { name, pictureDefault, hanldeClickRestart } = props;

  return (
    <div className="overlay__winner">
      <section className="winner__container">
        <h1>GANADOR</h1>
        <figure>
          <img src={pictureDefault} alt={name}/>
        </figure>
        <p>{name}</p>
        <button onClick={hanldeClickRestart}>Nuevo Desafio</button>
      </section>
    </div>
  );
};

export default Winner;
