import React from 'react';
import { create } from 'react-test-renderer';
import NotFound from '../NotFound';

describe('NotFound testing,', () => {
  test('Match Snapshot', () => {
    const notFound = create(<NotFound />);
    expect(notFound.toJSON()).toMatchSnapshot();
  });
});