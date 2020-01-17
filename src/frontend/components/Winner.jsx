import React from 'react';
import '../assets/styles/Winner.scss';

const Winner = (props) => {
  const { name, pictureDefault, hanldeClickRestart } = props;

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   hanldeClickRestart();
  // };

  return (
    <div className="overlay__winner">
      <section className="winner__container">
        <h1>GANADOR</h1>
        <figure>
          <img src={pictureDefault} alt=""/>
        </figure>
        <p>{name}</p>
        <button onClick={hanldeClickRestart}>Nuevo Desafio</button>
      </section>
    </div>
  );
};

export default Winner;
