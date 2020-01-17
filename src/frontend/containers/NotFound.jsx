import React from 'react';
import snorlax from '../assets/static/Pokemon_snorlax.svg';
import '../assets/styles/NotFound.scss';

const NotFound = () => {
  return(
    <section className="notfound">
      <h1>Not Found</h1>
      <figure>
        <img src={snorlax} alt="snorlax"/>
      </figure>
    </section>
  );
}

export default NotFound;
