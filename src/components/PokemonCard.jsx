import React,{ useContext } from 'react';
import { PlayerContext } from '../context/context';
import '../assets/styles/CarouselItem.scss';

const PokemonCard = (props) => {
  const { name, urlPicture } = props;
  const player = useContext(PlayerContext);

  const handleClickPokemon = () => {
    
    console.log(`El ${player} eligio el pokemon ${name}`);
  };

  return (
    <div className='player--carousel-item' onClick={handleClickPokemon}>
      <figure>
        <img src={urlPicture} alt={name} />
      </figure>
      <p>{name}</p>
    </div>
  );
};

export default PokemonCard;
