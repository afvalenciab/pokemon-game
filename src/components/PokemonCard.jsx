import React,{ useContext } from 'react';
import { connect } from 'react-redux';
import { setPokemonPlayer, setLoadingPokemon } from '../actions';
import { PlayerContext } from '../context/context';
import getPokemonData from '../utils/getPokemonData';
import '../assets/styles/CarouselItem.scss';

const PokemonCard = (props) => {
  const { name, urlPicture, setPokemonPlayer, setLoadingPokemon } = props;
  const player = useContext(PlayerContext);

  const handleClickPokemon = async () => {
    setLoadingPokemon({ player, value: true});
    const pokemonData = await getPokemonData(name, player);
    setPokemonPlayer({pokemonData, player});
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

const mapDispatchToProps = {
  setPokemonPlayer,
  setLoadingPokemon,
};

export default connect(null, mapDispatchToProps)(PokemonCard);
