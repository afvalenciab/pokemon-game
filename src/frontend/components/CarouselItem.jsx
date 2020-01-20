import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import logoPokemon from '../assets/static/Pokemon_logo.svg';

const CarouselItem = props => {
  const { name, url } = props;
  const [pokemon, setPokemon] = useState({
    data: {}
  });

  useLayoutEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        const response = await axios.post('/fetch', { url }, { signal });
        const data = response.data;
        setPokemon({
          data
        });
      } catch (error) {
        throw error;
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return Object.keys(pokemon.data).length > 0 ? (
    <>
      {pokemon.data.sprites.front_default && (
        <PokemonCard
          name={name}
          urlPicture={pokemon.data.sprites.front_default}
        />
      )}
    </>
  ) : (
    <PokemonCard name='Loading...' urlPicture={logoPokemon} />
  );
};

export default CarouselItem;
