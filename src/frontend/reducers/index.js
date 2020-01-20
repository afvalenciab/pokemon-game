
const initialState = {
  statusGame: 'stop',
  pokemonList: [],
  nextUrlPokemonsList: undefined,
  pokemonPlayerOne: undefined,
  pokemonPlayerTwo: undefined,
  loadingPokemonOne: false,
  loadingPokemonTwo: false,
  currentPlayer: undefined,
  loaded: false,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
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

    case 'SET_POKEMON_PLAYER': {
      let result = {};

      if (action.payload.player === 'PlayerOne') {
        result = {
          ...state,
          pokemonPlayerOne: action.payload.pokemonData,
          loadingPokemonOne: false,
          currentPlayer: 'PlayerTwo'
        };
      } else {
        result = {
          ...state,
          pokemonPlayerTwo: action.payload.pokemonData,
          loadingPokemonTwo: false,
          currentPlayer: 'PlayerOne'
        };
      }
      return result;
    };

    case 'UPDATE_LIFEBAR_POKEMON': {
      let result = {};
      let newLifeBar;

      if (action.payload.player === 'PlayerOne') {
        newLifeBar = state.pokemonPlayerTwo.lifeBar - action.payload.lessLife;

        result = {
          ...state,
          currentPlayer: 'PlayerTwo',
          pokemonPlayerTwo: {
            ...state.pokemonPlayerTwo,
            lifeBar: newLifeBar < 0 ? 0 : newLifeBar,
          }
        };
      } else {
        newLifeBar = state.pokemonPlayerOne.lifeBar - action.payload.lessLife;
        result = {
          ...state,
          currentPlayer: 'PlayerOne',
          pokemonPlayerOne: {
            ...state.pokemonPlayerOne,
            lifeBar: newLifeBar < 0 ? 0 : newLifeBar,
          }
        };
      }
      return result;
    };

    case 'SET_LOADING_POKEMON': {
      let result = {};

      if (action.payload.player === 'PlayerOne') {
        result = {
          ...state,
          loadingPokemonOne: action.payload.value,
        };
      } else {
        result = {
          ...state,
          loadingPokemonTwo: action.payload.value,
        };
      }
      return result;
    };

    case 'SET_STATUS_GAME': {
      let result = {};

      switch (action.payload) {
        case 'stop': {
          result = {
            ...state,
            currentPlayer: undefined,
            statusGame: 'stop',
            pokemonPlayerOne: undefined,
            pokemonPlayerTwo: undefined,
            loadingPokemonOne: false,
            loadingPokemonTwo: false,
            loaded: false,
            loading: false,
            error: null,
          };
          break;
        };

        case 'game': {
          result = {
            ...state,
            statusGame: 'game',
            currentPlayer: 'PlayerOne',
          };
          break;
        }

        default: 
          result = {...state};
      }
      return result;
    };

    default:
      return state;
  };
};

export default reducer;
