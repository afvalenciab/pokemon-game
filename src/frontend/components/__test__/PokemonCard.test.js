import React from 'react';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import PokemonCard from '../PokemonCard';

describe('PokemonCard testing', () => {
  test('Match Snapshot', () => {
    const pokemonCard = create(
      <ProviderMock>
        <PokemonCard />
      </ProviderMock>
    );
    expect(pokemonCard.toJSON()).toMatchSnapshot();
  });
});