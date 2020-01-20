import React from 'react';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import Game from '../Game';

describe('Game Testing', () => {
  test('Match Snapshot', () => {
    const game = create(
      <ProviderMock>
        <Game />
      </ProviderMock>
    );
    expect(game.toJSON()).toMatchSnapshot();
  });
});
