
const initialState = {
  statusGame: 'stop',
  pokemonList: [],
  nextUrlPokemonsList: undefined,
  pokemonPlayerOne: undefined,
  pokemonPlayerTwo: undefined,
  currentPlayer: undefined,
  loaded: false,
  loading: false,
  error: null,
};

const reducer = (state =  initialState, action) => {
  switch (action.type) {
  
    case 'GETTING_POKEMONS': {
      const result = {
        ...state,
        loading: true,
        error: null,
      };
      return result;
    };

    case 'SET_POKEMONS_LIST': {
      let result = { ...state };
      if (action.payload.results) {
        const newPokemonList = result.pokemonList.concat(action.payload.results);
        result = {
          ...state,
          nextUrlPokemonsList: action.payload.next,
          pokemonList: newPokemonList,
          loaded: true,
          loading: false,
        };
      }
      return result;
    };

    case 'GET_POKEMONS_ERROR': {
      const result = {
        ...state,
        error: action.payload.stack,
        loading: false,
      };
      return result;
    };

    default:
      return state;
  };
};

export default reducer;
