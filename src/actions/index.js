
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
    fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch(setPokemonsList(data)))
      .catch((error) => dispatch(getPokemonsError(error)));
  };
};

export const getDataPokemon = (nameOrId) => {
  return (dispatch) => {
    const url = 
    fetch()
  };
};
