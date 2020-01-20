import axios from 'axios';
import getPokemonData from '../getPokemonData';
import moveMock from '../../__mocks__/moveMock';
import pokemonMock from '../../__mocks__/pokemonMock';

jest.mock('axios');

describe('getPokemonData function', () => {
  it('It should return a pokemon with name, picture, lifebar, moves', () => {
    const pokemon = pokemonMock;
    const move = moveMock;
    const resMove = { data: move };
    const respPokemon = { data: pokemon };
    
    const expected = {
      name: 'venusaur',
      picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      pictureDefault: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      lifeBar: 100,
      moves: [{ name: 'hyper-beam', power: 150 }]
    };

    axios.post.mockResolvedValue(resMove);
    axios.get.mockResolvedValue(respPokemon);

    getPokemonData('venusaur', 'PlayerOne')
      .then(data => expect(data).toEqual(expected));
  });
});