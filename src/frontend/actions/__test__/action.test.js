import { setPokemonsList, setPokemonPlayer, setStatusGame } from '../index';
import pokemonListMock from '../../__mocks__/pokemonListMock';

describe('Actions redux', () => {
  it('It should create an action to set Pokemon List', () => {
    const payload = pokemonListMock;
    const expected = {
      type: 'SET_POKEMONS_LIST',
      payload,
    };
    expect(setPokemonsList(payload)).toEqual(expected);
  });

  it('It should create an action to set pokemon player', () => {
    const player = 'PlayerOne';
    const pokemonData = {
      name: '',
      picture: '',
      lifeBar: 0,
      moves: []
    };

    const payload = {
      pokemonData,
      player
    };

    const expected = {
      type: 'SET_POKEMON_PLAYER',
      payload,
    };

    expect(setPokemonPlayer(payload)).toEqual(expected);
  });

  it('It should be create an action to set pokemon game', () => {
    const payload = 'stop';
    const expected = {
      type: 'SET_STATUS_GAME',
      payload,
    };
    expect(setStatusGame(payload)).toEqual(expected);
  });
});

