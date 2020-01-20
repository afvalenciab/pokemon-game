import React from 'react';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import Home from '../Home';

describe('Home testing', () => {
  test('Match Snapshot', () => {
    const home = create(
      <ProviderMock>
        <Home />
      </ProviderMock>
    );
    expect(home.toJSON()).toMatchSnapshot();
  });
});