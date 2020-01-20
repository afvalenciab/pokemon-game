import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import logoPokemon from '../assets/static/Pokemon_logo.svg';


const CarouselItem = (props) => {
  const { name, url } = props;
  const [pokemon, setPokemon] = useState({
    data: {}
  });

  useLayoutEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.post('/fetch', { url });
        const data = response.data;
        setPokemon({
          data
        });
      };

      fetchData();
    } catch (error) {
      
    }
  },[]);

  return Object.keys(pokemon.data).length > 0 ? (
    <>
      {pokemon.data.sprites.front_default && 
        <PokemonCard name={name} urlPicture={pokemon.data.sprites.front_default} />
      }
    </>
  ) : <PokemonCard name='Loading...' urlPicture={logoPokemon}/>;
};

export default CarouselItem;
