import React from 'react';
import { create } from 'react-test-renderer';
import LoadingPokemon from '../LoadingPokemon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('LoadingPokemon testing', () => {
  test('Match Snapshot', () => {
    const loadingPokemon = create(<LoadingPokemon />);
    expect(loadingPokemon.toJSON()).toMatchSnapshot();
  });

  test('section has .loading class', () => {
    const loadingPokemon = shallow(<LoadingPokemon />);
    const loadingPokemonElem = loadingPokemon.find('section');
    expect(loadingPokemonElem.hasClass('loading')).toBe(true);
  });
});