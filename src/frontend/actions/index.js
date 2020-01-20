import axios from 'axios';

export const gettingPokemons = (payload) => {
  return ({
    type: 'GETTING_POKEMONS',
    payload,
  });
};

export const setPokemonsList = (payload) => {
  return ({
    type: 'SET_POKEMONS_LIST',
    payload,
  })
};

export const getPokemonsError = (payload) => {
  return({
    type: 'GET_POKEMONS_ERROR',
    payload,
  })
};

export const requestMorePokemons = (url) => {
  return (dispatch) => {
    axios.post('/fetch', { url })
      .then(response => dispatch(setPokemonsList(response.data)))
      .catch(error => dispatch(getPokemonsError(error)));
  };
};

export const setPokemonPlayer = (payload) => {
  return({
    type: 'SET_POKEMON_PLAYER',
    payload,
  });
};

export const updateLifeBarPokemon = (payload) => {
  return({
    type: 'UPDATE_LIFEBAR_POKEMON',
    payload,
  });
};

export const setLoadingPokemon = (payload) => {
  return({
    type: 'SET_LOADING_POKEMON',
    payload,
  });
};

export const setStatusGame = (payload) => {
  return ({
    type: 'SET_STATUS_GAME',
    payload,
  });
};